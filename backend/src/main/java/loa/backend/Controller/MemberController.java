package loa.backend.Controller;

import java.time.Duration;
import java.util.List;
import java.util.Map;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@CrossOrigin(origins="http://localhost:5173")
@RequestMapping("/Member")
public class MemberController {
	@ResponseBody
    @RequestMapping("join")
    public String join(@RequestParam Map<String, Object> paramMap) {
    	String URL = paramMap.get("timeline_addr").toString();
    	String user_number = paramMap.get("user_number").toString();
    	String auth_key = paramMap.get("auth_key").toString();
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
