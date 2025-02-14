package com.farmeco.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Contact {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	private String email;
	private String subject;
	private String message;
	private Date createdAt = new Date(System.currentTimeMillis());
	
	@ManyToOne
    @JoinColumn(name = "farmer_id")
    @JsonIgnoreProperties({"email", "mobileNo", "birthdate", "password", "address"}) 
    private Farmer farmer;


}
