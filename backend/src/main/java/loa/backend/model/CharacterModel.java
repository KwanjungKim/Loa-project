package loa.backend.model;

import org.json.simple.JSONObject;

import lombok.Data;

@Data
public class CharacterModel {
	private String user_number;
	private String ServerName;
	private String character_name;
	private String CharacterLevel;
	private String CharacterClassName;
	private String ItemAvgLevel;
	private String ItemMaxLevel;
	private JSONObject CardEffects;
	private JSONObject ArmoryGem;
	private JSONObject ArmoryEngraving;
	
	public String getUser_number() {
		return user_number;
	}
	public void setUser_number(String user_number) {
		this.user_number = user_number;
	}
	public String getServerName() {
		return ServerName;
	}
	public void setServerName(String serverName) {
		ServerName = serverName;
	}
	public String getCharacter_name() {
		return character_name;
	}
	public void setCharacter_name(String character_name) {
		this.character_name = character_name;
	}
	public String getCharacterLevel() {
		return CharacterLevel;
	}
	public void setCharacterLevel(String characterLevel) {
		CharacterLevel = characterLevel;
	}
	public String getCharacterClassName() {
		return CharacterClassName;
	}
	public void setCharacterClassName(String characterClassName) {
		CharacterClassName = characterClassName;
	}
	public String getItemAvgLevel() {
		return ItemAvgLevel;
	}
	public void setItemAvgLevel(String itemAvgLevel) {
		ItemAvgLevel = itemAvgLevel;
	}
	public String getItemMaxLevel() {
		return ItemMaxLevel;
	}
	public void setItemMaxLevel(String itemMaxLevel) {
		ItemMaxLevel = itemMaxLevel;
	}
	public JSONObject getCardEffects() {
		return CardEffects;
	}
	public void setCardEffects(JSONObject cardEffects) {
		CardEffects = cardEffects;
	}
	public JSONObject getArmoryGem() {
		return ArmoryGem;
	}
	public void setArmoryGem(JSONObject armoryGem) {
		ArmoryGem = armoryGem;
	}
	public JSONObject getArmoryEngraving() {
		return ArmoryEngraving;
	}
	public void setArmoryEngraving(JSONObject armoryEngraving) {
		ArmoryEngraving = armoryEngraving;
	}

}
