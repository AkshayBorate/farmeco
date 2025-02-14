package com.farmeco.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String reviewText;
    private int rating;
    
    private Date createdAt = new Date(System.currentTimeMillis());

    @ManyToOne
    @JoinColumn(name = "farmer_id")
    @JsonIgnoreProperties({"birthdate", "password", "address"}) 
    private Farmer farmer;

   
}
