package com.bata.backend.modules.user.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bata.backend.modules.user.entities.LoginEntity;

@Repository
public interface LoginRepository extends JpaRepository<LoginEntity, Integer>{

}
