import { Button, Card, Form, Input,Alert } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Col, Row, Space, Upload } from 'antd';
import './/UserLogin.css';

const APIBASEURL = process.env.REACT_APP_API_URL;
const Userlogin = () => {
  console.log('API_url', APIBASEURL)
  const [form] = Form.useForm();
  const [creteUserPayload, setCreteUserPayload] = useState({ emp_id: '' });
  const [isFormValid, setIsFormValid] = useState(null);
  const [successMessage, setSuccessMessage] = useState('Added sucessfully');
  const [isResponseGet, setIsResponseGet] = useState(false);
  const [alerType, setAlerType] = useState('success')

  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Form submitted:', values);
    setIsFormValid(true);
    // handleSubmit();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Validation Failed:', errorInfo);
    setIsFormValid(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCreteUserPayload((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }
  const handleSubmit = async () => {
    console.log('handleSubmit', APIBASEURL);
    console.log('payload ', creteUserPayload);
    // setIsCreated(false);
    let form = document.getElementById('basic');
    try {
      if (isFormValid) {
        let payload = {
          employee_id: creteUserPayload.emp_id,
          // email: creteUserPayload.email,
          // password: creteUserPayload.password,
        }
        const { data } = await axios.post(`${APIBASEURL}/auth/login`, payload);
        console.log('Login', data);
        if (data.status) {
          // setIsCreated(true);
          // console.log('user login successfully', data.data.user.user_type);
          if (data.data.user.user_type === 1) {
            localStorage.setItem('userAuth', data.data.token);
            localStorage.setItem('employee_Id', data.data.user.employee_id);
            setAlerType('success');
            setIsResponseGet(true);
            setSuccessMessage("User Loggedin successfully");
            form.reset();
            setTimeout(() => navigate('/dashboard/list-bills'), 1000)
          }

        }
      }
    } catch (err) {
      console.log('form error handle', err.message);

    }
  }
  return (
    <div className="login-container">
      <div className="content-container">
        <div className="form-container">
          <div className="title-container">
          {isResponseGet ? (
    <Row justify="center" align="middle">
      <Space direction="vertical">
        <Alert
          message={successMessage}
          type={alerType}
          showIcon
          closable
          className="custom-alert"
        />
      </Space>
    </Row>
  ) : (
    ""
  )}

            <h1 className="gradient-text">ParkEasy
              {/* <p className="subtext">By Nexus</p> */}
            </h1>
            {/* <h5  className="subtext">By Nexus</h5> */}
          </div>
          {/* <Card className="login-card" title="Parking Management System Login" bordered={false}> */}
          <Card
            className="login-card"
            title={<span style={{ fontSize: '24px' }}>Login</span>}
            bordered={false}
          >
            <Form
              name="basic"
              initialValues={{ remember: true }}
              autoComplete="off"
              layout="vertical"
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              style={{ maxWidth: 600 }}
            >
              <Form.Item
                label="Enter Your Employee Id."
                name="emp_id"
                rules={[
                  { required: true, message: 'Please input your Employee ID!' },
                  { pattern: /^[a-zA-Z0-9_-]+$/, message: 'ID can only contain letters, numbers, and underscores' },
                  { whitespace: true, message: 'ID cannot be empty spaces' },
                ]}
              >
                <Input name='emp_id' onChange={handleChange} />
              </Form.Item>

              {/* <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item> */}
              <Form.Item className="center-align">
                <Button type="primary" htmlType="submit" className="submit-button" onClick={ handleSubmit
}>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Userlogin
