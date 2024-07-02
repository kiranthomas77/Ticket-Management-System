package com.kiransb.fullstack_backend.repository;

import com.kiransb.fullstack_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List; // Add this import statement
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByRole(String role);
    Optional<User> findByUsernameAndPassword(String username, String password);
}
