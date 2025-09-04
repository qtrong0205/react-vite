import { Button, Input, Form, notification, Row, Col } from 'antd';
import { registerUserAPI } from '../services/api.service';
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [form] = Form.useForm();
    let navigate = useNavigate();

    const onFinish = async (values) => {
        console.log("check values", values)
        const res = await registerUserAPI(values.fullName, values.email, values.password, values.phone)

        if (res.data) {
            notification.success({
                message: "User registered",
                description: "Register success"
            })
            navigate("/login")
        }
        else {
            notification.error({
                message: "User registered error",
                description: JSON.stringify(res.message)
            })
        }
    }
    return (
        <Form
            form={form}
            layout='vertical'
            onFinish={onFinish}
            style={{ margin: "50px" }}
        // onFinishFailed={onFinishFailed}
        >
            <Row
                justify={"center"}
                style={{ margin: "20px" }}
            ><h2>Đăng ký tài khoản</h2></Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your full name!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[{
                            // required: true,
                            pattern: new RegExp(/\d+/g),
                            message: "Wrong format!"
                        }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <div>
                        <Button
                            type='primary'
                            onClick={() => form.submit()}
                        >Register</Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={24} md={8}
                    style={{
                        height: '1px',
                        backgroundColor: '#ccc',
                        margin: '30px auto'
                    }}>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <div>
                        Đã có tài khoản? <Link to={'/login'}>Đăng nhập</Link>
                    </div>
                </Col>
            </Row>
        </Form >
    )
}

export default RegisterPage