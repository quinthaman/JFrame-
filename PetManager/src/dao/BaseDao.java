package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import entity.User;

public class BaseDao {
	protected Connection conn = null;
	protected ResultSet result = null;
	protected PreparedStatement pstmt = null;
	
	protected void getConnection(){
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/petmanager","root","950318");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public int operate(String sql,Object[] params){
			getConnection();
			try {
				pstmt = conn.prepareStatement(sql);
				for (int i = 0; i < params.length; i++) {
					pstmt.setObject(i+1, params[i]);
				}
				int i=pstmt.executeUpdate();
				return i;
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return -1;
			}finally {
				closeAll();
			}

	}
	
	public int select(String sql,Object[] params){
		getConnection();
		try {
			pstmt = conn.prepareStatement(sql);
			for (int i = 0; i < params.length; i++) {
				pstmt.setObject(i+1, params[i]);
			}
			result=pstmt.executeQuery();
			if (result.next()){
				User.account = result.getString("loginid");
				User.name = result.getString("name");
				User.money = result.getInt("money");
				User.password = result.getString("password");
				User.imageAddress = result.getString("imageaddress");
				return 1;
			}
			else{
				return 0;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return -1;
		}finally {
			closeAll();
		}
	}
	
	public String findImage(String account){
		getConnection();
		String address = "";
		try {
			pstmt = conn.prepareStatement("select imageaddress from master where loginid=?");
			pstmt.setString(1,account);
			result=pstmt.executeQuery();
			while (result.next()){
				address = result.getString("imageaddress");
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			closeAll();
		}
		return address;
	}
	
	protected void closeAll(){
		try {
			if(result!=null){
				result.close();
			}
			if (null != pstmt){
				pstmt.close();
			}
		}
		catch(SQLException e) {
			e.printStackTrace();
		}
		conn=null;
	}
	
	
}
