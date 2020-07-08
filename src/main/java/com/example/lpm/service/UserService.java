package com.example.lpm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.lpm.model.User;
import com.example.lpm.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(user -> users.add(user));
        return users;
    }

    public User getUser(String userId) {
        return userRepository.findById(userId).get();
    }

    public String saveUser(User user) {
        UUID uuid = UUID.randomUUID();
        user.setUserId(uuid.toString());
        userRepository.save(user);
        return user.getUserId();
    }

    public ResponseEntity<?> updateUser(User user) {
        if(userRepository.existsById(user.getUserId())) {
            userRepository.save(user);

            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> deleteUser(String userId) {
        if(userRepository.existsById(userId)) {
            userRepository.deleteById(userId);

            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> checkCredentials(User user) {
        List<User> users = new ArrayList<>();
        User foundUser = null;
        userRepository.findAll().forEach(user1 -> users.add(user1));

        for(User u : users) {
            if (u.getUserLogin().equals(user.getUserLogin()) && u.getUserPassword().equals(user.getUserPassword())) {
                u.setUserPassword(null);
                foundUser = u;
            }
        }

        if(foundUser == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(foundUser, HttpStatus.OK);
    }

    public List<User> fetchReportingUsersList(User user) {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(u -> {
            if(u.getReportsTo().equals(user.getUserLogin())) {
                users.add(u);
            }
        });

        return users;
    }
}
