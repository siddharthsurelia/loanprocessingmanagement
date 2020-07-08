package com.example.lpm.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.lpm.model.Loan;

public interface LoanRepository extends CrudRepository<Loan, String> {
}
