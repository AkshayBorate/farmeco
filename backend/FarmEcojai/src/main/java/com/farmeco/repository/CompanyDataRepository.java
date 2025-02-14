package com.farmeco.repository;

import com.farmeco.entity.CompanyData;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CompanyDataRepository extends JpaRepository<CompanyData, Integer> {
}
