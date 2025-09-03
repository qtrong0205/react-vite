import { Button, Input, Form } from 'antd';

const RegisterPage = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("check values", values)
    }
    return (
        <Form
            form={form}
            layout='vertical'
            onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        >


            <div style={{ padding: '30px 50px' }}>
                <Form.Item
                    label="Full Name"
                    name="fullName"
                // rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                // rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                // rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="phone"
                // rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <div>
                    <Button
                        type='primary'
                        onClick={() => form.submit()}
                    >Register</Button>
                </div>
            </div>
        </Form >
    )
}

export default RegisterPage