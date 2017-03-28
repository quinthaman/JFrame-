package entity;

public class Pet {
	private String name;
	private String type;
	private int money;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getMoney() {
		return money;
	}
	public void setMoney(int money) {
		this.money = money;
	}
	
	public Pet(){
		
	}
	
	public Pet(String name,String type,int money){
		this.name = name;
		this.type = type;
		this.money = money;
	}
}
