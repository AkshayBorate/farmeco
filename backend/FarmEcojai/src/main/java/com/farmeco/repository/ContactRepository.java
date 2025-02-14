package com.farmeco.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.farmeco.entity.Contact;

public interface ContactRepository extends JpaRepository<Contact, Integer> {

}
