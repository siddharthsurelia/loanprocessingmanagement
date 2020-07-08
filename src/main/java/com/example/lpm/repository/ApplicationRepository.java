package com.example.lpm.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.lpm.model.Application;

public interface ApplicationRepository extends CrudRepository<Application, String> {
}
