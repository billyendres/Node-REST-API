import React, { Component } from "react";
const axios = require("axios");

class Avatar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatar: null
		};
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	onFormSubmit(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append("avatar", this.state.file);
		const config = {
			headers: {
				"content-type": "multipart/form-data"
			}
		};
		axios
			.post("/users/profile/avatar", formData, config)
			.then(response => {
				alert("upload Success");
			})
			.catch(error => {});
	}
	onChange(e) {
		this.setState({ file: e.target.files[0] });
	}

	render() {
		return (
			<div>
				<form onSubmit={this.onFormSubmit}>
					<h1>File Upload</h1>
					<input type="file" name="avatar" onChange={this.onChange} />
					<button type="submit">Upload</button>
				</form>
			</div>
		);
	}
}

export default Avatar;
