package loa.backend.Controller;

import java.sql.Connection;
import java.sql.DriverManager;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import loa.backend.Service.UserService;


@RestController
public class HelloController {
	
    @GetMapping("/api/hello")
    public String test() {
        return "Hello, world!";
    }
    
    @RequestMapping("/api/adduser")
    public String addUser() {
    	UserService sv = new UserService();
    	System.out.println(sv.getUser().get(0));
    	return "TEST";
    }
    
    @RequestMapping("/api/db")
    public String db() throws Exception {
    	String DRIVER = "org.mariadb.jdbc.Driver";
    	String URL = "jdbc:mariadb://loain.cab269b7tt71.ap-northeast-2.rds.amazonaws.com:3306/loain?serverTimezone=Asia/Seoul&characterEncoding=UTF-8";
    	String USER = "root";
    	String PW = "789qwe!!";
    	
    	Class.forName(DRIVER);
    	
    	try(Connection con = DriverManager.getConnection(URL, USER, PW)) {
    		System.out.println("성공");
    		System.out.println(con);
    	}catch (Exception e) {
    		System.out.println("에러발생");
    		e.printStackTrace();
    	}

    	return "success";
    }
    
    @RequestMapping("/api/db2")
    public String db2() throws Exception {
    	String DRIVER = "org.mariadb.jdbc.Driver";
    	String URL = "jdbc:mariadb://localhost:3306/test";
    	String USER = "root"; //DB 사용자명  
    	String PW = "1234"; //DB 사용자 비밀번호  
    	
    	Class.forName(DRIVER);
    	
    	try(Connection con = DriverManager.getConnection(URL, USER, PW)) {
    		System.out.println("성공");
    		System.out.println(con);
    	}catch (Exception e) {
    		System.out.println("에러발생");
    		e.printStackTrace();
    	}

    	return "success";
    }
}
