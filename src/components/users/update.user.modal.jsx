import { Input, notification, Modal } from "antd";
import { useEffect, useState } from "react";
import { createUserAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {
    const [id, setId] = useState("")
    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate } = props

    useEffect(() => {
        console.log("check data update child", dataUpdate)
        if (dataUpdate) {
            setId(dataUpdate._id)
            setFullName(dataUpdate.fullName)
            setPhone(dataUpdate.phone)
        }
    }, [dataUpdate])

    const handleSubmitClick = async () => {
        const response = await createUserAPI(fullName, email, password, phone)
        if (response.data) {
            notification.success({
                message: "Create user",
                description: "Tạo user thành công"
            })
            resetAndCloseModal()
            // await loadUser()
        }
        else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(response.message)
            })
        }
        console.log("check res", response.data)
    }

    const resetAndCloseModal = () => {
        setId("")
        setFullName("")
        setPhone("")
        setDataUpdate(null)
        setIsModalUpdateOpen(false)
    }

    return (
        <Modal
            title="Update a user"
            open={isModalUpdateOpen}
            onOk={() => handleSubmitClick()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText="Save"
        >
            <div
                style={{ marginBottom: "15px" }}>
                <span>ID</span>
                <Input
                    value={id}
                    disabled />
            </div>
            <div
                style={{ marginBottom: "15px" }}>
                <span>Full Name</span>
                <Input
                    value={fullName}
                    onChange={(event) => { setFullName(event.target.value) }}
                />
            </div>
            <div
                style={{ marginBottom: "15px" }}>
                <span>Phone number</span>
                <Input
                    value={phone}
                    onChange={(event) => { setPhone(event.target.value) }} />
            </div>
        </Modal>
    )
}

export default UpdateUserModal