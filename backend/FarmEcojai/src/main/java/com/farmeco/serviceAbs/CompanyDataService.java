package com.farmeco.serviceAbs;

import com.farmeco.entity.CompanyData;
import java.util.List;
import java.util.Optional;

public interface CompanyDataService {
    CompanyData addIntake(CompanyData intake);
    Optional<CompanyData> getIntakeById(Long id);
    List<CompanyData> getAllIntakes();
    CompanyData deleteIntake(long id);

}
