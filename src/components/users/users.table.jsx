import { Table } from 'antd';
import { fetchAllUserAPI } from '../../services/api.service';
import { use, useEffect, useState } from 'react';
const UserTable = () => {
    const [dataUsers, setDataUsers] = useState([])

    // empty array => run once
    useEffect(() => {
        console.log("run useEffect 111")
        loadUser()
    }, [])

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
    ];

    const loadUser = async () => {
        const response = await fetchAllUserAPI()
        setDataUsers(response.data)
    }


    console.log("run render 000")
    return (<Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />)
}

export default UserTable