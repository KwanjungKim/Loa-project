package loa.backend.model;

import lombok.Data;

@Data
public class BoardModel {

	private int board_number;
	private String title;
	private String content;
	private String user_number;
	private String create_date;
	private String modify_date;
	private int view_cnt;
	private String raid_leader;
	private String understand_level;
	private String card_level;
	private int character_lever;
	private String[] raid_member;
	private String raid_type;
	private int raid_phase;
	private String raid_difficulty;
	private String raid_date;
	private String status;
	
	public int getBoard_number() {
		return board_number;
	}
	public void setBoard_number(int board_number) {
		this.board_number = board_number;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getUser_number() {
		return user_number;
	}
	public void setUser_number(String user_number) {
		this.user_number = user_number;
	}
	public String getCreate_date() {
		return create_date;
	}
	public void setCreate_date(String create_date) {
		this.create_date = create_date;
	}
	public String getModify_date() {
		return modify_date;
	}
	public void setModify_date(String modify_date) {
		this.modify_date = modify_date;
	}
	public int getView_cnt() {
		return view_cnt;
	}
	public void setView_cnt(int view_cnt) {
		this.view_cnt = view_cnt;
	}
	public String getRaid_leader() {
		return raid_leader;
	}
	public void setRaid_leader(String raid_leader) {
		this.raid_leader = raid_leader;
	}
	public String getUnderstand_level() {
		return understand_level;
	}
	public void setUnderstand_level(String understand_level) {
		this.understand_level = understand_level;
	}
	public String getCard_level() {
		return card_level;
	}
	public void setCard_level(String card_level) {
		this.card_level = card_level;
	}
	public int getCharacter_lever() {
		return character_lever;
	}
	public void setCharacter_lever(int character_lever) {
		this.character_lever = character_lever;
	}
	public String[] getRaid_member() {
		return raid_member;
	}
	public void setRaid_member(String[] raid_member) {
		this.raid_member = raid_member;
	}
	public String getRaid_type() {
		return raid_type;
	}
	public void setRaid_type(String raid_type) {
		this.raid_type = raid_type;
	}
	public int getRaid_phase() {
		return raid_phase;
	}
	public void setRaid_phase(int raid_phase) {
		this.raid_phase = raid_phase;
	}
	public String getRaid_difficulty() {
		return raid_difficulty;
	}
	public void setRaid_difficulty(String raid_difficulty) {
		this.raid_difficulty = raid_difficulty;
	}
	public String getRaid_date() {
		return raid_date;
	}
	public void setRaid_date(String raid_date) {
		this.raid_date = raid_date;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
}
