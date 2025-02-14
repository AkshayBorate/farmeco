package com.farmeco.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.farmeco.entity.Stock;
import com.farmeco.repository.StockRepository;
import com.farmeco.serviceAbs.StockService;
import com.farmeco.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class StockServiceImpl implements StockService {

    @Autowired
    private StockRepository stockRepository;

    @Override
    @Transactional
    public Stock addOrUpdateStock(String wasteType, float weight) {
        Stock stock = stockRepository.findByWasteType(wasteType)
                .orElse(new Stock(0, wasteType, 0)); 

        stock.setWeight(stock.getWeight() + weight);
        return stockRepository.save(stock);
    }

    @Override
    @Transactional
    public Stock reduceStock(String wasteType, float weight) {
        Stock stock = stockRepository.findByWasteType(wasteType)
                .orElseThrow(() -> new ResourceNotFoundException("Stock not found for: " + wasteType));

        if (stock.getWeight() < weight) {
            throw new IllegalArgumentException("Insufficient stock for: " + wasteType);
        }

        stock.setWeight(stock.getWeight() - weight);
        return stockRepository.save(stock);
    }
    
    public List<Stock> getAll(){
    	return stockRepository.findAll();
    }
}
