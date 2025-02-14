package com.farmeco.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDetailsDTO {
    private int id;  
    private Float weight;  
    private float rate;
    private float totalPrice;
    private String collectedBy;
    private WasteDetailsDTO detailsDTO;
}
