package net.javaguides.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Admin;
import net.javaguides.springboot.model.Cart;
import net.javaguides.springboot.repository.AdminRepository;


@RestController
@RequestMapping("/api/v2/")
public class AdminUserController {
	
	@Autowired
	private AdminRepository adminRepository;
	
	@GetMapping("/admin")
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	public List<Admin> getAllAdminUsers() {
		return adminRepository.findAll();
	}
	
	@PostMapping("/admin")
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	public Admin addNewAdminUser(@RequestBody Admin adminUser) {
		return adminRepository.save(adminUser);
	}
	
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	@GetMapping("/admin/{Id}")
	public ResponseEntity<Admin> getProductById(@PathVariable Long Id) {
		
		Admin admin = adminRepository.findById(Id).orElseThrow(() -> new ResourceNotFoundException("Admin not found with given "+Id));
		return ResponseEntity.ok(admin);
	}
	
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	@PutMapping("/admin/{Id}")
	public ResponseEntity<Admin> updateProduct(@PathVariable Long Id, @RequestBody Admin admin) {
		Admin adminDetails = adminRepository.findById(Id).orElseThrow(() -> new ResourceNotFoundException("Admin not found with given "+Id));
		
		adminDetails.setName(admin.getName());
		adminDetails.setPassword(admin.getPassword());
		adminDetails.setPhoneNumber(admin.getPhoneNumber());
		adminDetails.setUserId(admin.getUserId());
		
		Admin updatedData = adminRepository.save(adminDetails);
		return ResponseEntity.ok(updatedData);
	}
}
