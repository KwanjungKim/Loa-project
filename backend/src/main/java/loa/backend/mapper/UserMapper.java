package loa.backend.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import loa.backend.model.UserModel;

@Mapper
public interface UserMapper {

	/**
     * 회원 정보 가져오기
	 * @param 
     */
	List<Map<String, Object>> getUser();
	
	void addUser(UserModel model);
	
	UserModel login(UserModel model);
}
