package loa.backend.model;

import java.util.List;

import lombok.Data;

@Data
public class BoardModel {

	private int board_number;
	private String title;
	private String content;
	private String user_number;
	private String character_name;
	private String raid_leader;
	private String proficiency;
	private String card_level;
	private String raid_type;
	private String raid_difficulty;
	private String startDate;
	private String minGate;
	private String maxGate;
	private String[] member;
	private String party_member;
	private List<BoardModel> board_list;
	private int member_count;
	
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
	public String getCharacter_name() {
		return character_name;
	}
	public void setCharacter_name(String character_name) {
		this.character_name = character_name;
	}
	public String getRaid_leader() {
		return raid_leader;
	}
	public void setRaid_leader(String raid_leader) {
		this.raid_leader = raid_leader;
	}
	public String getProficiency() {
		return proficiency;
	}
	public void setProficiency(String proficiency) {
		this.proficiency = proficiency;
	}
	public String getCard_level() {
		return card_level;
	}
	public void setCard_level(String card_level) {
		this.card_level = card_level;
	}
	public String getRaid_type() {
		return raid_type;
	}
	public void setRaid_type(String raid_type) {
		this.raid_type = raid_type;
	}
	public String getRaid_difficulty() {
		return raid_difficulty;
	}
	public void setRaid_difficulty(String raid_difficulty) {
		this.raid_difficulty = raid_difficulty;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getMinGate() {
		return minGate;
	}
	public void setMinGate(String minGate) {
		this.minGate = minGate;
	}
	public String getMaxGate() {
		return maxGate;
	}
	public void setMaxGate(String maxGate) {
		this.maxGate = maxGate;
	}
	public String[] getMember() {
		return member;
	}
	public void setMember(String[] member) {
		this.member = member;
	}
	public String getParty_member() {
		return party_member;
	}
	public void setParty_member(String party_member) {
		this.party_member = party_member;
	}
	public List<BoardModel> getBoard_list() {
		return board_list;
	}
	public void setBoard_list(List<BoardModel> board_list) {
		this.board_list = board_list;
	}
	public int getMember_count() {
		return member_count;
	}
	public void setMember_count(int member_count) {
		this.member_count = member_count;
	}
	
}
