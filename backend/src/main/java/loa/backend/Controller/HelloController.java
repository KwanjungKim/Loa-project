package loa.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

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
    
    @RequestMapping("/api/ping")
    public ResultModel pingpongtest(@RequestParam("id") String param) {
    	ResultModel result = new ResultModel();
    	
    	result.setStatus("fail");
   	 	result.setMessage("ping이 아닙니다.");
    	
    	if(param.equals("ping")) {
    		result.setStatus("success");
       	 	result.setMessage("pong");
    	}
    	return result;
    }
    
    @RequestMapping("/api/ping2")
    public ModelAndView pingpongtest2(@RequestParam("id") String param) {
    	ModelAndView mv = new ModelAndView();
    	
    	ResultModel result = new ResultModel();
    	
    	result.setStatus("fail");
   	 	result.setMessage("ping이 아닙니다.");
    	
    	if(param.equals("ping")) {
    		result.setStatus("success");
       	 	result.setMessage("pong");
    	}
    	
    	mv.addObject("result", result);
    	return mv;
    }
    
}
