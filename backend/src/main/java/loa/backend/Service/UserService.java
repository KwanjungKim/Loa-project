package loa.backend.Service;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.time.Duration;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import loa.backend.mapper.UserMapper;
import loa.backend.model.ResultModel;
import loa.backend.model.UserModel;

@Service
public class UserService {
	
	private final UserMapper mapper;
	
	@Autowired
	public UserService(UserMapper mapper) {
		this.mapper = mapper;
	}
	
	public List<Map<String, Object>> getUser() {
		return mapper.getUser();
	}
	
	public void addUser(UserModel model) {
		String URL = model.getTimeline_addr();
		String timeline_key = "";
		System.out.println("크롬드라이버 시작");
		//버전 119.0.6045.200
	    try {
	    	
	    	System.setProperty("webdriver.chrome.driver", "src/main/resources/chromedriver/chromedriver.exe");
	    	
	    	ChromeOptions options = new ChromeOptions();
	    	options.addArguments("headless");
	    	WebDriver driver = new ChromeDriver(options);
	    	WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
	    	driver.get(URL);
	    	
	    	wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("profile-name")));

	    	List<WebElement> element = driver.findElements(By.tagName("meta"));
	    	for(int i = 0; i<element.size(); i++) {
	    		if(element.get(i).getAttribute("name").toString().equals("description")) {
	    			timeline_key = element.get(i).getAttribute("content");
	    			System.out.println("result "+timeline_key);
	    		}
	    	}
	    	driver.quit();
	    	
	    } catch(Exception e) {
	    	e.printStackTrace();
	    }
	    
	    System.out.println("인증키 비교");
	    if(timeline_key.equals(model.getAuth_key())) {
	    	System.out.println("인증키 확인 매퍼 설정");
	    	model.setCharacter_name("테스트");
	    	mapper.addUser(model);
	    } else {
	    	System.out.println(timeline_key+"  "+model.getAuth_key());
	    }
	}
	
	public ResultModel addUser2(UserModel model) {
		ResultModel result = new ResultModel();
		result.setStatus("fail");
    	result.setMessage("이미 회원 가입된 계정입니다.");
    	
    	UserModel user = login(model);
    	
    	if(user.getCharacter_name() == null) {
    		try {
        		URL url = new URL("http://api.onstove.com/tm/v1/preferences/"+model.getMemberNo());

                URLConnection conn = url.openConnection();
                conn.setDoOutput(true);
                conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
         
                try (BufferedReader bf = new BufferedReader(new InputStreamReader(conn.getInputStream())))
                {
                    String line;
                    while ((line = bf.readLine()) != null) {
                    	JSONParser jsonParser = new JSONParser();
                    	
                    	Object obj = jsonParser.parse(line);
                    	JSONObject jsonObj = (JSONObject) obj;

                    	Object obj2 = jsonParser.parse(jsonObj.get("data").toString());
                    	JSONObject jsonObj2 = (JSONObject) obj2;
                    	String timeline_key = jsonObj2.get("introduce").toString();
                    	if(timeline_key.equals(model.getAuth_key())) {
                	    	String encryptMemberNo = getEncryptMemberNo(model.getMemberNo());
                	    	model.setCharacter_name(getCharacterName(encryptMemberNo));
                	    	mapper.addUser(model);
                	    	
                	    	result.setStatus("success");
                	    	result.setMessage("회원가입되었습니다.");
                	    	return result;
                	    } else {
                	    	result.setStatus("fail");
                	    	result.setMessage("인증번호가 다릅니다.");
                	    	return result;
                	    }
                    }
                }
        	} catch (Exception e) {
        		e.printStackTrace();
        	}
    		result.setStatus("fail");
        	result.setMessage("서버오류입니다.");
        	return result;
    	}
    	return result;
	}
	
	public String getEncryptMemberNo(String memberNo) {
		
		String EncryptMemberNo = "";
		
		try {
			
			URL url = new URL("https://lostark.game.onstove.com/board/IsCharacterList");
	        String postData = "memberNo="+memberNo;

	        URLConnection conn = url.openConnection();
	        conn.setDoOutput(true);
	        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
	        conn.setRequestProperty("Content-Length", Integer.toString(postData.length()));
	 
	        try (DataOutputStream dos = new DataOutputStream(conn.getOutputStream())) {
	            dos.writeBytes(postData);
	        }
	 
	        try (BufferedReader bf = new BufferedReader(new InputStreamReader(conn.getInputStream())))
	        {
	            String line;
	            while ((line = bf.readLine()) != null) {
	                JSONParser jsonParser = new JSONParser();
                	Object obj = jsonParser.parse(line);
                	JSONObject jsonObj = (JSONObject) obj;
                	
                	EncryptMemberNo = jsonObj.get("encryptMemberNo").toString();
	            }
	        }
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return EncryptMemberNo;
	}
	
	public String getCharacterName(String EncryptMemberNo) {
		
		String CharacterName = "";
		String line = "";
		
		try {
			
			URL url = new URL("https://lostark.game.onstove.com/Profile/Member?id="+EncryptMemberNo);

	        URLConnection conn = url.openConnection();
	        conn.setDoOutput(true);
	        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
	 
	        try (BufferedReader bf = new BufferedReader(new InputStreamReader(conn.getInputStream())))
	        {
	            while ((line = bf.readLine()) != null) {
					
	            	if(line.contains("https://lostark.game.onstove.com/Profile/Character/")) {
					CharacterName = line.split("Character/")[1].split("<")[0];
	            	}
	            }
	        }
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		return CharacterName;
	}
	
	public UserModel login(UserModel model) {
		ResultModel result = new ResultModel();
		UserModel user = mapper.login(model);
   	 	
		if(user == null) {
			user = new UserModel();
			result.setStatus("fail");
	   	 	result.setMessage("회원가입이 필요합니다.");
	   	 	user.setResultModel(result);
	   	 	return user;
		}
		
		result.setStatus("success");
   	 	result.setMessage("로그인되었습니다.");
   	 	user.setResultModel(result);
		return user;
	}
}