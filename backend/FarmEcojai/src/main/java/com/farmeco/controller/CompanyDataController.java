package com.farmeco.controller;

import com.farmeco.dto.CompanyDetailsDTO;
import com.farmeco.entity.CompanyData;
import com.farmeco.service.CompanyDataServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/intake")
public class CompanyDataController {

    @Autowired
    private CompanyDataServiceImpl companyDataService;

    @PostMapping("/add")
    public ResponseEntity<CompanyData> addIntake(@RequestBody CompanyDetailsDTO companyDetailsDTO) {
        CompanyData createdData = companyDataService.addIntake(companyDetailsDTO);
        return ResponseEntity.ok(createdData);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<CompanyData>> getIntakeById(@PathVariable int id) {
        Optional<CompanyData> data = companyDataService.getIntakeById(id);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/get")
    public ResponseEntity<List<CompanyData>> getAllIntakes() {
        List<CompanyData> dataList = companyDataService.getAllIntakes();
        return ResponseEntity.ok(dataList);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<CompanyData> deleteIntake(@PathVariable int id) {
        CompanyData deletedData = companyDataService.deleteIntake(id);
        return ResponseEntity.ok(deletedData);
    }
}
