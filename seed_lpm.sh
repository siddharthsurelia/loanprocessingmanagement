#!/bin/bash
# Creating admin user
curl --location --request POST 'http://localhost:8080/lpm/api/v1/user' --header 'Content-Type: application/json' --data-raw '{
	"userLogin": "admin",
  	"userPassword": "admin",
  	"userName": "Administrator",
  	"userType": "ADMIN",
	"reportsTo": ""
}'
# Creating employee 1
user=$( curl --location --request POST 'http://localhost:8080/lpm/api/v1/user' --header 'Content-Type: application/json' --data-raw '{
	"userLogin": "sid123",
    "userPassword": "sid123",
    "userName": "Siddharth",
    "userAddress": "4/429",
    "userMobileNo": "8949134829",
    "salary": 16500.0,
    "accountBalance": 10000.0,
    "userType": "EMPLOYEE",
    "reportsTo": "dis321"
}' )
# Creating employee 2
curl --location --request POST 'http://localhost:8080/lpm/api/v1/user' --header 'Content-Type: application/json' --data-raw '{
	"userLogin": "sid456",
	"userPassword": "sid456",
	"userName": "Sid",
	"userAddress": "4/429",
	"userMobileNo": "8949134829",
	"salary": 16500.0,
	"accountBalance": 10000.0,
	"userType": "EMPLOYEE",
	"reportsTo": "dis321"
}'
# Creating manager
curl --location --request POST 'http://localhost:8080/lpm/api/v1/user' --header 'Content-Type: application/json' --data-raw '{
	"userLogin": "dis321",
	"userPassword": "dis321",
	"userName": "Sid",
	"userAddress": "4/429",
	"userMobileNo": "8949134829",
	"salary": 16500.0,
	"accountBalance": 10000.0,
	"userType": "MANAGER",
	"reportsTo": ""
}'
# Creating loan
loan=$( curl --location --request POST 'http://localhost:8080/lpm/api/v1/loan' --header 'Content-Type: application/json' --data-raw '{
	"loanType": "Home Loan",
	"loanDescription": "dasjhdasdndaldnasjknajdnasjkdnasjkdnaskd",
	"interestRate": 2.5,
	"minPeriod": 2,
	"maxPeriod": 5,
	"minSalaryRequired": 20000
}' )
echo $user
echo $loan
# Creating application
# printf "\n"
# curl --location --request POST 'http://localhost:8080/lpm/api/v1/application' --header 'Content-Type: application/json' --data-raw '{
#    "userId": "'"$user"'",
#    "loanId": "'"$loan"'",
#    "loanAmount": 16500.00,
#    "loanPeriod": 2,
#    "applicationDate": "01-06-2020"
# }'
# printf "\n"