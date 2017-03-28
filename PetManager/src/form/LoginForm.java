package form;

import java.awt.ActiveEvent;
import java.awt.Color;
import java.awt.Container;
import java.awt.Cursor;
import java.awt.Font;
import java.awt.Frame;
import java.awt.Graphics;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JTextField;

import entity.PetMaster;
import entity.User;
import dao.*;

public class LoginForm extends JFrame {
	/*
	 * 需要两个输入框进行输入
	 * 两个label用来标注
	 * 两个按钮，一个实现登录功能，一个实现注册
	 */
	
	JTextField textAccount;
	JPasswordField textPassword;
	
	JLabel labelAccount;
	JLabel labelPassword;
	JLabel labelTitle;
	
	JButton loginButton;
	JButton registerButton;
	JButton exitButton;
	JButton minButton;
	
	ImageIcon background;
	//窗体的构造方法，用来对组件及其事件执行初始化
	JLabel imageLabel;
	
	Connection conn = null;
	ResultSet result = null;
	PreparedStatement pstmt = null;
	public LoginForm(){
		
		MyItemListener ms = new MyItemListener();
		Mouse mouse = new Mouse();
		Focus focus = new Focus();
		//姓名栏
		textAccount = new JTextField();
		textAccount.setBounds(225,275,150,30);
		textAccount.setFont(new Font("微软雅黑",Font.BOLD,15));
		textAccount.setBorder(null);

		labelAccount = new JLabel("账号:");
		labelAccount.setBounds(155,275,60,32);
		labelAccount.setFont(new Font("微软雅黑",Font.BOLD,20));
		
		//accountPanel.setBackground(Color.DARK_GRAY);
		
		//密码栏
		textPassword = new JPasswordField();
		textPassword.setBounds(225,315,150,30);
		textPassword.setFont(new Font("微软雅黑",Font.BOLD,15));
		textPassword.setBorder(null);
		textPassword.addFocusListener(focus);


		labelPassword = new JLabel("密码:");
		labelPassword.setBounds(155,315,60,32);
		labelPassword.setFont(new Font("微软雅黑",Font.BOLD,20));
		//passwordPanel.setBackground(Color.ORANGE);
		
		
		//功能栏
		loginButton = new JButton();
		loginButton.setBounds(225,355,150,30);
		loginButton.setIcon(new ImageIcon("D:\\ada\\login.png"));
		loginButton.setContentAreaFilled(false);
		loginButton.setBorder(null);
		loginButton.addActionListener(ms);
		loginButton.addMouseListener(mouse);
		registerButton = new JButton();
		registerButton.setBounds(400,280,80,20);
		registerButton.setIcon(new ImageIcon("D:\\ada\\注册.png"));
		registerButton.setBorder(null);
		registerButton.addActionListener(ms);
		registerButton.addActionListener(ms);
		registerButton.addMouseListener(mouse);
		exitButton = new JButton();
		exitButton.setBounds(540,5,50,37);
		exitButton.setIcon(new ImageIcon("D:\\ada\\cat_exit.png"));
		exitButton.setContentAreaFilled(false);
		exitButton.setBorder(null);
		exitButton.addActionListener(ms);
		exitButton.addMouseListener(mouse);
		minButton = new JButton();
		minButton.setBounds(480,5,50,37);
		minButton.setIcon(new ImageIcon("D:\\ada\\cat_min.png"));
		minButton.setContentAreaFilled(false);
		minButton.setBorder(null);
		minButton.addMouseListener(mouse);
		minButton.addActionListener(ms);
		//functionPanel.setBackground(Color.BLACK);
		
		//所有组件添加进窗体
		imageLabel = new JLabel();
		imageLabel.setBounds(55,270,80,80);
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); 
		
