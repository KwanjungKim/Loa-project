package loa.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import loa.backend.model.BoardModel;
import loa.backend.model.ResultModel;
import loa.backend.service.BoardService;

@RestController
@CrossOrigin(origins="http://localhost:5173")
public class BoardController {

	@Autowired
	private BoardService sv;
	
	@RequestMapping("/board/create")
	public ResultModel createArticle(@RequestBody BoardModel model) {
		ResultModel result = sv.createArticle(model);
		return result;
	}
	
}
