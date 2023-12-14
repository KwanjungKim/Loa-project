package loa.backend.Controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import loa.backend.Service.UserService;
import loa.backend.model.ResultModel;
import loa.backend.model.UserModel;


@RestController
@CrossOrigin(origins="http://localhost:5173")
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
    public ResultModel addUser2(@RequestBody UserModel model) {
    	
    	ResultModel result = sv.addUser2(model);
    	
    	return result;

    }
    
    @RequestMapping("/api/login")
    public UserModel login(@RequestBody UserModel model) {
    	UserModel user = sv.login(model);
    	return user;
    }
    
    @RequestMapping("/api/ping")
    public ResultModel pingpongtest(@RequestBody JSONObject param) {
    	System.out.println(param.get("id"));
    	ResultModel result = new ResultModel();
    	
    	result.setStatus("fail");
   	 	result.setMessage("ping이 아닙니다.");
    	
    	if(param.get("id").equals("ping")) {
    		result.setStatus("success");
       	 	result.setMessage("pong");
    	}
    	return result;
    }
    
    @RequestMapping("/api/ping2")
    public UserModel pingpongtest2(@RequestBody JSONObject param) {
    	System.out.println(param.get("id"));
    	ResultModel result = new ResultModel();
    	
    	result.setStatus("fail");
   	 	result.setMessage("ping이 아닙니다.");
    	if(param.get("id").equals("ping")) {
    		result.setStatus("success");
       	 	result.setMessage("pong");
    	}
    	UserModel user = new UserModel();
    	user.setResultModel(result);
    	return user;
    }
    
}
