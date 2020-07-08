package com.example.lpm.model;

import javax.persistence.*;

@Entity
@Table
public class Loan {
    @Id
    @Column
    private String loanId;
    @Column
    private String loanType;
    @Column
    private String loanDescription;
    @Column
    private float interestRate;
    @Column
    private int minPeriod;
    @Column
    private int maxPeriod;
    @Column
    private float minSalaryRequired;

    public String getLoanType() {
        return loanType;
    }

    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }

    public String getLoanDescription() {
        return loanDescription;
    }

    public void setLoanDescription(String loanDescription) {
        this.loanDescription = loanDescription;
    }

    public float getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(float interestRate) {
        this.interestRate = interestRate;
    }

    public int getMinPeriod() {
        return minPeriod;
    }

    public void setMinPeriod(int minPeriod) {
        this.minPeriod = minPeriod;
    }

    public int getMaxPeriod() {
        return maxPeriod;
    }

    public void setMaxPeriod(int maxPeriod) {
        this.maxPeriod = maxPeriod;
    }

    public void setMinSalaryRequired(float minSalaryRequired) {
        this.minSalaryRequired = minSalaryRequired;
    }

    public String getLoanId() {
        return loanId;
    }

    public void setLoanId(String loanId) {
        this.loanId = loanId;
    }

    public float getMinSalaryRequired() {
        return minSalaryRequired;
    }
}
