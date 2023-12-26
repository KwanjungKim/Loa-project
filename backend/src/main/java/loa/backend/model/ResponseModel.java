package loa.backend.model;

import java.util.List;

import lombok.Data;

@Data
public class ResponseModel {

	private UserModel userModel;
	private BoardModel boardModel;
	private ResultModel resultModel;
	private List<CharacterModel> characterModel;
	
	public UserModel getUserModel() {
		return userModel;
	}
	public void setUserModel(UserModel userModel) {
		this.userModel = userModel;
	}
	public BoardModel getBoardModel() {
		return boardModel;
	}
	public void setBoardModel(BoardModel boardModel) {
		this.boardModel = boardModel;
	}
	public ResultModel getResultModel() {
		return resultModel;
	}
	public void setResultModel(ResultModel resultModel) {
		this.resultModel = resultModel;
	}
	public List<CharacterModel> getCharacterModel() {
		return characterModel;
	}
	public void setCharacterModel(List<CharacterModel> characterModel) {
		this.characterModel = characterModel;
	}
}
