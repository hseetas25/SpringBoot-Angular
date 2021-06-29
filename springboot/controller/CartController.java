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
import net.javaguides.springboot.model.Cart;
import net.javaguides.springboot.repository.CartRepository;

@RestController
@RequestMapping("/api/v1/")
public class CartController {
	
	@Autowired
	private CartRepository cartRepository;
	
	@GetMapping("/products")
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	public List<Cart> getAllProducts() {
		return cartRepository.findAll();
	}
	
	@PostMapping("/products")
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	public Cart addNewProduct(@RequestBody Cart cartProduct) {
		return cartRepository.save(cartProduct);
	}
	
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	@GetMapping("/products/{Id}")
	public ResponseEntity<Cart> getProductById(@PathVariable Long Id) {
		
		Cart cart = cartRepository.findById(Id).orElseThrow(() -> new ResourceNotFoundException("Product not found with given "+Id));
		return ResponseEntity.ok(cart);
	}
	
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	@PutMapping("/products/{Id}")
	public ResponseEntity<Cart> updateProduct(@PathVariable Long Id, @RequestBody Cart cart) {
		Cart cartDetails = cartRepository.findById(Id).orElseThrow(() -> new ResourceNotFoundException("Product not found with given "+Id));
		
		cartDetails.setProductName(cart.getProductName());
		cartDetails.setPrice(cart.getPrice());
		cartDetails.setCategory(cart.getCategory());
		cartDetails.setSellingPrice(cart.getSellingPrice());
		cartDetails.setManufacturedBy(cart.getManufacturedBy());
		
		Cart updatedProduct = cartRepository.save(cartDetails);
		return ResponseEntity.ok(updatedProduct);
	}
	
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	@DeleteMapping("/products/{Id}")
	public ResponseEntity<Map<String, Boolean>> deleteProduct(@PathVariable Long Id) {
		Cart cart = cartRepository.findById(Id).orElseThrow(() -> new ResourceNotFoundException("Product not found with given "+Id));
		
		cartRepository.delete(cart);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}
	
	