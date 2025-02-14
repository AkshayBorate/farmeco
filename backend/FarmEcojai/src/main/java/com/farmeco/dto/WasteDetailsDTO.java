package com.farmeco.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WasteDetailsDTO {
    private int id;
    private String address;
    private String wasteType;
    private FarmerDTO farmer; // Updated naming
    private String imagePath;
    private String status;
    private String message;
    private Date createdAt;
    private String pickupDate;
}
