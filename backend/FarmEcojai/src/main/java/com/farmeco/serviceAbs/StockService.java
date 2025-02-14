package com.farmeco.serviceAbs;

import com.farmeco.entity.Stock;

public interface StockService {
    Stock addOrUpdateStock(String wasteType, float weight);
    Stock reduceStock(String wasteType, float weight);
}
