package com.farmeco.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.nio.charset.StandardCharsets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.farmeco.entity.SellWaste;
import com.farmeco.service.SellWasteService1;

import jakarta.persistence.criteria.Order;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("/**")
@RequestMapping("/marketplace")  
public class MarketplaceController1 {

    @Autowired
    private SellWasteService1 sellWasteService;

    private static final String UPLOAD_DIR = "D:\\FarmEcoUploads\\";
//    private static final String UPLOAD_DIR = "uploads"; // Relative path within the project

    @PostMapping(value = "/add", consumes = {"multipart/form-data"})
    public ResponseEntity<?> addWasteDetails(
        @RequestParam String name,
        @RequestParam String email,
        @RequestParam Long mobileNo,
        @RequestParam String address,
        @RequestParam Double price,
        @RequestParam String wasteType,
        @RequestParam Integer farmerid,
        @RequestPart("file") MultipartFile file) {

    	Map<String, String> response = new HashMap<>();

        try {
            // Get the project's root directory
            String projectRoot = System.getProperty("user.dir");  // Important!
            Path uploadPath = Paths.get(UPLOAD_DIR); // Combine project root and relative path

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename().replaceAll("[^a-zA-Z0-9.-]", "_");
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            sellWasteService.saveWasteDetails(name, email, wasteType, mobileNo, address, price, fileName, farmerid); // Save only the filename

            response.put("message", "File uploaded successfully: " + fileName + " and waste details saved.");
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            e.printStackTrace();
            response.put("message", "Error uploading file: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }


//    @GetMapping("/orders/{farmerId}")
//    public ResponseEntity<?> getOrdersByFarmerId(@PathVariable long farmerId) {
//        List<SellWaste> wasteDetailsList = sellWasteService.getOrdersByFarmerId(farmerId);
//
//        if (wasteDetailsList.isEmpty()) {
//            return ResponseEntity.ok(Map.of("message", "No orders found for farmer ID: " + farmerId));
//        }
//
//        for (SellWaste wasteDetails : wasteDetailsList) {
//            // Construct the image URL
//            String imageUrl = "http://localhost:8085/uploads/" + wasteDetails.getImagePath();
//            wasteDetails.setImagePath(imageUrl);  // Set the correct image URL
//        }
//
//        return ResponseEntity.ok(wasteDetailsList);
//    }


    @GetMapping("/orders")
    public ResponseEntity<?> getAllOrders() {
        List<SellWaste> wasteDetailsList = sellWasteService.getAllRequests()
            .stream()
            .filter(wasteDetails -> !wasteDetails.getIsSold())  // Filter out sold orders
            .collect(Collectors.toList());

        if (wasteDetailsList.isEmpty()) {
            return ResponseEntity.ok(Map.of("message", "No orders found"));
        }

//        for (SellWaste wasteDetails : wasteDetailsList) {
//            String imageUrl = UPLOAD_DIR + wasteDetails.getImagePath();
//            wasteDetails.setImagePath(imageUrl);
//        }
        for (SellWaste wasteDetails : wasteDetailsList) {
//            String imageUrl = wasteDetails.getImagePath();
//            wasteDetails.setImagePath(imageUrl);
        	 String fileName = wasteDetails.getImagePath().substring(wasteDetails.getImagePath().lastIndexOf("\\") + 1); // Extract filename
             wasteDetails.setImagePath(fileName); 
             System.out.println(fileName);
        }

        return ResponseEntity.ok(wasteDetailsList);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateSoldStatus(@PathVariable int id) { 
        try {
            SellWaste updatedWaste = sellWasteService.updateSoldStatus(id); 

            if (updatedWaste != null) {
                return ResponseEntity.ok(Map.of("message", "Waste status updated successfully"));
            } else {
                return ResponseEntity.notFound().build();
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error updating waste status: " + e.getMessage()));
        }
    }

    @GetMapping("/getall")
    public List<SellWaste> getalls(){
    	return sellWasteService.getAllRequests();
    }


}