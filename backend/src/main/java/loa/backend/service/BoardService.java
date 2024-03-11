package loa.backend.service;

import java.util.List;
import java.util.Map;

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
	
	public ResponseModel getAllArticle(BoardModel model) {
		ResponseModel res = new ResponseModel();
		ResultModel result = new ResultModel();
		
		List<BoardModel> boardList = mapper.getAllArticle(model);
		
		result.setMessage("게시글 목록을 가져왔습니다.");
		result.setStatus("success");
		res.setBoardModelList(boardList);
		res.setResultModel(result);
		return res;
	}
	
	public ResponseModel getArticle(BoardModel model) {
		ResponseModel res = new ResponseModel();
		ResultModel result = new ResultModel();
		
		BoardModel bModel = mapper.getArticle(model);
		String[] partyMember = mapper.getPartyMember(model);
		bModel.setMember(partyMember);
		
		result.setMessage("게시글을 가져왔습니다.");
		result.setStatus("success");
		res.setBoardModel(bModel);
		res.setResultModel(result);
		return res;
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
	
	public ResponseModel apply(BoardModel model) {
		ResponseModel res = new ResponseModel();
		ResultModel result = new ResultModel();
		
		mapper.apply(model);
		
		result.setMessage("파티 신청에 성공했습니다.");
		result.setStatus("success");
		res.setResultModel(result);
		return res;
	}
	
	public ResponseModel getAllApplicants(BoardModel model) {
		ResponseModel res = new ResponseModel();
		ResultModel result = new ResultModel();
		
		List<BoardModel> boardList = mapper.getAllApplicants(model);
		
		res.setBoardModelList(boardList);
		result.setMessage("신청자 목록을 가져왔습니다.");
		result.setStatus("success");
		res.setResultModel(result);
		return res;
	}
	
	public ResponseModel acceptApplication(BoardModel model) {
		ResponseModel res = new ResponseModel();
		ResultModel result = new ResultModel();
		
		model.setParty_member(model.getCharacter_name());
		
		mapper.acceptApplication(model);
		mapper.addArticle3(model);
		
		result.setMessage("신청자를 수락했습니다.");
		result.setStatus("success");
		res.setResultModel(result);
		return res;
	}
	
	public ResponseModel rejectApplication(BoardModel model) {
		ResponseModel res = new ResponseModel();
		ResultModel result = new ResultModel();
		
		mapper.rejectApplication(model);
		
		result.setMessage("신청자를 거절했습니다.");
		result.setStatus("success");
		res.setResultModel(result);
		return res;
	}
	
	public ResponseModel cancelApplication(BoardModel model) {
		ResponseModel res = new ResponseModel();
		ResultModel result = new ResultModel();
		
		mapper.cancelApplication(model);
		
		result.setMessage("신청을 취소했습니다.");
		result.setStatus("success");
		res.setResultModel(result);
		return res;
	}
}