		background = new ImageIcon("D:\\ada\\Title_2.png");
		//JLabel imgLabel = new JLabel(background);// 将背景图放在标签里。
		JPanel panel = new JPanel(){   
            public void paintComponent(Graphics g){   
            	g.drawImage(background.getImage(),0,0,null);   
                super.paintComponent(g);   
            }   
		}; 		
		 panel.setOpaque(false);
		 panel.add(minButton);
		 panel.add(exitButton);
		 panel.add(labelAccount);
		 panel.add(textAccount);
		 panel.add(labelPassword);
		 panel.add(textPassword);
		 panel.add(loginButton);
		 panel.add(registerButton);
		 panel.add(imageLabel);
		 setContentPane(panel);
         panel.setLayout(null);
         
         
		 //this.setContentPane(labelPassword);
		// this.add(textAccount);
	}
	
	public boolean checkInput(){
		boolean flag = true;
		if (this.textAccount.getText().isEmpty()){
			flag = false;
		}
		else if(String.valueOf(this.textPassword.getPassword()).isEmpty()){
			flag = false;
		}
		return flag;
	}
	
	//监听类 负责处理点击事件
	private class MyItemListener implements ActionListener{
		public void actionPerformed(ActionEvent e) {
			// TODO Auto-generated method stub
			Object obj = e.getSource();
			if (obj == loginButton) {
				if (checkInput() == true){
					//通过非空验证则开始进行登录方法的调用
					User use = new PetMaster(textAccount.getText(), String.valueOf(textPassword.getPassword()));		
					UserDao userdao= new UserDaoMySQLImpl();
					int rs = userdao.Login(use);
					if (rs == 1){
						JOptionPane.showMessageDialog(null,"登录成功！","提示消息",JOptionPane.WARNING_MESSAGE);
						Close();
						FunctionByCustomerForm fcf = new FunctionByCustomerForm();
						fcf.setVisible(true);
					}
					else {
						JOptionPane.showMessageDialog(null,"登录失败！","提示消息",JOptionPane.WARNING_MESSAGE);
					}
				}
				else {
					JOptionPane.showMessageDialog(null,"账号或密码不能为空！！！","提示消息",JOptionPane.WARNING_MESSAGE);
				}
			}
			else if (obj == registerButton) {
				JOptionPane.showMessageDialog(null,"注册","提示消息",JOptionPane.WARNING_MESSAGE);
			}
			else if (obj == exitButton) {
				System.exit(0);
			}
			else if (obj == minButton){
				setExtendedState(Frame.ICONIFIED);
			}
		}
	}
	public void Close(){
		this.dispose();
	}
	
	private class Mouse implements MouseListener{

		@Override
		public void mouseClicked(MouseEvent e) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void mousePressed(MouseEvent e) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void mouseReleased(MouseEvent e) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void mouseEntered(MouseEvent e) {
			// TODO Auto-generated method stub
			Object obj = e.getSource();
			if (obj == exitButton){
				exitButton.setIcon(new ImageIcon("D:\\ada\\cat_orange.png"));
			}
			else if(obj == minButton){
				minButton.setIcon(new ImageIcon("D:\\ada\\cat_min_orange.png"));
			}
			else if(obj == loginButton){
				loginButton.setIcon(new ImageIcon("D:\\ada\\login_2.png"));
			}
			else if(obj == registerButton){
				registerButton.setIcon(new ImageIcon("D:\\ada\\注册_2.png"));
			}
		}

		@Override
		public void mouseExited(MouseEvent e) {
			// TODO Auto-generated method stub
			Object obj = e.getSource();
			if (obj == exitButton){
				exitButton.setIcon(new ImageIcon("D:\\ada\\cat_exit.png"));
			}
			else if(obj == minButton){
				minButton.setIcon(new ImageIcon("D:\\ada\\cat_min.png"));
			}
			else if(obj == loginButton){
				loginButton.setIcon(new ImageIcon("D:\\ada\\login.png"));
			}
			else if(obj == registerButton){
				registerButton.setIcon(new ImageIcon("D:\\ada\\注册.png"));
			}
		}
	}
	
	private class Focus implements FocusListener{
		@Override
		public void focusGained(FocusEvent e) {
			// TODO Auto-generated method stub  
		  	Object obj = e.getSource();	 
		  	if (obj == textPassword && !(textAccount.getText().isEmpty())){
		  		BaseDao ba = new BaseDao();
				imageLabel.setIcon(new ImageIcon(ba.findImage(textAccount.getText())));
			}
		
		}
		@Override
		public void focusLost(FocusEvent e) {
			// TODO Auto-generated method stub
			
		}
		
	}
	
	public static void main(String[] args){
		LoginForm login= new LoginForm();
		login.setUndecorated(true);
		//login.setTitle("登录");
		login.setVisible(true);
		login.setSize(600,400);
		login.setLayout(null);
		login.setLocationRelativeTo(null);
		login.setResizable(false);
	}
}
