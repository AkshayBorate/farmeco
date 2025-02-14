package com.farmeco.serviceAbs;

import java.util.List;

import com.farmeco.dto.ContactDTO;
import com.farmeco.entity.Contact;

public interface ContactService {
 Contact sendMessage (Contact contact);
 List<ContactDTO> getMessage();
}
