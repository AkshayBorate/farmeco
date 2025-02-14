package com.farmeco.dto;

import java.util.Date;

import lombok.Data;

@Data
public class ContactDTO {
	private int id;
	private String name;
	private String email;
	private String subject;
	private String message;
	private Date createdAt;
	private FarmerDTO farmer;
}
