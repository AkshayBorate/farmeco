package com.farmeco.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.farmeco.entity.Employee;
import com.farmeco.entity.Farmer;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	 Optional<Employee> findByEmail(String email);
	 Optional<Employee> findByMobileNo(String mobileNo);
	 long count();
	 
	 

	
}
