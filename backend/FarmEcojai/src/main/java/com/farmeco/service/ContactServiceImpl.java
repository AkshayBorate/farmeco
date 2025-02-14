package com.farmeco.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.farmeco.dto.ContactDTO;
import com.farmeco.dto.FarmerDTO;
import com.farmeco.dto.ReviewDTO;
import com.farmeco.entity.Contact;
import com.farmeco.entity.Farmer;
import com.farmeco.repository.ContactRepository;
import com.farmeco.repository.FarmerRepository;
import com.farmeco.serviceAbs.ContactService;

@Service
public class ContactServiceImpl implements ContactService {

	@Autowired 
	private ContactRepository contactRepository;
	
	@Autowired
	private FarmerRepository farmerRepository;
	
	@Override
	public Contact sendMessage(Contact contact) {	
		
		if(contact.getFarmer() !=null && contact.getFarmer().getId() !=null) {
			Optional<Farmer> farmer = farmerRepository.findById(contact.getFarmer().getId());
			farmer.ifPresent(contact::setFarmer);
		}
		return contactRepository.save(contact);
	}
	
	private ContactDTO convertToDTO(Contact contact) {
		ContactDTO dto = new ContactDTO();
		dto.setId(contact.getId());
		dto.setName(contact.getName());
		dto.setEmail(contact.getEmail());
		dto.setSubject(contact.getSubject());
		dto.setMessage(contact.getMessage());
		dto.setCreatedAt(contact.getCreatedAt());
		
		if(contact.getFarmer() !=null) {
			FarmerDTO farmerDTO = new FarmerDTO();
			farmerDTO.setId(contact.getFarmer().getId());
			farmerDTO.setName(contact.getFarmer().getName());
			dto.setFarmer(farmerDTO);
		}
		return dto;
	}
	
	@Override
	public List<ContactDTO> getMessage() {	
		return contactRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	
}
