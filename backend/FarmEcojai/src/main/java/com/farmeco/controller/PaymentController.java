package com.farmeco.controller;

import com.farmeco.entity.Payment;
import com.farmeco.entity.SellWaste;
import com.farmeco.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin("/**") // ✅ Allow React to communicate with backend
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> requestData) {
        try {
            if (!requestData.containsKey("amount")) {
                return ResponseEntity.badRequest().body("❌ Missing 'amount' field in request body");
            }

            Object amountObj = requestData.get("amount");
            if (!(amountObj instanceof Number)) {
                return ResponseEntity.badRequest().body("❌ 'amount' should be a number");
            }

            int amount = ((Number) amountObj).intValue();
            Map<String, Object> orderData = paymentService.createOrder(amount);
            return ResponseEntity.ok(orderData);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Error creating Razorpay order: " + e.getMessage());
        }
    }

//    @PostMapping("/verify-payment")
//    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, Object> requestData) {
//        String orderId = (String) requestData.get("orderId");
//        String paymentId = (String) requestData.get("paymentId");
//        Integer amount	=(Integer) requestData.get("amount");
//
//        try {
//            paymentService.savePaymentDetails(orderId, paymentId, amount, "SUCCESS");
//            
//            return ResponseEntity.ok(Map.of("status", "success"));
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("❌ Payment verification failed: " + e.getMessage());
//        }
//    }
    
    
    @PostMapping("/verify-payment")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, Object> requestData) {
        try {
            String orderId = (String) requestData.get("orderId");
            String paymentId = (String) requestData.get("paymentId");
            Integer amount = (Integer) requestData.get("amount");

            // Ensure sellWasteId is extracted correctly as Long
            Integer sellWasteId = Integer.valueOf(requestData.get("sellWasteId").toString());

            // Call service to save payment details
            paymentService.savePaymentDetails(orderId, paymentId, amount, "SUCCESS", sellWasteId);

            return ResponseEntity.ok(Map.of("status", "success"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Payment verification failed: " + e.getMessage());
        }
    }

    
    
    @GetMapping("/getall")
    public List<Payment> getAll(){
    	return paymentService.getAll();
    }
}
