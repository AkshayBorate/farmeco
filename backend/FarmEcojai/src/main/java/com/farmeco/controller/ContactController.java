package com.farmeco.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farmeco.dto.ContactDTO;
import com.farmeco.entity.Contact;
import com.farmeco.service.ContactServiceImpl;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = "*")
public class ContactController {
	
	@Autowired
	private ContactServiceImpl contactServiceImpl;
	
	@PostMapping("/send")
	public Contact sendMessage(@RequestBody Contact contact) {
		return contactServiceImpl.sendMessage(contact);
	}
	
	@GetMapping("/get")
	public List<ContactDTO> getMessage() {
		return contactServiceImpl.getMessage();
	}

}
