import React, { useState, useRef } from 'react';
import './App.scss';
import { Form, Button, Checkbox, InputNumber, Tooltip, Input } from 'antd';
import generator from 'generate-password';
import Image from './password-128.png';

const App = () => {
	const [password, setPassword] = useState(null);
	const [copyText, setCopyText] = useState('Copy to clipboard');

	const generatedPasswordRef = useRef(null);

	const onFinish = (values) => {
		var password = generator.generate({
			length: values.password_length,
			numbers: values.include_number,
			symbols: values.include_symbol,
			lowercase: true,
			uppercase: values.include_uppercase_letter,
		});
		setPassword(password);
	};
	const onFinishFailed = (error) => {
		console.error(error);
	};
	const copyToClipboard = async () => {
		var textField = document.createElement('textarea');
		textField.innerText = generatedPasswordRef.current.state.value;
		document.body.appendChild(textField);
		textField.select();
		document.execCommand('copy');
		textField.remove();
		setCopyText('Copied!!');
	};
	const resetCopyText = () => {
		setTimeout(() => {
			setCopyText('Copy to clipboard');
		}, 400);
	};
	return (
		<div className='container'>
			<div className='header'>
				<div className='logo'>
					<img height={128} width={128} src={Image} alt='logo' />
					<h2>PassSanity </h2>
				</div>
				<span>have a password that even you can't remember</span>
			</div>
			<Form
				name='password_generator_form'
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label='Length of password'
					name='password_length'
					labelAlign='left'
					labelCol={{ span: 8 }}
					rules={[
						{
							required: true,
							message: 'Invalid length!',
						},
					]}
				>
					<InputNumber type='number' minLength={5} />
				</Form.Item>
				<Form.Item name='include_symbol' valuePropName='checked'>
					<Checkbox>Include symbols</Checkbox>
				</Form.Item>
				<Form.Item
					name='include_uppercase_letter'
					valuePropName='checked'
				>
					<Checkbox>Include uppercase letter</Checkbox>
				</Form.Item>
				<Form.Item name='include_number' valuePropName='checked'>
					<Checkbox>Include numbers</Checkbox>
				</Form.Item>
				<Button htmlType='submit' type='primary'>
					{password && password.length > 0
						? 'Generate again'
						: 'Generate'}
				</Button>
			</Form>
			{password && password.length > 0 && (
				<>
					<Tooltip
						title={copyText}
						color={'#2db7f5'}
						key={'#2db7f5'}
						placement='bottom'
					>
						<Input.TextArea
							autoSize={{ minRows: 1 }}
							onMouseLeave={resetCopyText}
							className='generated-password'
							ref={generatedPasswordRef}
							value={password}
							onClick={copyToClipboard}
							readOnly
						/>
					</Tooltip>
				</>
			)}
			<div className='footer'>
				Stronger the password, safer the account
			</div>
		</div>
	);
};

export default App;
