//package com.farmeco.service;
//
//import java.util.Collection;
//import java.util.Optional;
//import java.util.Random;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessageHelper;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import com.farmeco.entity.Farmer;
//import com.farmeco.exception.UserAlreadyExistsException;
//import com.farmeco.repository.FarmerRepository;
//import com.farmeco.serviceAbs.FarmerService;
//
//import jakarta.mail.MessagingException;
//import jakarta.mail.internet.MimeMessage;
//import jakarta.persistence.EntityNotFoundException;
//
//@Service
//public class FarmerServiceImpl implements FarmerService {
//
//    @Autowired
//    private FarmerRepository farmerRepository;
//    
//    @Autowired
//    private EmailService emailService;
//
//    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//
//    public Farmer registerFarmer(Farmer farmer) {
//        if (farmerRepository.findByMobileNo(farmer.getMobileNo()).isPresent()
//                || farmerRepository.findByEmail(farmer.getEmail()).isPresent()) {
//            throw new UserAlreadyExistsException("User already exists! MobileNo or Email");
//        }
//
//        
//        farmer.setPassword(passwordEncoder.encode(farmer.getPassword()));
//        String otp = generateOTP();
//        farmer.setOtp(otp);
//        sendVerificationEmail(farmer.getEmail(), otp);
//        return farmerRepository.save(farmer);
//        
//    }
//
//    @Override
//    public Collection<Farmer> loginFarmer() {
//        return farmerRepository.findAll();
//    }
//
//    @Override
//    public Farmer getDetail(long id) {
//        return farmerRepository.findById(id)
//                .orElseThrow(() -> new EntityNotFoundException("Farmer with ID " + id + " not found"));
//    }
//
//    @Override
//    public Farmer update(long id, Farmer farmer) {
//        Farmer fm = farmerRepository.findById(id).orElse(null);
//        if (fm != null) {
//            fm.setName(farmer.getName());
//            fm.setAddress(farmer.getAddress());
//            fm.setEmail(farmer.getEmail());
//            fm.setMobileNo(farmer.getMobileNo());
//        }
//        return farmerRepository.save(fm);
//    }
//
//    public boolean authenticateFarmer(String email, String password) {
//        return farmerRepository.findByEmail(email)
//                .map(farmer -> passwordEncoder.matches(password, farmer.getPassword()))
//                .orElse(false);
//    }
//
//    public Optional<Farmer> findByEmail(String email) {
//        return farmerRepository.findByEmail(email);
//    }
//    
//    public long getTotalfarmer() {
//        return farmerRepository.count();
//    }
//    
//    private String generateOTP() {
//    	Random random =  new Random();
//    	int otpValue  = 100000 + random.nextInt(900000);
//    	return String.valueOf(otpValue);
//     }
//    
//    private void sendVerificationEmail(String email , String otp) {
//    	String subject = "Email Verification";
//    	String body = "Your verification otp is:"+ otp;
//    	emailService.sendEmail(otp, subject, body);
//    }
//}
//


//package com.farmeco.service;
//
//import java.util.Collection;
//import java.util.Optional;
//import java.util.Random;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//import com.farmeco.entity.Farmer;
//import com.farmeco.exception.UserAlreadyExistsException;
//import com.farmeco.repository.FarmerRepository;
//import com.farmeco.serviceAbs.FarmerService;
//import jakarta.persistence.EntityNotFoundException;
//
//@Service
//public class FarmerServiceImpl implements FarmerService {
//
//    @Autowired
//    private FarmerRepository farmerRepository;
//
//    @Autowired
//    private EmailService emailService;
//
//    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//
//    public Farmer registerFarmer(Farmer farmer) {
//        if (farmerRepository.findByMobileNo(farmer.getMobileNo()).isPresent()
//                || farmerRepository.findByEmail(farmer.getEmail()).isPresent()) {
//            throw new UserAlreadyExistsException("User already exists! MobileNo or Email");
//        }
//
//        farmer.setPassword(passwordEncoder.encode(farmer.getPassword()));
//        String otp = generateOTP();
//        farmer.setOtp(otp);
//        sendVerificationEmail(farmer.getEmail(), otp);
//        return farmerRepository.save(farmer);
//    }
//
//    @Override
//    public Collection<Farmer> loginFarmer() {
//        return farmerRepository.findAll();
//    }
//
//    @Override
//    public Farmer getDetail(long id) {
//        return farmerRepository.findById(id)
//                .orElseThrow(() -> new EntityNotFoundException("Farmer with ID " + id + " not found"));
//    }
//
//    @Override
//    public Farmer update(long id, Farmer farmer) {
//        Farmer fm = farmerRepository.findById(id).orElse(null);
//        if (fm != null) {
//            fm.setName(farmer.getName());
//            fm.setAddress(farmer.getAddress());
//            fm.setEmail(farmer.getEmail());
//            fm.setMobileNo(farmer.getMobileNo());
//        }
//        return farmerRepository.save(fm);
//    }
//
//    public boolean authenticateFarmer(String email, String password) {
//        return farmerRepository.findByEmail(email)
//                .map(farmer -> passwordEncoder.matches(password, farmer.getPassword()))
//                .orElse(false);
//    }
//
//    public Optional<Farmer> findByEmail(String email) {
//        return farmerRepository.findByEmail(email);
//    }
//
//    public long getTotalfarmer() {
//        return farmerRepository.count();
//    }
//
//    private String generateOTP() {
//        Random random = new Random();
//        int otpValue = 100000 + random.nextInt(900000);
//        return String.valueOf(otpValue);
//    }
//
//    private void sendVerificationEmail(String email, String otp) {
//        String subject = "Email Verification";
//        String body = "Your verification OTP is: " + otp;
//        emailService.sendEmail(email, subject, body);
//    }
//}


