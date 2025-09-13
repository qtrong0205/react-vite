import { Form, Input, InputNumber, Modal, notification, Select } from "antd"
import { useState } from "react"
import { createBookAPI, handleUpdateFile } from "../../services/api.service"

const CreateBookUnControl = (props) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const { isCreateBookOpen, setIsCreateBookOpen, loadBooks } = props

    const [form] = Form.useForm();

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0]
        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmitBtn = async (value) => {
        if (!selectedFile) {
            notification.error({
                message: "Create Book error",
                description: "Ảnh thumbnail không được để trống"
            })
            return
        }
        const resUpload = await handleUpdateFile(selectedFile, "book")
        let thumbnailPath
        if (resUpload.data) {
            thumbnailPath = resUpload.data.fileUploaded
        }
        const { mainText, author, price, quantity, category } = value;
        const res = await createBookAPI(thumbnailPath, mainText, author, price, quantity, category)
        if (res.data) {
            notification.success({
                message: "Create book",
                description: "Tạo book mới thành công"
            })
            setIsCreateBookOpen(false)
            setSelectedFile(null)
            setPreview(null)
            form.resetFields()
            await loadBooks()
        } else {
            notification.error({
                message: "Create book",
                description: res.message
            })
        }
    }
    return (
        <Modal
            title="Create Book"
            open={isCreateBookOpen}
            onOk={() => form.submit()}
            onCancel={() => {
                setIsCreateBookOpen(false)
                setSelectedFile(null)
                setPreview(null)
            }}
            maskClosable={false}
            okText="Save"
        >
            <Form
                form={form}
                name="basic"
                layout="vertical"
                onFinish={handleSubmitBtn}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    label="Tiêu đề"
                    name="mainText"
                    rules={[{ required: true, message: 'Tiêu đề không được để trống!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Tác giả"
                    name="author"
                    rules={[{ required: true, message: 'Tác giả không được để trống!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Giá tiền"
                    name="price"
                    rules={[{ required: true, message: 'Giá tiền không được để trống!' }]}
                >
                    <InputNumber style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item
                    label="Số lượng"
                    name="quantity"
                    rules={[{ required: true, message: 'Số lượng không được để trống!' }]}
                >
                    <InputNumber style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item
                    label="Thể loại"
                    name="category"
                    rules={[{ required: true, message: 'Thể loại không được để trống!' }]}
                >
                    <Select
                        style={{ width: "100%" }}
                        // onChange={handleChange}
                        options={[
                            { value: 'Arts', label: 'Arts' },
                            { value: 'Business', label: 'Business' },
                            { value: 'Comics', label: 'Comics' },

                            { value: 'Cooking', label: 'Cooking' },
                            { value: 'Entertainment', label: 'Entertainment' },
                            { value: 'History', label: 'History' },

                            { value: 'Music', label: 'Music' },
                            { value: 'Sports', label: 'Sports' },
                            { value: 'Teen', label: 'Teen' },
                            { value: 'Travel', label: 'Travel' },
                        ]}
                    // value={category}
                    />
                </Form.Item>
                <div>
                    Thumbnail:
                </div>
                <div style={{ margin: "15px" }}>
                    <label htmlFor="BtnUpload"
                        style={{
                            width: "100px",
                            backgroundColor: "cyan",
                            padding: '5px 10px',
                            borderRadius: '5px',
                            cursor: "pointer",
                        }}
                    >
                        Upload
                    </label>
                    <input type="file" id="BtnUpload" style={{ display: "none" }}
                        onChange={(e) => handleOnChangeFile(e)}
                        onClick={(e) => e.target.value = null}
                    />
                </div>
                {preview && (
                    <img src={preview} width={100} height={"100%"} />
                )}
            </Form>
        </Modal>

    )
}

export default CreateBookUnControl