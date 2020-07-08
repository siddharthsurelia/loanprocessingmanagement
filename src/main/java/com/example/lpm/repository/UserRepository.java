package com.example.lpm.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.lpm.model.User;

public interface UserRepository extends CrudRepository<User, String> {
}
