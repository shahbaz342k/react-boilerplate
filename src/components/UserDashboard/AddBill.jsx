import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Alert, DatePicker } from 'antd'
import { Col, Row, Space, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import './addBill.css';
const APIBASEURL = process.env.REACT_APP_API_URL;

const AddBill = () => {


    const props = {
        // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        listType: 'picture',
        beforeUpload(file) {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const img = document.createElement('img');
                    img.src = reader.result;
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.naturalWidth;
                        canvas.height = img.naturalHeight;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);
                        ctx.fillStyle = 'red';
                        ctx.textBaseline = 'middle';
                        ctx.font = '33px Arial';
                        ctx.fillText('Ant Design', 20, 20);
                        canvas.toBlob((result) => resolve(result));
                    };
                };
            });
        },
    };

    const [form] = Form.useForm();        // Access form instance
    const [isFormValid, setIsFormValid] = useState(null);
    const [uploadDate, setUploadDate] = useState('');
    const [formPayload, setFormPayload] = useState({ amount: '', billDate: '', uploadRecipient: '' });
    const [successMessage, setSuccessMessage] = useState('Added sucessfully');
    const [isResponseGet, setIsResponseGet] = useState(false);
    const [alerType, setAlerType] = useState('success')
    const navigate = useNavigate();


    const disabledDate = (current) => {
        // Disable dates before today and allow only today and future dates
        return current && current < moment().startOf('day');
    };


    

    const onFinish = (values) => {
        console.log('Form submitted:', values);
        console.log('amint ', values.amount);
        console.log('file ', values.fileUrl.file.thumbUrl);
        // console.log('dsf ', values.fileUrl.file.thumbUrl);
        setFormPayload((prev)=> {
            return {
                ...prev, amount: values.amount
            }
        });
        setFormPayload((prev)=> {
            return {
                ...prev, billDate: uploadDate
            }
        });
        setFormPayload((prev)=> {
            return {
                ...prev, uploadRecipient: values.fileUrl.file.thumbUrl
            }
        });


        setIsFormValid(true);    
                   // Set form as valid after successful submission
        handleSubmit();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Validation Failed:', errorInfo);
        setIsFormValid(false);              // Set form as invalid if validation fails
    };

    const onChange = (date, dateString) => {
        console.log(date, dateString);
        setUploadDate(date.valueOf());
      };


    const handleChange = (e) => {


        const { name, value } = e.target; // Get name and value from the input

        // Update state based on input
        setFormPayload((prevNames) => ({
            ...prevNames,  // Retain previous state
            [name]: value, // Update the property dynamically
        }));


    }



    const handleSubmit = async () => {
        console.log('handleSubmit', APIBASEURL);
        setIsResponseGet(false);
        let form = document.getElementById('basic');
        console.log('payload ', formPayload);
        // return;
        try {
            if (formPayload.amount && formPayload.billDate && formPayload.uploadRecipient) {
                let payload = {
                    amount: formPayload.amount,
                    date: formPayload.billDate,
                    receipt_url: formPayload.uploadRecipient,
                    employee_id: 'sanjev123',

                }

                const { data } = await axios.post(`${APIBASEURL}/bills/save`, payload);
                console.log('insert data api', data);
                if (data.status == true) {
                    setAlerType('success');
                    setIsResponseGet(true);
                    setSuccessMessage("Date saved successfully");
                    // console.log('Expense added  successfully', data);
                    form.reset();
                    setTimeout(() => navigate('/dashboard/list-bills'),1000)

                }
            }
        } catch (err) {
            console.log('form error handle', err);
            // console.log('form error handle', err.response.data.result);
            setIsResponseGet(true);
            setAlerType('error');
            // setSuccessMessage(err.response.data.result);

        }
        // const {data} = await axios.get(`${APIBASEURL}/users`);
        // console.log('data api', data);
    }



    return (
        <>
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

  <Row justify="center" align="middle" style={{ minHeight: "100vh", backgroundImage: 'url("https://img.freepik.com/free-photo/abstract-blue-geometric-shapes-background_24972-1841.jpg?w=1380&t=st=1727788655~exp=1727789255~hmac=946629e7c1f1c1891f7462efbd72cd14d9475917031eaa2d02fb030dceb879c8")', }}>
    <Col>
      <div className="form-container1">
        <h2 className="form-title">Submit Your Parking Bill</h2>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
          onFinish={onFinish}              // Called on successful validation
          onFinishFailed={onFinishFailed}  // Called on validation failure
          className="custom-form"
        >
          <Form.Item
            label="Add Amount"
            name="amount"
            rules={[{ required: true, message: "Please input your amount!" }]}
            className="custom-label"
          >
            <Input name="amount" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Bill Date"
            name="bill_date"
            rules={[{ required: true, message: "Please input your bill date!" }]}
            className="custom-label"
          >
            <DatePicker onChange={onChange} disabledDate={disabledDate} className="custom-datepicker" />
          </Form.Item>

          <Form.Item
            label="Upload Receipt"
            name="fileUrl"
            rules={[{ required: true, message: "Please upload your receipt!" }]}
            className="custom-label"
          >
            <Upload {...props}>
              <Button icon={<UploadOutlined />} className="custom-upload-btn">Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="custom-submit-btn">
              Add
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Col>
  </Row>
</>

    )
}
export default AddBill;