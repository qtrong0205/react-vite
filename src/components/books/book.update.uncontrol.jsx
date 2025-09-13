import { Form, Input, InputNumber, Modal, notification, Select } from "antd"
import { useForm } from "antd/es/form/Form"
import { useEffect, useState } from "react"
import { handleUpdateFile, updateBookAPI } from "../../services/api.service"

const UpdateBookUnControl = (props) => {
    const [preview, setPreview] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)

    const { dataUpdate, setDataUpdate, isBookUpdateOpen, setIsBookUpdateOpen, loadBooks } = props
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            form.setFieldsValue(dataUpdate)
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
        }
    }, [dataUpdate])

    const updateBook = async ({ mainText, _id, author, price, quantity, category }, thumbnailPath) => {
        const res = await updateBookAPI(thumbnailPath, _id, mainText, author, price, quantity, category)
        if (res.data) {
            notification.success({
                message: "Update book",
                description: "Cập nhật book thành công"
            })
            await loadBooks()
        }
        else {
            notification.error({
                message: "Update book error",
                description: res.message
            })
        }
        setDataUpdate(null)
        setSelectedFile(null)
        setPreview(null)
        setIsBookUpdateOpen(false)
    }

    const handleSubmitBtn = async (value) => {
        if (!preview && !selectedFile) {
            return
        }

        let thumbnailPath = ""
        if (preview && !selectedFile) {
            thumbnailPath = dataUpdate.thumbnail
        }
        else {
            const resUpload = await handleUpdateFile(selectedFile, "book")
            if (resUpload.data) {
                thumbnailPath = resUpload.data.fileUploaded
            }
            else {
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpload.message)
                })
            }
        }

        updateBook(value, thumbnailPath)
    }

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
    return (
        <Modal
            title="Create Book"
            open={isBookUpdateOpen}
            onOk={() => form.submit()}
            onCancel={() => {
                setIsBookUpdateOpen(false)
                setSelectedFile(null)
                setPreview(null)
                setDataUpdate(null)
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
                    label="ID"
                    name="_id"
                >
                    <Input disabled />
                </Form.Item>
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

export default UpdateBookUnControl