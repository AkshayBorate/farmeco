package com.farmeco.repository;

import com.farmeco.dto.WasteDetailsDTO;
import com.farmeco.entity.WasteDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WasteDetailsRepository extends JpaRepository<WasteDetails, Integer> {
//	List<WasteDetails> findByFarmerid(long farmerId);
}
