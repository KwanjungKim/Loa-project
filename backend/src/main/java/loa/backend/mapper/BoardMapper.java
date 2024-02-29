package loa.backend.mapper;

import org.apache.ibatis.annotations.Mapper;

import loa.backend.model.BoardModel;
import loa.backend.model.CharacterModel;

@Mapper
public interface BoardMapper {

	void addArticle1(BoardModel model);
	void addArticle2(BoardModel model);
	void addArticle3(BoardModel model);
	void addArticle4(BoardModel model);
	
	BoardModel checkBoardNum();
	
	BoardModel getRaid(CharacterModel model);
	
}
