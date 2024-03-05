package loa.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import loa.backend.model.BoardModel;
import loa.backend.model.CharacterModel;
import loa.backend.model.ResponseModel;
import loa.backend.service.BoardService;

@RestController
@CrossOrigin(origins="http://localhost:5173")
public class BoardController {

	@Autowired
	private BoardService sv;
	
	@RequestMapping("/board/getAllArticle")
	public ResponseModel getAllarticle() {
		ResponseModel res = sv.getAllArticle();
		return res;
	}
	
	@RequestMapping("/board/addArticle")
	public ResponseModel addArticle(@RequestBody BoardModel model) {
		System.out.println("테스트용  "+model.getStartDate());
		ResponseModel res = sv.addArticle(model);
		return res;
	}
	
	@RequestMapping("/board/getRaid")
	public ResponseModel getRaid(@RequestBody CharacterModel model) {
		ResponseModel res = sv.getRaid(model);
		return res;
	}
	
	@RequestMapping("/board/deleteArticle")
	public ResponseModel deleteArticle(@RequestBody BoardModel model) {
		ResponseModel res = sv.deleteArticle(model);
		return res;
	}
}
