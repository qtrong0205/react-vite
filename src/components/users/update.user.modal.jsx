import { Input, notification, Modal } from "antd";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {
    const [id, setId] = useState("")
    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props

    useEffect(() => {

        if (dataUpdate) {
            setId(dataUpdate._id)
            setFullName(dataUpdate.fullName)
            setPhone(dataUpdate.phone)
        }
    }, [dataUpdate])

    const handleSubmitClick = async () => {
        const response = await updateUserAPI(id, fullName, phone)
        if (response.data) {
            notification.success({
                message: "Updated user",
                description: "Cập nhật user thành công"
            })
            resetAndCloseModal()
            await loadUser()
        }
        else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(response.message)
            })
        }

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