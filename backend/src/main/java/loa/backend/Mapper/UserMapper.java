package loa.backend.Mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import loa.backend.Model.UserModel;

@Mapper
public interface UserMapper {

	/**
     * 회원 정보 가져오기
	 * @param UserModel 
     */
   public List<UserModel> getUser();
}
