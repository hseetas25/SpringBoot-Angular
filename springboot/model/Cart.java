package net.javaguides.springboot.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "products")
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name="product_name")
	private String productName;
	
	@Column(name="product_price")
	private double price;
	
	@Column(name="selling_price")
	private double sellingPrice;
	
	@Column(name="category")
	private String category;
	
	@Column(name="manufactured_by")
	private String manufacturedBy;
	
	public Cart() {
		
	}
	public Cart(String productName, double price, double sellingPrice, String category, String manufacturedBy) {
		super();
		this.productName = productName;
		this.price = price;
		this.sellingPrice = sellingPrice;
		this.category = category;
		this.manufacturedBy = manufacturedBy;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public double getSellingPrice() {
		return sellingPrice;
	}
	public void setSellingPrice(double sellingPrice) {
		this.sellingPrice = sellingPrice;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getManufacturedBy() {
		return manufacturedBy;
	}
	public void setManufacturedBy(String manufacturedBy) {
		this.manufacturedBy = manufacturedBy;
	}
}
