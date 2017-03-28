package dao;

import entity.User;

public class UserDaoMySQLImpl extends BaseDao implements UserDao{

	@Override
	public int Login(User user) {
		// TODO Auto-generated method stub
		String sql = "select * from master where loginid=? and password=?";
		String[] param = {User.account,User.password};
		int result = this.select(sql,param);
		return result;
	
	}

}
