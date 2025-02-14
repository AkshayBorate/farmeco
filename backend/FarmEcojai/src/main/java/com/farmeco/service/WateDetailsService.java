package com.farmeco.service;

import com.farmeco.dto.FarmerDTO;
import com.farmeco.dto.WasteDetailsDTO;
import com.farmeco.entity.Farmer;
import com.farmeco.entity.WasteDetails;
import com.farmeco.exception.UserAlreadyExistsException;
import com.farmeco.repository.WasteDetailsRepository;

import ch.qos.logback.core.status.Status;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WateDetailsService {

    @Autowired
    private WasteDetailsRepository wasteDetailsRepository;

    @Autowired
    private ModelMapper mapper;

    public String saveWasteDetails(String address, String wasteType, FarmerDTO farmerDTO, String imagePath) {
        WasteDetails wasteDetails = new WasteDetails();
        wasteDetails.setAddress(address);
        wasteDetails.setWasteType(wasteType);
        wasteDetails.setImagePath(imagePath);
        wasteDetails.setFarmer(mapper.map(farmerDTO, Farmer.class));

        wasteDetailsRepository.save(wasteDetails);
        return imagePath;
    }

    public List<WasteDetailsDTO> getAllRequests() {
        List<WasteDetails> wasteDetailsList = wasteDetailsRepository.findAll();
        return wasteDetailsList.stream()
                               .map(this::convertToDTO)
                               .toList();
    }

    private WasteDetailsDTO convertToDTO(WasteDetails entity) {
        return mapper.map(entity, WasteDetailsDTO.class);
    }

    private WasteDetails convertToEntity(WasteDetailsDTO dto) {
        return mapper.map(dto, WasteDetails.class);
    }
    
    
//    public WasteDetailsDTO updateStatus(long id, WasteDetailsDTO detailsDTO) {
//        WasteDetails existingDetails = wasteDetailsRepository.findById(id)
//            .orElseThrow(() -> new RuntimeException("WasteDetails not found for id: " + id));
//
//        // Convert status safely
//        if (detailsDTO.getStatus() != null) {
//            try {
//                existingDetails.setStatus(Status.valueOf(detailsDTO.getStatus().toUpperCase()));
//            } catch (IllegalArgumentException e) {
//                throw new RuntimeException("Invalid status value: " + detailsDTO.getStatus());
//            }
//        }
//
//        existingDetails.setPickupDate(detailsDTO.getPickupDate());
//        existingDetails.setMessage(detailsDTO.getMessage());
//
//        WasteDetails savedDetails = wasteDetailsRepository.save(existingDetails);
//        return convertToDTO(savedDetails);
//    }

    public WasteDetails updateStatus(int id, WasteDetails details) {
        WasteDetails existingDetails = wasteDetailsRepository.findById(id)
            .orElseThrow(() -> new UserAlreadyExistsException("WasteDetails not found for id: " + id));

        existingDetails.setStatus(details.getStatus());
        existingDetails.setPickupDate(details.getPickupDate());
        existingDetails.setMessage(details.getMessage());

        return wasteDetailsRepository.save(existingDetails);
    }


	public WasteDetails updateStatusOnly(int id, WasteDetails details) {
		
		 WasteDetails existingDetails = wasteDetailsRepository.findById(id)
		            .orElseThrow(() -> new UserAlreadyExistsException("WasteDetails not found for id: " + id));
		        existingDetails.setStatus(details.getStatus());		      

		        return wasteDetailsRepository.save(existingDetails);
	}

}
