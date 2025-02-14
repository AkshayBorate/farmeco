package com.farmeco.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sell_waste")
@Data
@NoArgsConstructor
public class SellWaste {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    private String name;
    private String email;
 
    private String wasteType;
    private Long mobileNo;
    private String address;
    private Double price;
    private String imagePath;
    private Boolean isSold = false;
    private Integer farmerid;
    
    

	public SellWaste(String name, String email, String wasteType, Long mobileNo, String address, Double price,
			String imagePath, Integer farmerid) {
		super();
		this.name = name;
		this.email = email;
		this.wasteType = wasteType;
		this.mobileNo = mobileNo;
		this.address = address;
		this.price = price;
		this.imagePath = imagePath;
		this.farmerid = farmerid;
	}
    
    
	
}
