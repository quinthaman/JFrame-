package entity;

public abstract class User {
	public static String account;
	public static String name;
	public static String password;
	public static String imageAddress;
	public static int money;
	
	public User(String account,String password){
		this.account = account;
		this.password = password;
	}
	
}
