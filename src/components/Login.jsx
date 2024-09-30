import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Alert } from 'antd'
import { Col, Row, Space } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const APIBASEURL = process.env.REACT_APP_API_URL;

const Login = () => {

    const [form] = Form.useForm();        // Access form instance
    const [isFormValid, setIsFormValid] = useState(null);
    const [creteUserPayload, setCreteUserPayload] = useState({ email: '', password: ''});
    const [successMessage, setSuccessMessage] = useState('LoggedIn successfully');
    const [isResponseGet, setIsResponseGet] = useState(false);
    const [alerType, setAlerType] = useState('success')
    const navigate = useNavigate();


    // const { login } = useAuth();

    const onFinish = (values) => {
        console.log('Form submitted:', values);
        setIsFormValid(true);               // Set form as valid after successful submission
        handleSubmit();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Validation Failed:', errorInfo);
        setIsFormValid(false);              // Set form as invalid if validation fails
    };

    
    const handleChange = (e) => {


        const { name, value } = e.target; // Get name and value from the input

        // Update state based on input
        setCreteUserPayload((prevNames) => ({
            ...prevNames,  // Retain previous state
            [name]: value, // Update the property dynamically
        }));


    }

    useEffect(() => {
        const isAuthenticated = !!localStorage.getItem('adminAuth');  // Simple token-based check
        console.log('Login ', isAuthenticated)
        if (isAuthenticated) {
            navigate('/dashboard/home')
        }
    }, [])

    const handleSubmit = async () => {
        console.log('handleSubmit', APIBASEURL);
        console.log('payload ', creteUserPayload);
        setIsResponseGet(false);
        let form = document.getElementById('basic');
        try {
            if (isFormValid) {
                let payload = {
                    email: creteUserPayload.email,
                    password: creteUserPayload.password,
                }
                const { data } = await axios.post(`${APIBASEURL}/user/login`, payload);
                console.log('insert data api', data);
                if (data.success) {
                    setIsResponseGet(true);
                    setSuccessMessage("LoggedIn successfully");
                    console.log('user loggedin successfully', data);
                    form.reset();
                    localStorage.setItem('adminAuth', data.token);
                    // login(data.token)
                    setTimeout(() => navigate('/dashboard/home'), 1000)
                    // navigate('/users');

                }
            }
        } catch (err) {
            console.log('form error handle', err.response.data.result);
            setIsResponseGet(true);
            setAlerType('error');
            setSuccessMessage(err.response.data.result);

        }
        // const {data} = await axios.get(`${APIBASEURL}/users`);
        // console.log('data api', data);
    }
   


    return (

        <>

            {isResponseGet ?
                <Row justify={'center'} type="flex" align={'middle'}>
                    <Space direction="vertical">
                        <Alert
                            message={successMessage}
                            type={alerType}
                            showIcon

                            closable
                        />
                    </Space>



                </Row>
                : ""}



            <Row justify={'center'} type="flex" align={'middle'} style={{ minHeight: '100vh' }}>

                <Col>

                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                        form={form}
                        // layout="vertical"
                        onFinish={onFinish}              // Called on successful validation
                        onFinishFailed={onFinishFailed}  // Called on validation failure
                    >

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input name='email' onChange={handleChange} />
                        </Form.Item>


                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password name='password' onChange={handleChange} />
                        </Form.Item>


                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>

                    <div>
                        <Link to={'/registration'}>
                            Click here to register
                        </Link>

                    </div>
                </Col>

            </Row>



        </>
    )
}
export default Login;