package loa.backend.Dummy;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.Duration;
import java.util.List;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IntroduceCopy {

	String URL = "https://timeline.onstove.com/160997106";
    private static final String GET = "GET";
    private static final String USER_AGENT = "Mozilla/5.0";
    private static final String DATA = "test data";

    @GetMapping("/test")
    public String test() throws Exception {
        URL url = new URL(URL);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        connection.setRequestMethod(GET);
        connection.setRequestProperty("User-Agent", USER_AGENT);

        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuffer stringBuffer = new StringBuffer();
        String inputLine;

        while ((inputLine = bufferedReader.readLine()) != null)  {
        	stringBuffer.append(inputLine);
        }
        bufferedReader.close();

        String response = stringBuffer.toString();

        System.out.println(response);
        return response;
    }
    
    @GetMapping("/test2")
    public void test2() throws Exception {
    	Connection con = Jsoup.connect(URL);
    	
    	Document doc = con.get();
    	System.out.println(doc);
    }
    
    @GetMapping("/test3")
    public void test3() throws Exception {
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
    			System.out.println("result "+element.get(i).getAttribute("content"));
    		}
    	}
    	
    	driver.quit();
    }
}
