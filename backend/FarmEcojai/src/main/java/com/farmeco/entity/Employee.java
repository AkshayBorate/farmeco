package com.farmeco.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Data
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String mobileNo;
    private Date joiningDate;
    private double salary;
    private String password;
    
    @Column(nullable = false)
    private String role;
}
