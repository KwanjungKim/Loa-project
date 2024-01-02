package loa.backend.controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import loa.backend.model.ResponseModel;
import loa.backend.model.ResultModel;
import loa.backend.model.UserModel;
import loa.backend.service.UserService;


@RestController
@CrossOrigin(origins="http://localhost:5173")
public class UserController {
	
	@Autowired
	private UserService sv;
    
    @RequestMapping("/user/join")
    public ResponseModel join(@RequestBody UserModel model) {
    	ResponseModel res = sv.join(model);
    	return res;
    }
    
    @RequestMapping("/user/login")
    public ResponseModel login(@RequestBody UserModel model) {
    	ResponseModel res = sv.login(model);
    	return res;
    }
    
    @RequestMapping("/user/getAllCharacters")
    public ResponseModel getAllCharacters(@RequestBody UserModel model) {
    	ResponseModel res = sv.getAllCharacters(model);
    	return res;
    }
    
    @RequestMapping("/user/updateCharacters")
    public ResponseModel updateCharacters(@RequestBody UserModel model) {
    	ResponseModel res = new ResponseModel();
    	ResultModel result = new ResultModel();
    	try {
			sv.addCharacter(model);
			result.setMessage("갱신되었습니다.");
			result.setStatus("success");
			res.setResultModel(result);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			result.setMessage("서버오류입니다.");
			result.setStatus("fail");
			res.setResultModel(result);
		}
    	return res;
    }
    
    @RequestMapping("/user/delete")
    public ResponseModel deleteUser(@RequestBody UserModel model) {
    	ResponseModel res = sv.deleteUser(model);
    	return res;
    }
    
    //TEST APIs
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
    public ResponseModel pingpongtest2(@RequestBody JSONObject param) {
    	System.out.println(param.get("id"));
    	ResultModel result = new ResultModel();
    	ResponseModel res = new ResponseModel();
    	
    	result.setStatus("fail");
   	 	result.setMessage("ping이 아닙니다.");
    	if(param.get("id").equals("ping")) {
    		result.setStatus("success");
       	 	result.setMessage("pong");
    	}
    	res.setResultModel(result);
    	return res;
    }
    
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

}
