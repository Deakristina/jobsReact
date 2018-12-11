import React from 'react';

const Input = ({ name, label, value, error, onChange, type, placeholder }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input
				autoFocus
				value={value}
				onChange={onChange}
				id={name}
				name={name}
				type={type}
				placeholder={placeholder}
				className="form-control"
			/>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

export default Input;
