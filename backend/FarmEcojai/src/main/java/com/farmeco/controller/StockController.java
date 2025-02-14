package com.farmeco.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.farmeco.entity.Stock;
import com.farmeco.service.StockServiceImpl;

@RestController
@RequestMapping("/stock")
@CrossOrigin(origins = "*")
public class StockController {

    @Autowired
    private StockServiceImpl stockService;

    @PostMapping("/add")
    public ResponseEntity<?> addOrUpdateStock(@RequestBody Stock stock) {
        try {
            Stock updatedStock = stockService.addOrUpdateStock(stock.getWasteType(), stock.getWeight());
            return ResponseEntity.ok(updatedStock);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
   
    @PostMapping("/reduce")
    public ResponseEntity<?> reduceStock(@RequestBody Stock stock) {
        try {
            Stock updatedStock = stockService.reduceStock(stock.getWasteType(), stock.getWeight());
            return ResponseEntity.ok(updatedStock);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/get")
    public List<Stock> getAll(){
    	return stockService.getAll();
    }
}
