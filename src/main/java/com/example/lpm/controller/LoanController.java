package com.example.lpm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.lpm.model.Loan;
import com.example.lpm.model.User;
import com.example.lpm.service.LoanService;

import java.util.List;

@RestController
public class LoanController {
    @Autowired
    LoanService loanService;

    @CrossOrigin
    @GetMapping("/lpm/api/v1/loan")
    private List<Loan> getAllLoans() {
        return loanService.getAllLoans();
    }

    @CrossOrigin
    @GetMapping("/lpm/api/v1/loan/{loanId}")
    private Loan getLoan(@PathVariable("loanId") String loanId) {
        return loanService.getLoan(loanId);
    }

    @CrossOrigin
    @PostMapping("/lpm/api/v1/loan")
    private String saveLoan(@RequestBody Loan loan) {
        return loanService.saveLoan(loan);
    }

    @CrossOrigin
    @PutMapping("/lpm/api/v1/loan")
    private ResponseEntity<?> updateLoan(@RequestBody Loan loan) {
        return loanService.updateLoan(loan);
    }

    @CrossOrigin
    @DeleteMapping("/lpm/api/v1/loan/{loanId}")
    private ResponseEntity<?> deleteLoan(@PathVariable("loanId") String loanId) {
        return loanService.deleteLoan(loanId);
    }

    @CrossOrigin
    @PostMapping("/lpm/api/v1/loanList")
    private List<Loan> fetchLoanList(@RequestBody User user) {
        return loanService.fetchLoanList(user);
    }
}
