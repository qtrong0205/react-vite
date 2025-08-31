import { Input } from "antd";
import { Button } from "antd";
import Password from "antd/es/input/Password";
import { use, useState } from "react";
import axios from "axios";

const UserForm = () => {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")

    const handleOnClick = () => {
        const URL_BACKEND = "http://localhost:8080/api/v1/user"
        const data = {
            fullName: fullName,
            password: password,
            email: email,
            phone: phone
        }
        axios.post(URL_BACKEND, data)
        console.log(fullName, password, email, phone)
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