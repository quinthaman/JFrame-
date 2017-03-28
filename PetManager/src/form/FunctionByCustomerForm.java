package form;

import java.awt.Color;
import java.awt.Cursor;
import java.awt.Font;
import java.awt.Frame;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;

import entity.User;
/**
 * 用户功能选择窗体
 * @author zhu
 *
 */
public class FunctionByCustomerForm extends JFrame{
	//先定义需要的组件
	
	
	JPanel upPanel;//上标题栏
	JPanel downPanel;//下标题栏
	JPanel betweenPanel;//中间标题栏
	
	JLabel nameLabel;
	JLabel moneyLabel;
	
	JButton buyPetBtn;
	JButton sellPetBtn;
	JButton exitButton;
	JButton minButton;
	JLabel imageLabel;
	
	//构造方法用来执行窗体的初始化设定
	public FunctionByCustomerForm(){
		MyItemListener mls = new MyItemListener();
		Mouse mouse = new Mouse();
		nameLabel = new JLabel();
		nameLabel.setText(User.name);
		nameLabel.setFont(new Font("微软雅黑",Font.BOLD,30));
		nameLabel.setForeground(Color.WHITE);
		nameLabel.setBounds(150,10,200,40);
		
		imageLabel = new JLabel();
		imageLabel.setBounds(50,10,80,80);
		imageLabel.setIcon(new ImageIcon(User.imageAddress));
		
		moneyLabel = new JLabel();
		moneyLabel.setText(User.money + "金");
		moneyLabel.setFont(new Font("微软雅黑",Font.HANGING_BASELINE,25));
		moneyLabel.setForeground(Color.ORANGE);
		moneyLabel.setBounds(150,60,150,30);
		
		buyPetBtn = new JButton();
		buyPetBtn.setFont(new Font("微软雅黑",Font.BOLD,20));
		buyPetBtn.setBounds(150,120,201,138);
		buyPetBtn.setBackground(Color.DARK_GRAY);
		buyPetBtn.setIcon(new ImageIcon("D:\\ada\\buy.png"));
		buyPetBtn.setContentAreaFilled(false);
		buyPetBtn.setBorder(null);
		buyPetBtn.addActionListener(mls);
		buyPetBtn.addMouseListener(mouse);
		
		sellPetBtn = new JButton();
		sellPetBtn.setFont(new Font("微软雅黑",Font.BOLD,20));
		sellPetBtn.setBounds(550,120,200,139);
		sellPetBtn.setIcon(new ImageIcon("D:\\ada\\sell.png"));
		sellPetBtn.setContentAreaFilled(false);
		sellPetBtn.setBorder(null);
		sellPetBtn.addActionListener(mls);
		sellPetBtn.addMouseListener(mouse);
		
		exitButton = new JButton();
		exitButton.setBounds(840,5,50,37);
		exitButton.setIcon(new ImageIcon("D:\\ada\\cat_exit.png"));
		exitButton.setContentAreaFilled(false);
		exitButton.setBorder(null);
		exitButton.addActionListener(mls);
		exitButton.addMouseListener(mouse);
		minButton = new JButton();
		minButton.setBounds(780,5,50,37);
		minButton.setIcon(new ImageIcon("D:\\ada\\cat_min.png"));
		minButton.setContentAreaFilled(false);
		minButton.setBorder(null);
		minButton.addMouseListener(mouse);
		minButton.addActionListener(mls);
		
		upPanel = new JPanel();
		upPanel.setBounds(0,0,900,100);
		upPanel.setBackground(Color.DARK_GRAY);
		upPanel.setLayout(null);
		
		betweenPanel = new JPanel();
		betweenPanel.setBounds(0,100,900,400);
		betweenPanel.setLayout(null);
		upPanel.add(imageLabel);
		upPanel.add(nameLabel);
		upPanel.add(moneyLabel);
		upPanel.add(exitButton);
		upPanel.add(minButton);
		betweenPanel.add(buyPetBtn);
		betweenPanel.add(sellPetBtn);
		
		downPanel = new JPanel();
		downPanel.setBounds(0,500,900,100);
		downPanel.setBackground(Color.DARK_GRAY);
		
		
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		this.add(upPanel);
		this.add(betweenPanel);
		this.add(downPanel);
		this.setLayout(null);
		this.setSize(900,600);
		this.setLocationRelativeTo(null);
		this.setResizable(false);
		this.setUndecorated(true);
	}	
		//监听类 负责处理点击事件
		private class MyItemListener implements ActionListener{
			public void actionPerformed(ActionEvent e) {
				// TODO Auto-generated method stub
				Object obj = e.getSource();
				if (obj == buyPetBtn) {
					close();
					BuyForm bf = new BuyForm();
					bf.setVisible(true);		
				}
				else if (obj == sellPetBtn) {
					JOptionPane.showMessageDialog(null,"注册","提示消息",JOptionPane.WARNING_MESSAGE);
				}
				else if (obj == exitButton) {
					System.exit(0);
				}
				else if (obj == minButton) {
					setExtendedState(Frame.ICONIFIED);
				}
			}

		}
		
		public void close(){
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
				if (obj == buyPetBtn){
					buyPetBtn.setIcon(new ImageIcon("D:\\ada\\buy_orange.png"));
					setCursor(new Cursor(Cursor.HAND_CURSOR));
				}
				else if(obj == sellPetBtn){
					sellPetBtn.setIcon(new ImageIcon("D:\\ada\\sell_orange.png"));
					setCursor(new Cursor(Cursor.HAND_CURSOR));
				}
				else if (obj == exitButton){
					exitButton.setIcon(new ImageIcon("D:\\ada\\cat_orange.png"));
				}
				else if(obj == minButton){
					minButton.setIcon(new ImageIcon("D:\\ada\\cat_min_orange.png"));
				}
				
			}

			@Override
			public void mouseExited(MouseEvent e) {
				// TODO Auto-generated method stub
				Object obj = e.getSource();
				if (obj == buyPetBtn){
					buyPetBtn.setIcon(new ImageIcon("D:\\ada\\buy.png"));
					setCursor(null);
				}
				else if(obj == sellPetBtn){
					sellPetBtn.setIcon(new ImageIcon("D:\\ada\\sell.png"));
					setCursor(null);
				}
				else if (obj == exitButton){
					exitButton.setIcon(new ImageIcon("D:\\ada\\cat_exit.png"));
				}
				else if(obj == minButton){
					minButton.setIcon(new ImageIcon("D:\\ada\\cat_min.png"));
				}
			}
		}
		
		
}
