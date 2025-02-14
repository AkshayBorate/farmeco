package com.farmeco.dto;

import com.farmeco.entity.WasteDetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class WasteDetailsWithImageDTO {
    private Long id;
    private String name;
    private String email;
    private String mobileNo;
    private String wasteType;
    private String address;
    private String message;
    private String pickupDate;
    private String status;
    private String imageUrl;
    private long farmerid;

//    public WasteDetailsWithImageDTO(WasteDetails wasteDetails, String imageUrl) {
//        this.id = wasteDetails.getId();
//        this.name = wasteDetails.getName();
//        this.email = wasteDetails.getEmail();
//        this.mobileNo = wasteDetails.getMobileNo();
//        this.wasteType = wasteDetails.getWasteType();
//        this.address = wasteDetails.getAddress();
//        this.message = wasteDetails.getMessage();
//        this.pickupDate = wasteDetails.getPickupDate().toString();
//        this.status = wasteDetails.getStatus().toString();
//        this.imageUrl = imageUrl;
//        this.farmerid = wasteDetails.getFarmerid();
//    }

}
