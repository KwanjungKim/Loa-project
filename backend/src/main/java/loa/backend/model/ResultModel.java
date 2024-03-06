package loa.backend.model;

import lombok.Data;

@Data
public class ResultModel {

	private String status;
	private String message;

	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
}
