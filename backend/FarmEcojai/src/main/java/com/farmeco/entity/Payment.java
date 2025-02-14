package com.farmeco.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {    

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String orderId;

    
    private String paymentId;

   
    private Integer amount;

  
    private String status;
    
    @OneToOne
    @JoinColumn(name = "sellWaste_id")
    private SellWaste sellWaste;
    
    

    public Payment(String orderId, String paymentId, Integer amount, String status, SellWaste sellWaste) {
        this.orderId = orderId;
        this.paymentId = paymentId;
        this.amount = amount;
        this.status = status;
        this.sellWaste = sellWaste;
    }

}

