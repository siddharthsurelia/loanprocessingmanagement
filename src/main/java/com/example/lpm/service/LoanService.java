package com.example.lpm.service;

import com.example.lpm.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.lpm.model.Loan;
import com.example.lpm.repository.LoanRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class LoanService {
    @Autowired
    LoanRepository loanRepository;

    public List<Loan> getAllLoans() {
        List<Loan> loans = new ArrayList<>();
        loanRepository.findAll().forEach(loan -> loans.add(loan));
        return loans;
    }

    public Loan getLoan(String loanId) {
        return loanRepository.findById(loanId).get();
    }

    public String saveLoan(Loan loan) {
        UUID uuid = UUID.randomUUID();
        loan.setLoanId(uuid.toString());
        loanRepository.save(loan);
        return loan.getLoanId();
    }

    public ResponseEntity<?> updateLoan(Loan loan) {
        if(loanRepository.existsById(loan.getLoanId())) {
            loanRepository.save(loan);

            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> deleteLoan(String loanId) {
        if(loanRepository.existsById(loanId)) {
            loanRepository.deleteById(loanId);

            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public List<Loan> fetchLoanList(User user) {
        List<Loan> loans = new ArrayList<>();
        loanRepository.findAll().forEach(loan -> {
            if(loan.getMinSalaryRequired() < user.getSalary()) {
                loans.add(loan);
            }
        });

        return loans;
    }
}
