package com.bata.backend.modules.user.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bata.backend.modules.user.entities.AddressEntity;

@Repository
public interface AddressRepository extends JpaRepository<AddressEntity, Integer>{

}
