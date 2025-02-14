package com.farmeco.dto;


import lombok.Data;
import java.util.Date;

@Data
public class ReviewDTO {
    private Long id;
    private String name;
    private String email;
    private String reviewText;
    private int rating;
    private Date createdAt;
    private FarmerDTO farmer; 
}

