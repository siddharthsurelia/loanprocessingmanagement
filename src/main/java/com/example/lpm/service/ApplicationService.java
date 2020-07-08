package com.example.lpm.service;

import com.example.lpm.model.Loan;
import com.example.lpm.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import com.example.lpm.model.Application;
import com.example.lpm.repository.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class ApplicationService {
    @Autowired
    ApplicationRepository applicationRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    LoanRepository loanRepository;

    public List<Application> getAllApplications() {
        List<Application> applications = new ArrayList<>();
        applicationRepository.findAll().forEach(application -> applications.add(application));
        return applications;
    }

    public Application getApplication(String applicationId) {
        return applicationRepository.findById(applicationId).get();
    }

    public String saveApplication(Application application) {
        UUID uuid = UUID.randomUUID();
        application.setApplicationId(uuid.toString());
        applicationRepository.save(application);
        return application.getApplicationId();
    }

    public ResponseEntity<?> updateApplication(Application application) {
        if(applicationRepository.existsById(application.getApplicationId())) {
            applicationRepository.save(application);

            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteApplication(String applicationId) {
        applicationRepository.deleteById(applicationId);
    }

    public List<Application> applicationByUser(String userId) {
        List<Application> applications = new ArrayList<>();

        applicationRepository.findAll().forEach(application -> {
            if(application.getUserId().equals(userId)) {
                applications.add(application);
            }
        });

        return applications;
    }

    public List<Application> pendingApplications(String userLogin) {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(u -> {
            if(u.getReportsTo().equals(userLogin)) {
                users.add(u);
            }
        });

        List<Application> applications = new ArrayList<>();

        for (User user: users) {
            applicationRepository.findAll().forEach(application -> {
                if(application.getUserId().equals(user.getUserId())) {
                    applications.add(application);
                }
            });
        }

        return applications;
    }

    public List<Application> acceptedApplications() {
        List<Application> applications = new ArrayList<>();

        applicationRepository.findAll().forEach(application -> {
            if(application.getStatus().toUpperCase().equals("APPROVED")) {
                applications.add(application);
            }
        });

        return applications;
    }

    public List<Loan> getUserLoans(String userId) {
        List<Loan> loans = new ArrayList<>();

        applicationRepository.findAll().forEach(a -> {
            if (a.getUserId().equals(userId)) {
                Loan l = loanRepository.findById(a.getLoanId()).get();
                loans.add(l);
            }
        });

        return loans;
    }

    public ResponseEntity<?> creditLoan(String applicationId, String userId, float loanAmount) {
        if (userRepository.existsById(userId)) {
            User user = userRepository.findById(userId).get();
            user.setAccountBalance(user.getAccountBalance() + loanAmount);
            userRepository.save(user);

            Application a = applicationRepository.findById(applicationId).get();
            a.setStatus("PROCESSED");
            applicationRepository.save(a);

            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Scheduled(fixedRate = 90000)
    public void payDay() {
        List<Application> applications = new ArrayList<>();
        applicationRepository.findAll().forEach(a -> applications.add(a));

        userRepository.findAll().forEach(u -> {
            float deduction = 0;

            for (Application a : applications) {
                if (a.getUserId().equals(u.getUserId()) && a.getStatus().toUpperCase().equals("PROCESSED"))  {
                    Loan loan = loanRepository.findById(a.getLoanId()).get();
                    float interestRate = loan.getInterestRate();
                    float principle = (a.getLoanAmount() / (a.getLoanPeriod() * 12));
                    float interest = (principle * interestRate) / 100;
                    float debitAmount = principle + interest;

                    deduction += debitAmount;
                    a.setInstallments(a.getInstallments() - 1);
                    applicationRepository.save(a);
                }
            }

            System.out.println(u.getAccountBalance());
            System.out.println(u.getSalary());
            System.out.println(deduction);

            u.setAccountBalance(u.getAccountBalance() + (u.getSalary() - deduction));
            userRepository.save(u);
        });
    }
}
