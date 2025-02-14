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
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.farmeco.entity.Farmer;
//import com.farmeco.exception.UserAlreadyExistsException;
//import com.farmeco.service.FarmerServiceImpl;
//
//@RestController
//@RequestMapping("/api/farmers")
//@CrossOrigin(origins = "http://localhost:3000")
//public class FarmerController {
//
//    @Autowired
//    private FarmerServiceImpl farmerService;
//
//    @GetMapping("/getall")
//    public Collection<Farmer> getAll() {
//        return farmerService.loginFarmer();
//    }
//
//    @PostMapping("/addUser")
//    public ResponseEntity<Farmer> addFarmer(@RequestBody Farmer farmer) {
//        try {
//            Farmer savedFarmer = farmerService.registerFarmer(farmer);
//            return new ResponseEntity<>(savedFarmer, HttpStatus.CREATED);
//        } catch (UserAlreadyExistsException ex) {
//            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
//        }
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<Map<String, String>> login(@RequestBody Farmer farmer) {
//        Optional<Farmer> existingFarmer = farmerService.findByEmail(farmer.getEmail());
//
//        if (existingFarmer.isPresent() && farmerService.authenticateFarmer(farmer.getEmail(), farmer.getPassword())) {
//            Map<String, String> response = new HashMap<>();
//            response.put("message", "Login successful");
//            response.put("id", existingFarmer.get().getId().toString());
//            return new ResponseEntity<>(response, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(Map.of("message", "Invalid email or password"), HttpStatus.UNAUTHORIZED);
//        }
//    }
//
//    @GetMapping("/get/{id}")
//    public Farmer getById(@PathVariable Long id) {
//        return farmerService.getDetail(id);
//    }
//
//    @PutMapping("/update/{id}")
//    public Farmer update(@PathVariable long id, @RequestBody Farmer farmer) {
//        return farmerService.update(id, farmer);
//    }
//    
//    @GetMapping("/count")
//    public long getTotalCount() {
//        return farmerService.getTotalfarmer();
//    }
//}
//


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
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.farmeco.entity.Farmer;
//import com.farmeco.exception.UserAlreadyExistsException;
//import com.farmeco.service.FarmerServiceImpl;
//
//@RestController
//@RequestMapping("/api/farmers")
//@CrossOrigin(origins = "http://localhost:3000")
//public class FarmerController {
//
//    @Autowired
//    private FarmerServiceImpl farmerService;
//
//    @GetMapping("/getall")
//    public Collection<Farmer> getAll() {
//        return farmerService.loginFarmer();
//    }
//
//    @PostMapping("/addUser")
//    public ResponseEntity<Farmer> addFarmer(@RequestBody Farmer farmer) {
//        try {
//            Farmer savedFarmer = farmerService.registerFarmer(farmer);
//            return new ResponseEntity<>(savedFarmer, HttpStatus.CREATED);
//        } catch (UserAlreadyExistsException ex) {
//            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
//        }
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<Map<String, String>> login(@RequestBody Farmer farmer) {
//        Optional<Farmer> existingFarmer = farmerService.findByEmail(farmer.getEmail());
//
//        if (existingFarmer.isPresent() && farmerService.authenticateFarmer(farmer.getEmail(), farmer.getPassword())) {
//            Map<String, String> response = new HashMap<>();
//            response.put("message", "Login successful");
//            response.put("id", existingFarmer.get().getId().toString());
//            return new ResponseEntity<>(response, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(Map.of("message", "Invalid email or password"), HttpStatus.UNAUTHORIZED);
//        }
//    }
//
//    @GetMapping("/get/{id}")
//    public Farmer getById(@PathVariable Long id) {
//        return farmerService.getDetail(id);
//    }
//
//    @PutMapping("/update/{id}")
//    public Farmer update(@PathVariable long id, @RequestBody Farmer farmer) {
//        return farmerService.update(id, farmer);
//    }
//
//    @GetMapping("/count")
//    public long getTotalCount() {
//        return farmerService.getTotalfarmer();
//    }
//}


package com.farmeco.controller;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.farmeco.entity.Farmer;
import com.farmeco.exception.UserAlreadyExistsException;
import com.farmeco.service.FarmerServiceImpl;

@RestController
@RequestMapping("/api/farmers")
@CrossOrigin(origins = "*")
public class FarmerController {

    @Autowired
    private FarmerServiceImpl farmerService;

    @GetMapping("/getall")
    public Collection<Farmer> getAll() {
        return farmerService.loginFarmer();
    }

    @PostMapping("/addUser")
    public ResponseEntity<?> addFarmer(@RequestBody Farmer farmer) {
        try {
            Farmer savedFarmer = farmerService.registerFarmer(farmer);
            return new ResponseEntity<>(savedFarmer, HttpStatus.CREATED);
        } catch (UserAlreadyExistsException ex) {
            return new ResponseEntity<>(Map.of("message", "User already exists!"), HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Farmer farmer) {
        Optional<Farmer> existingFarmer = farmerService.findByEmail(farmer.getEmail());

        if (existingFarmer.isPresent()) {
            Farmer foundFarmer = existingFarmer.get();
            if (!foundFarmer.isVerified()) {
                return new ResponseEntity<>(Map.of("message", "Account not verified. Please verify your email."), HttpStatus.UNAUTHORIZED);
            }

            if (farmerService.authenticateFarmer(farmer.getEmail(), farmer.getPassword())) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Login successful");
                response.put("id", foundFarmer.getId().toString());
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(Map.of("message", "Invalid email or password"), HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyFarmer(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");

        try {
            String message = farmerService.verifyFarmer(email, otp);
            return new ResponseEntity<>(Map.of("message", message), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(Map.of("message", "Invalid OTP. Please try again."), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Farmer> getById(@PathVariable Long id) {
        try {
            Farmer farmer = farmerService.getDetail(id);
            return new ResponseEntity<>(farmer, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable long id, @RequestBody Farmer farmer) {
        try {
            Farmer updatedFarmer = farmerService.update(id, farmer);
            return new ResponseEntity<>(updatedFarmer, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(Map.of("message", "Error updating farmer"), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/count")
    public long getTotalCount() {
        return farmerService.getTotalfarmer();
    }
    
    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");

        if (email == null || newPassword == null) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Email and new password are required"));
        }

        Optional<Farmer> existingFarmer = farmerService.findByEmail(email);
        if (existingFarmer.isPresent()) {
            Farmer farmer = existingFarmer.get();

            if (!farmer.isVerified()) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Account not verified. Cannot reset password."));
            }

            farmerService.updatePassword(farmer, newPassword);
            return ResponseEntity
                    .ok(Map.of("message", "Password updated successfully. Verification OTP has been sent."));
        }

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", "Account not found"));
    }

}

