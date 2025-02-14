package com.farmeco.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.farmeco.entity.SellWaste;

@Repository
public interface SellWasteRepository extends JpaRepository<SellWaste, Integer> {

	List<SellWaste> findByIsSoldFalse();

}
