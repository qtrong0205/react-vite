import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Popconfirm, notification } from "antd";
import { Table } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from "react";
import ViewUserDetail from './view.user.detail';
import { deleteUserAPI } from '../../services/api.service';

const UserTable = (props) => {
    const { dataUsers, loadUser } = props

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)

    const [dataDetail, setDataDetail] = useState(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const handleDeleteBtn = async (id) => {
        const res = await deleteUserAPI(id)
        if (res.data) {
            notification.success({
                message: "Create user",
                description: "Xoá user thành công"
            })
            await loadUser()
        }
        else {
            notification.error({
                message: "Error delete user",
                description: JSON.stringify(res.message)
            })
        }
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <>
                        <a href='#'
                            onClick={() => {
                                setIsDetailOpen(true)
                                setDataDetail(record)
                            }}
                        >{record._id}</a>
                    </>
                )
            }
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <div style={{ display: "flex", gap: "15px" }}>
                        <EditOutlined
                            style={{ cursor: "pointer", color: "orange" }}
                            onClick={() => {
                                setDataUpdate(record)
                                setIsModalUpdateOpen(true)
                            }} />

                        <Popconfirm
                            title="Delete the task"
                            description="Bạn có chắc chắn muốn xoá người dùng này?"
                            onConfirm={() => handleDeleteBtn(record._id)}
                            okText="Yes"
                            cancelText="No"
                            placement='left'
                        >
                            <DeleteOutlined
                                style={{ cursor: "pointer", color: "red" }}
                            />
                        </Popconfirm>

                    </div>
                </>
            ),
        },
    ];
    return (
        <>
            <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
            />
        </>
    )
}

export default UserTable