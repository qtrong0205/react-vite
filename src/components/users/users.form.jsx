import { Input, notification } from "antd";
import { Button } from "antd";
import Password from "antd/es/input/Password";
import { use, useState } from "react";
import { createUserAPI } from "../../services/api.service";


const UserForm = () => {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")

    const handleOnClick = async () => {
        const response = await createUserAPI(fullName, email, password, phone)
        if (response.data) {
            notification.success({
                message: "Create user",
                description: "Tạo user thành công"
            })
        }
        else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(response.message)
            })
        }
        console.log("check res", response.data)
    }

    return (
        <div className="user-form"
            style={{
                padding: "30px",
            }}
        >
            <div>
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
                <div>
                    <Button type="primary"
                        onClick={() => handleOnClick()}
                    >Create User</Button>
                </div>
            </div>
        </div>
    )
}

export default UserForm