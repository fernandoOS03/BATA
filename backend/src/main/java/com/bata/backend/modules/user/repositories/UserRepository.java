package com.bata.backend.modules.user.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bata.backend.modules.user.entities.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer>{
}
