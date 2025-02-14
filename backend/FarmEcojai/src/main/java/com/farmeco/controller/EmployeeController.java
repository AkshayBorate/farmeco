//package com.farmeco.controller;
//
//import java.util.Collection;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import com.farmeco.entity.Employee;
//import com.farmeco.entity.Farmer;
//import com.farmeco.exception.UserAlreadyExistsException;
//import com.farmeco.service.EmployeeServiceImpl;
//
//
//@RestController
//@RequestMapping("/api/employee")
//@CrossOrigin(origins = "http://localhost:3000")
//public class EmployeeController {
//
//	@Autowired
//    private EmployeeServiceImpl employeeService;
//
//    @GetMapping("/getall")
//    public Collection<Employee> getAll() {
//        return employeeService.loginemp();
//    }
//
//    @PostMapping("/addUser")
//    public ResponseEntity<Employee> addFarmer(@RequestBody Employee employee) {
//        try {
//            Employee savedEmp = employeeService.registeremp(employee);
//            return new ResponseEntity<>(savedEmp, HttpStatus.CREATED);
//        } catch (UserAlreadyExistsException ex) {
//            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
//        }
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<Map<String, String>> login(@RequestBody Employee employee) {
//        Optional<Employee> existingEmployee = employeeService.findByEmail(employee.getEmail());
//
//        if (existingEmployee.isPresent() && employeeService.authenticateEmployee(employee.getEmail(), employee.getPassword())) {
//            Map<String, String> response = new HashMap<>();
//            response.put("message", "Login successful");
//            response.put("id", existingEmployee.get().getId().toString());
//            return new ResponseEntity<>(response, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(Map.of("message", "Invalid email or password"), HttpStatus.UNAUTHORIZED);
//        }
//    }
//
//    
//    @GetMapping("/count")
//    public long getTotalEmployeeCount() {
//        return employeeService.getTotalEmployees();
//    }
//
//    
//    @GetMapping("/{id}")
//    public Employee getByid(@PathVariable long id) {
//    	return employeeService.getDetail(id);
//    }
//
//	
//	
//
//	
//
//}


package com.farmeco.controller;

import com.farmeco.entity.Employee;
import com.farmeco.exception.UserAlreadyExistsException;
import com.farmeco.service.EmployeeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = "*")
public class EmployeeController {

    @Autowired
    private EmployeeServiceImpl employeeService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody Employee employee) {
        try {
            employeeService.registeremp(employee);
            Map<String, String> response = new HashMap<>();
            response.put("message", employee.getRole() + " registered successfully");
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (UserAlreadyExistsException ex) {
            return new ResponseEntity<>(Map.of("message", ex.getMessage()), HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Employee employee) {
        Optional<Employee> existingEmployee = employeeService.findByEmail(employee.getEmail());

        if (existingEmployee.isPresent() &&
            employeeService.authenticateEmployee(employee.getEmail(), employee.getPassword())) {

            String role = existingEmployee.get().getRole();
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("id", existingEmployee.get().getId().toString());
            response.put("role", role);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Map.of("message", "Invalid email or password"), HttpStatus.UNAUTHORIZED);
        }
    }
    
    @GetMapping("/count")
  public long getTotalEmployeeCount() {
      return employeeService.getTotalEmployees();
  }

  
  @GetMapping("/{id}")
  public Employee getByid(@PathVariable long id) {
  	return employeeService.getDetail(id);
  }
  
  @GetMapping("/getall")
public Collection<Employee> getAll() {
    return employeeService.loginemp();
}
  
  @DeleteMapping("/delete")
  public ResponseEntity<String> deleteEmployee(@RequestBody Map<String, String> request) {
	    String email = request.get("email");
	    if (email == null || email.isEmpty()) {
	        return ResponseEntity.badRequest().body("Email is required!");
	    }
	    
	    String result = employeeService.deleteEmp(email);
	    return ResponseEntity.ok(result);
	}

}

