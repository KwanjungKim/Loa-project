package loa.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import loa.backend.Service.UserService;
import loa.backend.model.UserModel;


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
    	sv.addUser2(model);
    	return "TEST";
    }
    
    @RequestMapping("/api/login")
    public String login(@RequestBody UserModel model) {
    	//auth_key, user_number, timeline_addr
    	System.out.println(model.getUser_number());
    	UserModel user = sv.login(model);
    	if(user != null) {
    		return user.getCharacter_name();
    	}
    	return "회원가입하셈";
    }
    
}
