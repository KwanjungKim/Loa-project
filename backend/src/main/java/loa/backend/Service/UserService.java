package loa.backend.Service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import loa.backend.mapper.UserMapper;

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
	
	public void addUser() {
		System.out.println("test");
	}
}
