package loa.backend.Controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.sql.Connection;
import java.sql.DriverManager;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import loa.backend.Model.UserModel;
import loa.backend.Service.UserService;


@RestController
public class HelloController {
	
	@Autowired
	private UserService sv;
	
    @GetMapping("/api/hello")
    public String test() {
        return "Hello, world!";
    }
    
    @RequestMapping("/api/addUser")
    public String addUser(@RequestBody UserModel model) {
    	//auth_key, user_number, timeline_addr
    	sv.addUser(model);
    	return "TEST";
    }
    
    @RequestMapping("/api/getUser")
    public String getUser() {
    	System.out.println(sv.getUser().get(0));
    	return "TEST";
    }
    
    @RequestMapping("/api/addUser2")
    public String addUser2(@RequestBody UserModel model) {
    	//auth_key, user_number, timeline_addr
    	System.out.println(model.getAuth_key());
    	sv.addUser2(model);
    	return "TEST";
    }
    
    
    
}
