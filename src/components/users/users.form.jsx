import { Input } from "antd";
import { Button } from "antd";

const UserForm = () => {

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
                    <Input />
                </div>
                <div
                    style={{ marginBottom: "15px" }}>
                    <span>Email</span>
                    <Input />
                </div>
                <div
                    style={{ marginBottom: "15px" }}>
                    <span>Password</span>
                    <Input.Password />
                </div>
                <div
                    style={{ marginBottom: "15px" }}>
                    <span>Phone number</span>
                    <Input />
                </div>
                <div>
                    <Button type="primary">Create User</Button>
                </div>
            </div>
        </div>
    )
}

export default UserForm