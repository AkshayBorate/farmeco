package com.farmeco.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WasteDetailsRequestDTO {
    private String name;
    private String email;
    private String mobileNo;
    private String wasteType;
    private String address;
    private long farmerId;
}
