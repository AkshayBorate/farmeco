package com.farmeco.service;

import com.razorpay.*;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class RazorpayService {

    private final RazorpayClient razorpayClient;

    public RazorpayService(@Value("${razorpay.key_id}") String apiKey,
                           @Value("${razorpay.key_secret}") String apiSecret) throws RazorpayException {
        if (apiKey == null || apiSecret == null || apiKey.isEmpty() || apiSecret.isEmpty()) {
            throw new IllegalArgumentException("Razorpay API credentials are missing!");
        }
        this.razorpayClient = new RazorpayClient(apiKey, apiSecret);
    }

    public Map<String, Object> createOrder(int amount) throws RazorpayException {
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100);  // Convert amount to paisa
        orderRequest.put("currency", "INR");
        orderRequest.put("payment_capture", 1);

        Order order = razorpayClient.Orders.create(orderRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("id", order.get("id"));
        response.put("amount", order.get("amount"));
        response.put("currency", order.get("currency"));
        response.put("status", order.get("status"));
        return response;
    }

    public void savePaymentDetails(String orderId, String paymentId, int amount, String status) {
        // TODO: Implement database storage for payment details
        System.out.println("Payment details saved: " + orderId + " | " + paymentId + " | " + amount + " | " + status);
    }
}
