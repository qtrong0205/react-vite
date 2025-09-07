import { Input, notification, Modal } from "antd";
import { Button } from "antd";
import Password from "antd/es/input/Password";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";


const UserForm = (props) => {
    const { loadUser } = props
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleSubmitClick = async () => {
        const response = await createUserAPI(fullName, email, password, phone)
        if (response.data) {
            notification.success({
                message: "Create user",
                description: "Tạo user thành công"
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
        setEmail("")
        setFullName("")
        setPassword("")
        setPhone("")
        setIsModalOpen(false)
    }

    return (
        <div className="user-form">
            <div
                style={{
                    padding: "30px 30px 10px",
                }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3>Table Users</h3>
                    <Button type="primary"
                        onClick={() => setIsModalOpen(true)}
                    >Create User</Button>
                </div>
            </div>
            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={() => handleSubmitClick()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText="Create"
            >
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
                    <span>Email</span>
                    <Input
                        value={email}
                        onChange={(event) => { setEmail(event.target.value) }} />
                </div>
                <div
                    style={{ marginBottom: "15px" }}>
                    <span>Password</span>
                    <Input.Password
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }} />
                </div>
                <div
                    style={{ marginBottom: "15px" }}>
                    <span>Phone number</span>
                    <Input
                        value={phone}
                        onChange={(event) => { setPhone(event.target.value) }} />
                </div>
            </Modal>

        </div>
    )
}

export default UserForm