package loa.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import loa.backend.mapper.BoardMapper;
import loa.backend.model.BoardModel;
import loa.backend.model.ResultModel;

@Service
public class BoardService {

	private final BoardMapper mapper;
	
	@Autowired
	public BoardService(BoardMapper mapper) {
		this.mapper = mapper;
	}
	
	public ResultModel createArticle(BoardModel model) {
		ResultModel result = new ResultModel();
		
		
		return result;
	}
}
