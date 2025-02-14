package com.farmeco.service;

import com.farmeco.dto.CompanyDetailsDTO;
import com.farmeco.dto.WasteDetailsDTO;
import com.farmeco.entity.CompanyData;
import com.farmeco.entity.WasteDetails;
import com.farmeco.repository.CompanyDataRepository;
import com.farmeco.serviceAbs.CompanyDataService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyDataServiceImpl  {

    @Autowired
    private ModelMapper modelMapper;

    private final CompanyDataRepository intakeRepository;

    @Autowired
    public CompanyDataServiceImpl(CompanyDataRepository intakeRepository) {
        this.intakeRepository = intakeRepository;
    }

    public CompanyData addIntake(CompanyDetailsDTO companyDetailsDTO) {
        CompanyData data = new CompanyData();
        data.setWeight(companyDetailsDTO.getWeight());
        data.setRate(companyDetailsDTO.getRate());
        data.setTotalPrice(companyDetailsDTO.getTotalPrice());
        data.setCollectedBy(companyDetailsDTO.getCollectedBy());

        WasteDetails wasteDetails = modelMapper.map(companyDetailsDTO.getDetailsDTO(), WasteDetails.class);
        data.setWasteDetailsId(wasteDetails);

        return intakeRepository.save(data);
    }

    
    public Optional<CompanyData> getIntakeById(int id) {
        return intakeRepository.findById(id);
    }

    public List<CompanyData> getAllIntakes() {
        return intakeRepository.findAll();
    }


    public CompanyData deleteIntake(int id) {     
        Optional<CompanyData> intake = intakeRepository.findById(id);      
        if (intake.isPresent()) {
            intakeRepository.deleteById(id);
            return intake.get();
        } else {
            throw new RuntimeException("Intake not found with ID: " + id);
        }
    }
}
