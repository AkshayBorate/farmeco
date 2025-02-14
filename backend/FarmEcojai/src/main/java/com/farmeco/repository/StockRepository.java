package com.farmeco.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.farmeco.entity.Stock;

public interface StockRepository extends JpaRepository<Stock, Integer> {
	 @Query("SELECT s FROM Stock s WHERE s.wasteType = :wasteType")
	    Optional<Stock> findByWasteType(@Param("wasteType") String wasteType);
}
