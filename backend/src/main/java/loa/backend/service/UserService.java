package loa.backend.service;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.time.Duration;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
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
import loa.backend.model.CharacterModel;
import loa.backend.model.ResponseModel;
import loa.backend.model.ResultModel;
import loa.backend.model.UserModel;

@Service
public class UserService {
	
	private final UserMapper mapper;
	
	@Autowired
	public UserService(UserMapper mapper) {
		this.mapper = mapper;
	}
	
	public ResponseModel join(UserModel model) {
		ResultModel result = new ResultModel();
		
		result.setStatus("fail");
    	result.setMessage("이미 회원 가입된 계정입니다.");
    	
    	ResponseModel res = login(model);
    	
    	if(res.getUserModel().getCharacter_name() == null) {
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
                	    	addCharacter(model);
                	    	result.setStatus("success");
                	    	result.setMessage("회원가입되었습니다.");
                	    	res.setResultModel(result);
                	    	return res;
                	    } else {
                	    	result.setStatus("fail");
                	    	result.setMessage("인증번호가 다릅니다.");
                	    	res.setResultModel(result);
                	    	return res;
                	    }
                    }
                }
        	} catch (Exception e) {
        		e.printStackTrace();
        	}
    		result.setStatus("fail");
        	result.setMessage("서버오류입니다.");
        	res.setResultModel(result);
        	return res;
    	}
    	return res;
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
	
	public ResponseModel login(UserModel model) {
		ResultModel result = new ResultModel();
		ResponseModel res = new ResponseModel();
		
		UserModel user = mapper.login(model);
   	 	
		if(user == null) {
			user = new UserModel();
			result.setStatus("fail");
	   	 	result.setMessage("회원가입이 필요합니다.");
	   	 	res.setResultModel(result);
	   	 	res.setUserModel(user);
	   	 	return res;
		}
		
		result.setStatus("success");
   	 	result.setMessage("로그인되었습니다.");
   	 	res.setCharacterModel(mapper.getCharacterName(model));
   	 	res.setUserModel(user);
   	 	res.setResultModel(result);
		return res;
	}
	
	public ResponseModel deleteUser(UserModel model) {
		ResultModel result = new ResultModel();
		ResponseModel res = login(model);
		
		result.setStatus("fail");
		result.setMessage("존재하지 않는 유저입니다.");
		if(res.getUserModel().getCharacter_name() != null) {
			result.setStatus("success");
			result.setMessage(res.getUserModel().getCharacter_name()+" 삭제되었습니다.");
			mapper.deleteUser(model);
		}
		res.setResultModel(result);
		return res;
	}
	
	public void addCharacter(UserModel model) throws Exception {

		String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwODk0MDEifQ.JqWNtjriyi1wXQrT32-byWWLg_-11Ou3kilsa4b4zwBjY6QkBxIdpTK_SQgJyN77OxqHJpJR0r1SeUc3Evj675X8I5ub5qYooOJe8SNw1xxp9BKYDi6lQ-gPz1ofK3POA0PfFkn08_263PoVNcu5NTnTq7v9EQa5n0HXonuxdGhJi_qmAM90QkcrdcR5_OLgqpaXdpC3AK7TqyrQHGVKkA46LGojM7ANjDa2aJtTw6a5bN3YKBnjtXFw8ewDWyXBaYu4uyhCsseeMxatA4J2y_82MDEy-9bDRtW0c9gTCAblfSnYxHlo6xu8OfvBGtHov_JO3C3CISF-D6A6BbfpWw";
		String user = URLEncoder.encode(model.getCharacter_name(), "UTF-8");
		URL url = new URL("https://developer-lostark.game.onstove.com/characters/"+user+"/siblings");
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestProperty("Authorization","Bearer " + token);
	    conn.setRequestProperty("Content-Type","application/json");
	    conn.setRequestMethod("GET");
	    
	    Map<String, List<String>> map = conn.getHeaderFields();
	    System.out.println("Limit remain : "+map.get("x-ratelimit-remaining").get(0));
	    

	    try (BufferedReader bf = new BufferedReader(new InputStreamReader(conn.getInputStream())))
        {
            String line;
            while ((line = bf.readLine()) != null) {
                JSONArray jsonArr = new JSONArray();
                JSONParser jsonParser = new JSONParser();
                jsonArr = (JSONArray) jsonParser.parse(line);

                for (int i = 0; i < jsonArr.size(); i++) {
                    JSONObject jsonObj = (JSONObject) jsonArr.get(i);
                    CharacterModel character = new CharacterModel();
                    character.setUser_number(model.getUser_number());
                    character.setServerName(jsonObj.get("ServerName").toString());
                    character.setCharacter_name(jsonObj.get("CharacterName").toString());
                    character.setCharacterLevel(jsonObj.get("CharacterLevel").toString());
                    character.setCharacterClassName(jsonObj.get("CharacterClassName").toString());
                    character.setItemAvgLevel(jsonObj.get("ItemAvgLevel").toString());
                    character.setItemMaxLevel(jsonObj.get("ItemMaxLevel").toString());
                    mapper.addCharacter(character);
                }
            }
        }
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
}
