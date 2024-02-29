package loa.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import loa.backend.mapper.BoardMapper;
import loa.backend.model.BoardModel;
import loa.backend.model.CharacterModel;
import loa.backend.model.ResponseModel;
import loa.backend.model.ResultModel;

@Service
public class BoardService {

	private final BoardMapper mapper;
	
	@Autowired
	public BoardService(BoardMapper mapper) {
		this.mapper = mapper;
	}
	
	public ResponseModel addArticle(BoardModel model) {
		ResponseModel res = new ResponseModel();
		ResultModel result = new ResultModel();
		
		model.setBoard_number(mapper.checkBoardNum().getBoard_number()+1);
		mapper.addArticle1(model);
		mapper.addArticle2(model);
		for(int i=0; i < model.getMember().length; i++ ) {
			model.setParty_member(model.getMember()[i]);
			mapper.addArticle3(model);
		}
		mapper.addArticle4(model);
		
		result.setMessage("레이드 일정이 등록되었습니다.");
		result.setStatus("success");
		res.setResultModel(result);
		return res;
	}
	
	public ResponseModel deleteArticle(BoardModel model) {
		ResponseModel res = new ResponseModel();
		ResultModel result = new ResultModel();
		
		mapper.deleteArticle(model);
		
		result.setMessage("게시글이 삭제되었습니다.");
		result.setStatus("success");
		res.setResultModel(result);
		return res;
	}
	
	public ResponseModel getRaid(CharacterModel model) {
		ResponseModel res = new ResponseModel();
		ResultModel result = new ResultModel();
		BoardModel bModel = new BoardModel();
		
		List<BoardModel> boardList = mapper.getRaid(model);
		bModel.setBoard_list(boardList);
		
		result.setMessage("레이드 일정을 가져왔습니다.");
		result.setStatus("success");
		res.setBoardModel(bModel);
		res.setResultModel(result);
		return res;
	}
}
