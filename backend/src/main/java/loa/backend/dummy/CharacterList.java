package loa.backend.dummy;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import jakarta.servlet.http.HttpServletRequest;

public class CharacterList {
	@RequestMapping(value="/test.do", method = RequestMethod.GET)
    public String test(HttpServletRequest request) throws Exception {
        String data = request.getParameter("memberNo");
        System.out.println(request.getParameter("memberNo"));

        URL url = new URL("https://lostark.game.onstove.com/board/IsCharacterList");
        String postData = "memberNo="+data;

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
                System.out.println(line);
            }
        }

            return data;
    }
}
