import { Table } from 'antd';

const UserTable = (props) => {
    const { dataUsers } = props

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
    console.log("run render 000")
    return (<Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />)
}

export default UserTable