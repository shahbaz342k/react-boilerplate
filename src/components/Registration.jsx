import React, { useState } from 'react'
import { Button, Flex, Form, Input, Layout, Alert } from 'antd'
import { Col, Row, Space } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// const { Header, Content, Footer } = Layout;
const APIBASEURL = process.env.REACT_APP_API_URL;

const Registration = () => {

    const [form] = Form.useForm();        // Access form instance
    const [isFormValid, setIsFormValid] = useState(null); 
    const [creteUserPayload, setCreteUserPayload] = useState({ username: '', email: '', password: '' });
    const [successMessage, setSuccessMessage] = useState('User created successfully');
    const [isCreated, setIsCreated] = useState(false);
    const navigate = useNavigate();

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
        // console.log(e.target.value);
        // setName(e.target.value);
        // const {name, value} = e.target;
        // console.log('name , value', name, value);
        // setCreteUserPayload((prevFiled) => ({
        //     ...prevFiled,
        //     [name]: value, // dynamically update the name based on input
        // }));

        const { name, value } = e.target; // Get name and value from the input

        // Update state based on input

        // setCreteUserPayload((prevNames) => ({
        //     ...prevNames,  // Retain previous state
        //     [name]: value, // Update the property dynamically
        // }));

        setCreteUserPayload((prevValues) =>({
            ...prevValues, // Retain previous state
            [name]: value, // Update the property dynamically
        }));


    }
    // const handleChangeEmail = (e) => {
    //     // console.log(e.target.value)
    //     setEmail(e.target.value);
    // }
    // const handleChangePassword = (e) => {
    //     // console.log(e.target.value);
    //     setPassword(e.target.value)
    // }
    // const handleChangeMobile = (e) => {
    //     // console.log(e.target.value)
    //     setMobile(e.target.value)
    // }
    const handleSubmit = async () => {
        console.log('handleSubmit', APIBASEURL);
        console.log('payload ', creteUserPayload);
        setIsCreated(false);
        let form = document.getElementById('basic');
        try{
            if (isFormValid) {
                let payload = {
                    username: creteUserPayload.username,
                    email: creteUserPayload.email,
                    password: creteUserPayload.password,
                }
                const { data } = await axios.post(`${APIBASEURL}/user/register`, payload);
                console.log('insert data api', data);
                if (data.success) {
                    setIsCreated(true);
                    console.log('user created successfully', data);
                    form.reset();
                    setTimeout(() => navigate('/admin/users'),3000)
                    
                }
            }
        }catch(err){
            console.log('form error handle', err.message);

        }
        
        // const {data} = await axios.get(`${APIBASEURL}/users`);
        // console.log('data api', data);
    }


    return (

        <>

            {isCreated ? 
            <Row justify={'center'} type="flex" align={'middle'}>
                    <Space direction="vertical">
                    <Alert
                        message={successMessage}
                        type="success"
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
                            label="Name"
                            name="username"
                            rules={[
                                { required: true, message: 'Please input your Name!' },
                                { min: 3, message: 'Name must be at least 3 characters long' },
                                { max: 50, message: 'Name cannot be longer than 50 characters' },
                                { pattern: /^[a-zA-Z_ ]+$/, message: 'Name can only contain letters, and underscores' },
                                { whitespace: true, message: 'Name cannot be empty spaces' },
                               
                              ]}
                        >
                            <Input name='username' onChange={handleChange} />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email!' },
                              ]}
                        >
                            <Input name='email' onChange={handleChange} />
                        </Form.Item>


                        {/* Mobile Field */}
                        {/* <Form.Item
                            label="Mobile Number"
                            name="mobile"
                            rules={[
                            { required: true, message: 'Please input your mobile number!' },
                            { pattern: /^[0-9]{10}$/, message: 'Mobile number must be 10 digits' },
                            ]}
                            <Input name='mobile' onChange={handleChange} />
                        ></Form.Item> */}

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                              { required: true, message: 'Please input your Password!' },
                              { min: 6, message: 'Name must be at least 6 characters long' },
                              { max: 50, message: 'Name cannot be longer than 50 Password' },
                              { whitespace: true, message: 'Name cannot be empty spaces' },
                            ]}
                        >
                            <Input.Password name='password' onChange={handleChange} />
                        </Form.Item>

                        {/* <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    {/* <Checkbox>Remember me</Checkbox> 
                </Form.Item> */}

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <div>
                        <Link to={'/admin/login'}>
                            Click here to login
                        </Link>
                        
                    </div>
                </Col>

            </Row>



        </>
    )
}
export default Registration