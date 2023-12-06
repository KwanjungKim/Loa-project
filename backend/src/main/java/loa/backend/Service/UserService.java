package loa.backend.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import loa.backend.Mapper.UserMapper;
import loa.backend.Model.UserModel;

@Service
public class UserService {
	
	UserMapper mapper;
	
	public List<UserModel> getUser() {
		return mapper.getUser();
	}

}
