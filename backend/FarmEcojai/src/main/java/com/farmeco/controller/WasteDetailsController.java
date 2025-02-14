package com.farmeco.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.farmeco.dto.FarmerDTO;
import com.farmeco.dto.WasteDetailsDTO;
import com.farmeco.entity.WasteDetails;
import com.farmeco.service.WateDetailsService;

@RestController
@RequestMapping("/waste-details")
@CrossOrigin(origins = "*")
public class WasteDetailsController {

    @Autowired
    private WateDetailsService wasteDetailsService;

    private static final String UPLOAD_DIR = "D:\\FarmEcoUploads\\";

    @PostMapping("/add")
    public ResponseEntity<?> addWasteDetails(
            @RequestParam String address,
            @RequestParam String wasteType,
            @RequestParam("file") MultipartFile file,
            @RequestParam Long farmerId,
            @RequestParam String farmerName) {

        Map<String, String> response = new HashMap<>();

        try {
            // Ensure the upload directory exists
            Path path = Paths.get(UPLOAD_DIR);
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }

            // Clean and store file
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename()
                    .trim().replaceAll("[^a-zA-Z0-9._-]", "_");
            Path filePath = Paths.get(UPLOAD_DIR + File.separator + fileName);
            file.transferTo(filePath.toFile());

            FarmerDTO farmerDTO = new FarmerDTO();
            farmerDTO.setId(farmerId);
            farmerDTO.setName(farmerName);

            wasteDetailsService.saveWasteDetails(address, wasteType, farmerDTO, fileName);

            response.put("message", "File uploaded successfully: " + fileName + " and waste details saved.");
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            response.put("message", "Error uploading file: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        } catch (Exception e) {
            response.put("message", "Unexpected error: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("/orders")
    public ResponseEntity<?> getOrders() {
        List<WasteDetailsDTO> wasteDetailsList = wasteDetailsService.getAllRequests();

        if (wasteDetailsList.isEmpty()) {
            return ResponseEntity.ok(Map.of("message", "No orders found"));
        }

        for (WasteDetailsDTO wasteDetails : wasteDetailsList) {
            String imageUrl = "http://localhost:8085/uploads/" + wasteDetails.getImagePath();
            wasteDetails.setImagePath(imageUrl);
        }

        return ResponseEntity.ok(wasteDetailsList);
    }
    
    
    @PutMapping("/update/{id}")
    public WasteDetails updatee(@PathVariable int id, @RequestBody WasteDetails details) {
		return wasteDetailsService.updateStatus(id, details);
    	
    }
    
    @PutMapping("/updateOnly/{id}")
    public WasteDetails updateeOnly(@PathVariable int id, @RequestBody WasteDetails details) {
		return wasteDetailsService.updateStatusOnly(id, details);
    	
    }


}
