package loa.backend.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import loa.backend.model.BoardModel;
import loa.backend.model.CharacterModel;

@Mapper
public interface BoardMapper {
	List<BoardModel> getAllArticle(BoardModel model);
	BoardModel getArticle(BoardModel model);
	String[] getPartyMember(BoardModel model);
	
	void addArticle1(BoardModel model);
	void addArticle2(BoardModel model);
	void addArticle3(BoardModel model);
	void addArticle4(BoardModel model);
	
	BoardModel checkBoardNum();
	
	List<BoardModel> getRaid(BoardModel model);
	
	List<BoardModel> getRaidOnQue(BoardModel model);
	
	void deleteArticle(BoardModel model);
	
	void apply(BoardModel model);
	
	List<BoardModel> getAllApplicants(BoardModel model);
	
	void acceptApplication(BoardModel model);
	
	void rejectApplication(BoardModel model);
	
	void cancelApplication(BoardModel model);
}
