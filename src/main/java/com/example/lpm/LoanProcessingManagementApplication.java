package com.example.lpm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class LoanProcessingManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(LoanProcessingManagementApplication.class, args);
    }

}
