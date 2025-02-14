package com.farmeco.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WasteDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private String wasteType;
    private String imagePath;
    private String address;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String message;
    private String pickupDate;

    private Date createdAt = new Date(System.currentTimeMillis());
   
    @ManyToOne
    @JoinColumn(name = "farmer_id")
    @JsonIgnoreProperties({"email", "mobileNo", "birthdate", "password", "address"})
    private Farmer farmer;

    public enum Status {
        PENDING, ACCEPTED, REJECTED, COLLECTED
    }
}
