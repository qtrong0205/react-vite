import { Input } from "antd";
import { Button } from "antd";
import Password from "antd/es/input/Password";
import { use, useState } from "react";

const UserForm = () => {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const handleOnClick = () => {
        console.log(fullName, password, email, phoneNumber)
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
                        value={phoneNumber}
                        onChange={(event) => { setPhoneNumber(event.target.value) }} />
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