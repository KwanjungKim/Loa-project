package loa.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import loa.backend.Service.UserService;
import loa.backend.model.ResultModel;
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
    	System.out.println(model.getAuth_key());
    	sv.addUser2(model);
    	return "TEST";
	}
    public ResultModel addUser2(@RequestBody UserModel model) {
    	ResultModel result = new ResultModel();
    	
    	result.setStatus("fail");
    	result.setMessage("이미 회원 가입된 계정입니다.");
    	
    	result = sv.login(model);
    	
    	if(result.getStatus() == "fail") {
    		return sv.addUser2(model);
    	} else {
    		result.setStatus("fail");
        	result.setMessage("이미 회원 가입된 계정입니다.");
    	}
    	return result;

    }
    
    @RequestMapping("/api/login")
    public ResultModel login(@RequestBody UserModel model) {
    	ResultModel result = new ResultModel();
    	
    	result.setStatus("fail");
   	 	result.setMessage("회원가입이 필요합니다.");
   	 	
    	result = sv.login(model);
    	
    	if(result != null) {
    		return result;
    	}
    	return result;
    }
    
}
