package loa.backend.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/Member")
public class MemberController {
    @RequestMapping("Login")
    public String Login() {
        return "Hello, world!";
    }
}
