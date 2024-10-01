import React from 'react'
import { Image, Skeleton, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Alert } from 'antd'
import { Col, Row } from 'antd';
import {
    UserOutlined,
    LogoutOutlined,
    DashboardOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import ConfirmModal from './modal/ConfirmModal';
// const { Header, Content, Footer } = Layout;
const APIBASEURL = process.env.REACT_APP_API_URL;

const ListBill = () => {

    const [data, setData] = useState([]);
    const [isUserDeleted, setIsUserDeleted] = useState(false);
    const [successMessage, setSuccessMessage] = useState('User deleted successfully');
    const [loader, setLoader] = useState(true);

    const handleDelete = async (e) => {
        console.log('delete', e.target.value);
        const payload = {
            "employee_id": localStorage.getItem('employee_Id'),
            "id": e.target.value
        }
        console.log('payload', payload);
        try {
            const response = await axios.post(`${APIBASEURL}/bills/delete`, payload);
            console.log('data api', response.data);
            setData(response.data.message);
            setLoader(false);
            setIsUserDeleted(response.data.status);
            window.location.reload();

        } catch (error) {
            setLoader(false)
            console.error('Error fetching data:', error);
        }
        // setIsUserDeleted(false);


        // try {
        //     const { data } = await axios.delete(`${APIBASEURL}/bills/get/${e.target.value}`);
        //     console.log(data);
        //     setIsUserDeleted(data.success);
        // } catch (err) {
        //     console.log('error', err.message);
        // }



    }

    function convertTimestampToReadableDate(timestamp) {
        // Convert timestamp to a Date object
        const date = new Date(Number (timestamp));
        // console.log(date)
        // return date.toGMTString()
        // // Check if the date is valid
        // if (isNaN(date.getTime())) {
        //     return "Invalid date";
        // }
    
        // Get the individual components of the date
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
    
        // Format the date as YYYY-MM-DD HH:mm:ss
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    
    // Example usage
    // const timestamp = 1727807400000; // Example timestamp
    // const readableDate = convertTimestampToReadableDate(timestamp);
    // console.log(readableDate); // Output should be a valid date
    




    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Receipt',
            dataIndex: 'receipt_url',
            key: 'receipt_url',
            render: (text) => ( <Image width={50} src={`${process.env.REACT_APP_IMAGE_BASE_URL}${text}`}
                fallback="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" /> ),

                // render: (text) => ( <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}${text}`} alt="profile" style={{ width: 100, height: 100, objectFit: 'cover' }} /> ),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => <span>{convertTimestampToReadableDate(text)}</span>,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },


        // {
        //     title: 'Tags',
        //     key: 'tags',
        //     dataIndex: 'tags',
        //     render: (_, { tags }) => (
        //         <>
        //             {tags.map((tag) => {
        //                 let color = tag.length > 5 ? 'geekblue' : 'green';
        //                 if (tag === 'loser') {
        //                     color = 'volcano';
        //                 }
        //                 return (
        //                     <Tag color={color} key={tag}>
        //                         {tag.toUpperCase()}
        //                     </Tag>
        //                 );
        //             })}
        //         </>
        //     ),

        // },

        {
            title: 'Action',
            key: 'id',
            dataIndex: 'id',
            render: (text) => {
                return (<Space size="middle">
                    {/* <a>Invite {record.name}</a> */}
                    {/* <a>Delete</a> */}
                    {/* <Button type="primary" value={text} onClick={handleDelete}>
                    Delete {text}
                    </Button> */}
                    <button value={text} onClick={handleDelete} className='danger'>Delete</button>
                    {/* <button value={text} onClick={handleDelete} className='danger'><DeleteOutlined /></button>   */}
                </Space>
                )
            }
            // render: (text) => <a>{text}</a>,

        }

    ];

    // const data = [
    //     {
    //         key: '1',
    //         name: 'John Brown',
    //         age: 32,
    //         address: 'New York No. 1 Lake Park',
    //         tags: ['nice', 'developer'],
    //     },
    //     {
    //         key: '2',
    //         name: 'Jim Green',
    //         age: 42,
    //         address: 'London No. 1 Lake Park',
    //         tags: ['loser'],
    //     },
    //     {
    //         key: '3',
    //         name: 'Joe Black',
    //         age: 32,
    //         address: 'Sydney No. 1 Lake Park',
    //         tags: ['cool', 'teacher'],
    //     },
    // ];

    useEffect(() => {
        const fetchData = async () => {
            const payload = {
                "employee_id": localStorage.getItem('employee_Id')
            }
            console.log('payload', payload);
            try {
                const response = await axios.post(`${APIBASEURL}/bills/get`, {
                });
                console.log('data api', response.data);
                setData(response.data.data);
                setLoader(false)
            } catch (error) {
                setLoader(false)
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        // const {data} = await axios.delete(`${APIBASEURL}/users/e3ed38677ea30690bc99`);
        return () => {
            // Cleanup logic (if necessary)
            console.log("Cleanup when component unmounts");
            setData([]);
        };


    }, [isUserDeleted])

    return (
        <>
            {/* <ConfirmModal /> */}
            {/* {isUserDeleted ?
                <Row justify={'center'} type="flex" align={'middle'}>
                    <Space direction="vertical">
                        <Alert
                            message={successMessage}
                            type="success"
                            showIcon
                            action={

                                <Button size="small" type="text">
                                    UNDO
                                </Button>
                            }
                            closable
                        />
                    </Space>



                </Row>
                : ''}




            {!loader ? <Table dataSource={data} columns={columns} key={data.id} />
                : <Skeleton active />} */}



            {/* <Sidebar /> */}
            {isUserDeleted ?
                <Row justify={'center'} type="flex" align={'middle'}>
                    <Space direction="vertical">
                        <Alert
                            message={successMessage}
                            type="success"
                            showIcon
                            action={

                                <Button size="small" type="text">
                                    UNDO
                                </Button>
                            }
                            closable
                        />
                    </Space>



                </Row>
                : ''}




            {!loader ? <Table dataSource={data} columns={columns} key={data._id} />
                : <Skeleton active />}



            {/*     isUserDeleted            
                 <div>
                    {
                         data.map((item) => {
                            <>
                             <div>
                                {item.username}
                            </div>
                            <div>
                            {item.email}
                            </div>

                            </>
                           
                        })  
                    }
                 </div> */}


        </>
    )
}

export default ListBill
