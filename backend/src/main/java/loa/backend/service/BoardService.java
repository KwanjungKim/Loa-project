package loa.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import loa.backend.mapper.BoardMapper;
import loa.backend.model.BoardModel;
import loa.backend.model.ResponseModel;

@Service
public class BoardService {

	private final BoardMapper mapper;
	
	@Autowired
	public BoardService(BoardMapper mapper) {
		this.mapper = mapper;
	}
	
	public ResponseModel addArticle(BoardModel model) {
		ResponseModel res = new ResponseModel();
		model.setBoard_number(mapper.checkBoardNum().getBoard_number()+1);
		mapper.addArticle1(model);
		mapper.addArticle2(model);
		for(int i=0; i < model.getMember().length; i++ ) {
			model.setParty_member(model.getMember()[i]);
			mapper.addArticle3(model);
		}
		mapper.addArticle4(model);
		return res;
	}
}
