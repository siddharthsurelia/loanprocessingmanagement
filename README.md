### Loan Processing Management

**To start the DB:-** 
- docker build -t lpmdb .
- docker run -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 lpmdb

**To run the application:-**
- mvn clean package
- java -jar .\target\lpm-0.0.1-SNAPSHOT.jar
