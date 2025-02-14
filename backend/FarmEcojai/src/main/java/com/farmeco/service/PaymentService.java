package com.farmeco.service;

import com.farmeco.entity.Payment;
import com.farmeco.entity.SellWaste;
import com.farmeco.repository.PaymentRepository;
import com.farmeco.repository.SellWasteRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PaymentService {

    @Value("${razorpay.key_id}")
    private String razorpayKeyId;

    @Value("${razorpay.key_secret}")
    private String razorpayKeySecret;

    private final PaymentRepository paymentRepository;
    
    @Autowired
    private SellWasteRepository sellWasteRepository; 

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public Map<String, Object> createOrder(int amount) throws RazorpayException {
        RazorpayClient razorpay = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100); 
        orderRequest.put("currency", "INR");
        orderRequest.put("payment_capture", 1); 

        Order order= razorpay.Orders.create(orderRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("orderId", order.get("id"));
        response.put("amount", order.get("amount"));
        response.put("currency", order.get("currency"));

        return response;
    }

//    public void savePaymentDetails(String orderId, String paymentId, int amount, String status) {
//        Payment payment = new Payment(orderId, paymentId, amount, status);
//        paymentRepository.save(payment);
//    }
    
    public void savePaymentDetails(String orderId, String paymentId, int amount, String status, int sellWasteId) {
        SellWaste sellWaste = sellWasteRepository.findById(sellWasteId)
                .orElseThrow(() -> new RuntimeException("SellWaste not found with ID: " + sellWasteId));

        Payment payment = new Payment(orderId, paymentId, amount, status, sellWaste);
        paymentRepository.save(payment);
    }

    
    public List<Payment> getAll(){
    	return paymentRepository.findAll();
    }
}
