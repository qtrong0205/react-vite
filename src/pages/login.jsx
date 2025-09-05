import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Input, Form, notification, Row, Col, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../services/api.service';
import { useContext, useState } from 'react';
import { AuthContext } from '../components/context/auth.context';
const LoginPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const onFinish = async (values) => {
        setLoading(true)
        const res = await loginAPI(values.email, values.password)
        if (res.data) {
            message.success("Đăng nhập thành công");
            localStorage.setItem("access_token", res.data.access_token)
            setUser(res.data.user)
            navigate("/")
            console.log(res.data.user)
        }
        else {
            notification.error({
                message: "Error login",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false)
    }
    return (
        <Row justify="center" style={{ marginTop: "50px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset
                    style={{
                        padding: '15px',
                        margin: '5px',
                        border: '1px solid #ccc',
                        borderRadius: '5px'
                    }}>
                    <legend>Đăng nhập</legend>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}

                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Email không được để trống"
                                },
                                {
                                    type: "email",
                                    message: "Email không đúng định dạng",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{
                                required: true,
                                message: "Mật khẩu không được để trống"
                            }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Row
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                        >
                            <Col>
                                <Button
                                    loading={loading} type="primary" onClick={() => form.submit()}>
                                    Login
                                </Button>
                            </Col>
                            <Col>
                                <Link to={"/"}>
                                    Go to homepage
                                    <ArrowRightOutlined style={{ marginLeft: "5px" }} />
                                </Link>
                            </Col>
                        </Row>

                        <Row
                            style={{
                                height: "1px",
                                backgroundColor: "#ccc",
                                marginTop: "30px",
                            }}
                        />

                        <Row justify={"center"} style={{ marginTop: "30px" }}>
                            <Col>
                                Chưa có tài khoản? <Link to={"/Register"}>Đăng ký tại đây</Link>
                            </Col>
                        </Row>
                    </Form>
                </fieldset>

            </Col>
        </Row >
    )
}

export default LoginPage