package com.farmeco.service;

import java.util.Collection;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.farmeco.entity.Farmer;
import com.farmeco.exception.UserAlreadyExistsException;
import com.farmeco.repository.FarmerRepository;
import com.farmeco.serviceAbs.FarmerService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class FarmerServiceImpl implements FarmerService {

    @Autowired
    private FarmerRepository farmerRepository;

    @Autowired
    private EmailService emailService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    public Farmer registerFarmer(Farmer farmer) {
        if (farmerRepository.findByMobileNo(farmer.getMobileNo()).isPresent()
                || farmerRepository.findByEmail(farmer.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User already exists! MobileNo or Email");
        }

        farmer.setPassword(passwordEncoder.encode(farmer.getPassword()));
        String otp = generateOTP();
        farmer.setOtp(otp);
        farmer.setVerified(false);
        sendVerificationEmail(farmer.getEmail(), otp);
        return farmerRepository.save(farmer);
    }

    public String verifyFarmer(String email, String otp) {
        Farmer farmer = farmerRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Farmer with email " + email + " not found"));

        if (farmer.getOtp().equals(otp)) {
            farmer.setVerified(true);
            farmer.setOtp(null); // Clear OTP after successful verification
            farmerRepository.save(farmer);
            return "Verification successful!";
        } else {
            throw new IllegalArgumentException("Invalid OTP. Please try again.");
        }
    }

    @Override
    public Collection<Farmer> loginFarmer() {
        return farmerRepository.findAll();
    }

    @Override
    public Farmer getDetail(long id) {
        return farmerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Farmer with ID " + id + " not found"));
    }

    @Override
    public Farmer update(long id, Farmer farmer) {
        Farmer fm = farmerRepository.findById(id).orElse(null);
        if (fm != null) {
            fm.setName(farmer.getName());
            fm.setAddress(farmer.getAddress());
            fm.setEmail(farmer.getEmail());
            fm.setMobileNo(farmer.getMobileNo());
        }
        return farmerRepository.save(fm);
    }

    public boolean authenticateFarmer(String email, String password) {
        return farmerRepository.findByEmail(email)
                .map(farmer -> farmer.isVerified() && passwordEncoder.matches(password, farmer.getPassword()))
                .orElse(false);
    }

    public Optional<Farmer> findByEmail(String email) {
        return farmerRepository.findByEmail(email);
    }

    public long getTotalfarmer() {
        return farmerRepository.count();
    }
    
    public void updatePassword(Farmer farmer, String newPassword) {
        String encodedPassword = passwordEncoder.encode(newPassword);
        farmer.setPassword(encodedPassword);
        String otp = generateOTP();
        farmer.setOtp(otp);
        sendVerificationEmail(farmer.getEmail(), otp);
        farmerRepository.save(farmer);
    }

    public void save(Farmer farmer) {
        farmerRepository.save(farmer);
    }

    private String generateOTP() {
        Random random = new Random();
        int otpValue = 100000 + random.nextInt(900000);
        return String.valueOf(otpValue);
    }

    private void sendVerificationEmail(String email, String otp) {
        String subject = "Email Verification";
        String body = "Your verification OTP is: " + otp;
        emailService.sendEmail(email, subject, body);
    }
    
    
}
