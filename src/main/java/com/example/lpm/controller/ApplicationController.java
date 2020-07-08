package com.example.lpm.controller;

import com.example.lpm.model.Loan;
import com.example.lpm.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.lpm.model.Application;
import com.example.lpm.service.ApplicationService;

import java.util.List;

@RestController
public class ApplicationController {
    @Autowired
    ApplicationService applicationService;

    @CrossOrigin
    @GetMapping("/lpm/api/v1/application")
    private List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @CrossOrigin
    @GetMapping("/lpm/api/v1/application/{applicationId}")
    private Application getApplication(@PathVariable("applicationId") String applicationId) {
        return applicationService.getApplication(applicationId);
    }

    @CrossOrigin
    @PostMapping("/lpm/api/v1/application")
    private String saveApplication(@RequestBody Application application) {
        return applicationService.saveApplication(application);
    }

    @CrossOrigin
    @PutMapping("/lpm/api/v1/application")
    private ResponseEntity<?> updateApplication(@RequestBody Application application) {
        return applicationService.updateApplication(application);
    }

    @CrossOrigin
    @DeleteMapping("/lpm/api/v1/application/{applicationId}")
    private void deleteApplication(@PathVariable("applicationId") String applicationId) {
        applicationService.deleteApplication(applicationId);
    }

    @CrossOrigin
    @GetMapping("/lpm/api/v1/myApplications/{userId}")
    private List<Application> applicationByUser(@PathVariable("userId") String userId) {
        return applicationService.applicationByUser(userId);
    }

    @CrossOrigin
    @GetMapping("/lpm/api/v1/pendingApplications/{userId}")
    private List<Application> pendingApplications(@PathVariable("userId") String userId) {
        return applicationService.pendingApplications(userId);
    }

    @CrossOrigin
    @GetMapping("/lpm/api/v1/acceptedApplications")
    private List<Application> acceptedApplications() {
        return applicationService.acceptedApplications();
    }

    @CrossOrigin
    @GetMapping("/lpm/api/v1/creditLoan/{applicationId}/{userId}/{loanAmount}")
    private ResponseEntity<?> creditLoan(@PathVariable("applicationId") String applicationId, @PathVariable("userId") String userId, @PathVariable("loanAmount") float loanAmount) {
        return applicationService.creditLoan(applicationId, userId, loanAmount);
    }

    @CrossOrigin
    @GetMapping("/lpm/api/v1/getUserLoans/{userId}")
    private List<Loan> getUserLoans(@PathVariable("userId") String userId) {
        return applicationService.getUserLoans(userId);
    }
}
