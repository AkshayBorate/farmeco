package com.farmeco.repository;

import com.farmeco.entity.Farmer;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FarmerRepository extends JpaRepository<Farmer, Long> {
	 Optional<Farmer> findByEmail(String email);
	 Optional<Farmer> findByMobileNo(String mobileNo);
//	  Optional<Farmer> findByVerificationToken(String verificationToken);
	 long count();

}

