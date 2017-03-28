package form;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.Cursor;
import java.awt.Font;
import java.awt.Frame;
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
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.TableCellRenderer;
import javax.swing.table.TableColumn;
import javax.swing.text.TableView.TableRow;

import entity.User;

public class BuyForm extends JFrame{
	
	JPanel upPanel;
	JPanel betweenPanel;
	JPanel downPanel;
	JTable table;
	JButton exitButton;
	JButton minButton;
	JLabel nameLabel;
	JLabel moneyLabel;
	JLabel imageLabel;

	
	MyItemListener mls = new MyItemListener();
	Mouse mouse = new Mouse();
	public BuyForm(){
		upPanel = new JPanel();
		upPanel.setBounds(0,0,900,100);
		upPanel.setBackground(Color.DARK_GRAY);
		upPanel.setLayout(null);
		
		betweenPanel = new JPanel();
		betweenPanel.setBounds(0,100,900,400);
		//betweenPanel.setLayout(null);
		
		downPanel = new JPanel();
		downPanel.setBounds(0,500,900,100);
		downPanel.setBackground(Color.DARK_GRAY);
		
		imageLabel = new JLabel();
		imageLabel.setBounds(50,10,80,80);
		imageLabel.setIcon(new ImageIcon(User.imageAddress));
		
		moneyLabel = new JLabel();
		moneyLabel.setText(User.money + "金");
		moneyLabel.setFont(new Font("微软雅黑",Font.HANGING_BASELINE,25));
		moneyLabel.setForeground(Color.ORANGE);
		moneyLabel.setBounds(150,60,150,30);

		nameLabel = new JLabel();
		nameLabel.setText(User.name);
		nameLabel.setFont(new Font("微软雅黑",Font.BOLD,30));
		nameLabel.setForeground(Color.WHITE);
		nameLabel.setBounds(150,10,200,40);
		
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
		
		Object[][] datas = {
				{new Integer(1),"贝贝","企鹅",new Integer(50)},
				{new Integer(2),"肥仔","老虎",new Integer(70)},
				{new Integer(3),"狮子","狮子",new Integer(80)},
			
		};
		
		String[] titles = {"序号","宠物名称","类型","元宝数"};
		table = new JTable(datas,titles);
	
		TableColumn column = null;

		table.setRowHeight(50);
		for (int i = 0 ; i < 4; i++){
			column = table.getColumnModel().getColumn(i);
				column.setPreferredWidth(125);
		}
		
		JScrollPane scrollPane = new JScrollPane(table);
        table.setDefaultRenderer(Object.class,new EvenOddRenderer());         
        table.setBounds(200, 50, 500, 250);
		table.setFont(new Font("微软雅黑",Font.BOLD,20));
		table.setBorder(null);
		
        upPanel.add(imageLabel);
		upPanel.add(nameLabel);
		upPanel.add(moneyLabel);
		upPanel.add(exitButton);
		upPanel.add(minButton);
		
        betweenPanel.add(table);     
        betweenPanel.setLayout(null);
				
		this.add(upPanel);
		this.add(betweenPanel);
		this.add(downPanel);

		
		this.setLayout(null);
		this.setSize(900,600);
		this.setLocationRelativeTo(null);
		this.setResizable(false);
		this.setUndecorated(true);
	}
	
    private class EvenOddRenderer implements TableCellRenderer {     
        
        public final DefaultTableCellRenderer DEFAULT_RENDERER = new DefaultTableCellRenderer();     
          
        public Component getTableCellRendererComponent(JTable table, Object value,     
            boolean isSelected, boolean hasFocus, int row, int column) {     
          Component renderer =     
            DEFAULT_RENDERER.getTableCellRendererComponent(table, value,     
            isSelected, hasFocus, row, column);     
          Color foreground, background;     
          if (isSelected) {     
            foreground = Color.YELLOW;     
            background = Color.ORANGE;     
          }  else {     
            if (row % 2 == 0) {     
              foreground = Color.DARK_GRAY;     
              background = Color.WHITE;     
            }  else {     
              foreground = Color.WHITE;     
              background = Color.DARK_GRAY;     
            }     
          }     
          renderer.setForeground(foreground);     
          renderer.setBackground(background);     
          return renderer;     
        }     
      }
    
    private class MyItemListener implements ActionListener{
		public void actionPerformed(ActionEvent e) {
			// TODO Auto-generated method stub
			Object obj = e.getSource();
			if (obj == exitButton) {
				System.exit(0);
			}
			else if (obj == minButton) {
				setExtendedState(Frame.ICONIFIED);
			}
		}

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
		}
	}
}
