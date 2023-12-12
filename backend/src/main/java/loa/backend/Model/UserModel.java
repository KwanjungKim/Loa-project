package loa.backend.Model;

import lombok.Data;

@Data
public class UserModel {

	private Double user_number;
	private String Character_name;
	private String auth_key;
	private String timeline_addr;
	
	public Double getUser_number() {
		return user_number;
	}
	public void setUser_number(Double user_number) {
		this.user_number = user_number;
	}
	public String getCharacter_name() {
		return Character_name;
	}
	public void setCharacter_name(String character_name) {
		Character_name = character_name;
	}
	public String getAuth_key() {
		return auth_key;
	}
	public void setAuth_key(String auth_key) {
		this.auth_key = auth_key;
	}
	public String getTimeline_addr() {
		return timeline_addr;
	}
	public void setTimeline_addr(String timeline_addr) {
		this.timeline_addr = timeline_addr;
	}
}
