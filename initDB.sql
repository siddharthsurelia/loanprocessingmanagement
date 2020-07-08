CREATE TABLE user (
    userId VARCHAR(50),
    userLogin VARCHAR(50),
    userPassword VARCHAR(50),
    userName VARCHAR(50),
    userAddress VARCHAR(100),
    userMobileNo VARCHAR(15),
    salary FLOAT,
    accountBalance FLOAT,
    userType VARCHAR(15),
    reportsTo VARCHAR(50)
);

CREATE TABLE loan (
    loanId VARCHAR(50),
    loanType VARCHAR(50),
    loanDescription VARCHAR(1000),
    interestRate FLOAT,
    minPeriod INTEGER,
    maxPeriod INTEGER,
    minSalaryRequired FLOAT
);

CREATE TABLE application (
    applicationId VARCHAR(50),
    userId VARCHAR(50),
    loanId VARCHAR(50),
    loanAmount FLOAT,
    loanPeriod INTEGER,
    installments INTEGER,
    applicationDate VARCHAR(15),
    status VARCHAR(15)
);