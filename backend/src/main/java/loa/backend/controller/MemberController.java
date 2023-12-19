package loa.backend.controller;

import java.time.Duration;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import loa.backend.model.UserModel;

@Controller
@CrossOrigin(origins="http://localhost:5173")
@RequestMapping("/member")
public class MemberController {

    @PostMapping("join")
    public String join(@RequestBody UserModel paramMap) {
    	String URL = paramMap.getTimeline_addr();
    	String user_number = paramMap.getUser_number();
    	String auth_key = paramMap.getAuth_key();
    	System.out.println("addr : "+URL+" , user_number : "+user_number+" , auth_key : "+auth_key);
    	
    	String result = "";
    	System.setProperty("webdriver.chrome.driver", "src/main/resources/chromedriver/chromedriver.exe");
    	
    	ChromeOptions options = new ChromeOptions();
    	options.addArguments("headless");
    	WebDriver driver = new ChromeDriver(options);
    	WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    	driver.get(URL);
    	
    	wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("article")));

    	List<WebElement> element = driver.findElements(By.tagName("meta"));
    	for(int i = 0; i<element.size(); i++) {
    		if(element.get(i).getAttribute("name").toString().equals("description")) {
    			result = element.get(i).getAttribute("content");
    			System.out.println("result "+ result);
    		}
    	}
    	driver.quit();
        return result;
    }
}
