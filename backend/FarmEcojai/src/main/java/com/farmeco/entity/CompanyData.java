package com.farmeco.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyData {  

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;  
    private Float weight;  
    private float rate;
    private float totalPrice;
    private String collectedBy;
    @OneToOne
    @JoinColumn(name="wasteDetails_id")
    private WasteDetails WasteDetailsId;       
   
}
