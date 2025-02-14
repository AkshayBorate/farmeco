//package com.farmeco.service;
//
//import com.farmeco.entity.Employee;
//import com.farmeco.entity.Farmer;
//import com.farmeco.exception.UserAlreadyExistsException;
//import com.farmeco.repository.EmployeeRepository;
//import com.farmeco.repository.FarmerRepository;
//import com.farmeco.serviceAbs.EmployeeService;
//
//import jakarta.persistence.EntityNotFoundException;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.Collection;
//import java.util.Optional;
//
//@Service
//public class EmployeeServiceImpl implements EmployeeService {
//
//    
//    
//    private final EmployeeRepository employeeRepository;
//    private final BCryptPasswordEncoder passwordEncoder;
//
//    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
//        this.employeeRepository = employeeRepository;
//        this.passwordEncoder = new BCryptPasswordEncoder();
//    }
//
//    @Override
//    public Employee registeremp(Employee employee) {
//        if (employeeRepository.findByMobileNo(employee.getMobileNo()).isPresent()
//                || employeeRepository.findByEmail(employee.getEmail()).isPresent()) {
//            throw new UserAlreadyExistsException("User already exists! MobileNo");
//        }
//
//        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
//        return employeeRepository.save(employee);
//    }
//
//    @Override
//    public Collection<Employee> loginemp() {
//        return employeeRepository.findAll();
//    }
//
//    public boolean authenticateEmployee(String email, String password) {
//        return employeeRepository.findByEmail(email)
//                .map(emp -> passwordEncoder.matches(password, emp.getPassword()))
//                .orElse(false);
//    }
//    
//    public long getTotalEmployees() {
//        return employeeRepository.count();
//    }
//    
//    public Employee getDetail(long id) {
//        return employeeRepository.findById(id)
//                .orElseThrow(() -> new EntityNotFoundException("Employee with ID " + id + " not found"));
//    }
//    
//    public Optional<Employee> findByEmail(String email) {
//        return employeeRepository.findByEmail(email);
//    }
//}
//



package com.farmeco.service;

import com.farmeco.entity.Employee;
import com.farmeco.exception.UserAlreadyExistsException;
import com.farmeco.repository.EmployeeRepository;
import com.farmeco.serviceAbs.EmployeeService;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public Employee registeremp(Employee employee) {
        if (employeeRepository.findByMobileNo(employee.getMobileNo()).isPresent()
                || employeeRepository.findByEmail(employee.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User already exists with MobileNo or Email");
        }

        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        employee.setRole(employee.getRole().toUpperCase());
        return employeeRepository.save(employee);
    }

    public boolean authenticateEmployee(String email, String password) {
        return employeeRepository.findByEmail(email)
                .map(emp -> passwordEncoder.matches(password, emp.getPassword()))
                .orElse(false);
    }

    public Optional<Employee> findByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }
    
    
    public long getTotalEmployees() {
      return employeeRepository.count();
  }
  
  public Employee getDetail(long id) {
      return employeeRepository.findById(id)
              .orElseThrow(() -> new EntityNotFoundException("Employee with ID " + id + " not found"));
  }
  
  @Override
public Collection<Employee> loginemp() {
    return employeeRepository.findAll();
}
  public String deleteEmp(String email) {
      Optional<Employee> employee = employeeRepository.findByEmail(email);

      if (employee.isPresent()) {
          employeeRepository.delete(employee.get());
          return "User with email " + email + " has been deleted successfully.";
      } else {
          return "User with email " + email + " not found.";
      }
  }
}

