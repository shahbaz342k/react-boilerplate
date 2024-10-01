import React from 'react'
import { Skeleton, Space, Table } from 'antd';
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
        setIsUserDeleted(false);


        return;
        // try {
        //     const { data } = await axios.delete(`${APIBASEURL}/bills/get/${e.target.value}`);
        //     console.log(data);
        //     setIsUserDeleted(data.success);
        // } catch (err) {
        //     console.log('error', err.message);
        // }


        
    }

    function convertTimestampToDate(timestamp) {
        // Convert the timestamp to a Date object (timestamp could be in seconds, so multiply by 1000 if needed)
        const date = new Date(timestamp * 1000); // Use * 1000 if the timestamp is in seconds, not milliseconds
        
        // Format the date to a human-readable string using toLocaleDateString
        return date.toLocaleDateString('en-GB', { // Change 'en-GB' to your desired locale
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric'
        });
      }
      
      // Example usage
      const timestamp = 1609459200; // Example timestamp in seconds (01 Jan 2021)
      console.log(convertTimestampToDate(timestamp)); // Output: "01/01/2021"
      

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },

        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => <span>{convertTimestampToDate(text)}</span>,
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
            const payload ={
                "employee_id":localStorage.getItem('employee_Id')
            }
            console.log('payload',payload);
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
            {/* <Sidebar /> */}
            <ConfirmModal />
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




            {!loader ? <Table dataSource={data} columns={columns} key={data.id} />
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
