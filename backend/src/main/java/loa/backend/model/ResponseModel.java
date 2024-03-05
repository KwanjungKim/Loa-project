package loa.backend.model;

import java.util.List;

import lombok.Data;

@Data
public class ResponseModel {

	private UserModel userModel;
	private BoardModel boardModel;
	private ResultModel resultModel;
	private CharacterModel characterModel;
	private List<CharacterModel> characterModelList;
	private List<BoardModel> boardModelList;
	
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
	public CharacterModel getCharacterModel() {
		return characterModel;
	}
	public void setCharacterModel(CharacterModel characterModel) {
		this.characterModel = characterModel;
	}
	public List<CharacterModel> getCharacterModelList() {
		return characterModelList;
	}
	public void setCharacterModelList(List<CharacterModel> characterModel) {
		this.characterModelList = characterModel;
	}
	public List<BoardModel> getBoardModelList() {
		return boardModelList;
	}
	public void setBoardModelList(List<BoardModel> boardModelList) {
		this.boardModelList = boardModelList;
	}
}
