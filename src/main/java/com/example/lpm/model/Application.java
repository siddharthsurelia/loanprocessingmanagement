package com.example.lpm.model;

import javax.persistence.*;

@Entity
@Table
public class Application {
    @Id
    @Column
    private String applicationId;
    @Column
    private String userId;
    @Column
    private String loanId;
    @Column
    private float loanAmount;
    @Column
    private int loanPeriod;
    @Column
    private int installments;
    @Column
    private String applicationDate;
    @Column
    private String status = "PENDING"; // Pending -> Accepted/Rejected -> Lent -> Paid

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setLoanId(String loanId) {
        this.loanId = loanId;
    }

    public float getLoanAmount() {
        return loanAmount;
    }

    public void setLoanAmount(float loanAmount) {
        this.loanAmount = loanAmount;
    }

    public int getLoanPeriod() {
        return loanPeriod;
    }

    public void setLoanPeriod(int loanPeriod) {
        this.loanPeriod = loanPeriod;
    }

    public String getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(String applicationDate) {
        this.applicationDate = applicationDate;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(String applicationId) {
        this.applicationId = applicationId;
    }

    public String getUserId() {
        return userId;
    }

    public String getLoanId() {
        return loanId;
    }

    public String getStatus() {
        return status;
    }

    public int getInstallments() {
        return installments;
    }

    public void setInstallments(int installments) {
        this.installments = installments;
    }
}
