package com.example.lpm.model;

import javax.persistence.*;

@Entity
@Table
public class User {
    @Id
    @Column
    private String userId;
    @Column(unique = true)
    private String userLogin;
    @Column
    private String userPassword;
    @Column
    private String userName;
    @Column
    private String userAddress;
    @Column
    private String userMobileNo;
    @Column
    private float salary;
    @Column
    private float accountBalance;
    @Column
    private String userType;
    @Column
    private String reportsTo;

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserAddress() {
        return userAddress;
    }

    public void setUserAddress(String userAddress) {
        this.userAddress = userAddress;
    }

    public String getUserMobileNo() {
        return userMobileNo;
    }

    public void setUserMobileNo(String userMobileNo) {
        this.userMobileNo = userMobileNo;
    }

    public void setSalary(float salary) {
        this.salary = salary;
    }

    public float getAccountBalance() {
        return accountBalance;
    }

    public void setAccountBalance(float accountBalance) {
        this.accountBalance = accountBalance;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public void setReportsTo(String reportsTo) {
        this.reportsTo = reportsTo;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public float getSalary() {
        return salary;
    }

    public String getReportsTo() {
        return reportsTo;
    }
}
