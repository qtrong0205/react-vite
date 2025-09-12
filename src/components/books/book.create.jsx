import { Button, Input, InputNumber, Modal, notification, Select } from "antd"
import { useState } from "react"
import { createBookAPI, handleUpdateFile } from "../../services/api.service"
const CreateBook = (props) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const { isCreateBookOpen, setIsCreateBookOpen, setTitle, setAuthor, setPrice, setQuantity, setCategory,
        title, author, price, quantity, category, loadBooks
    } = props

    const handleSubmitClick = async () => {
        let thumbnailPath
        if (selectedFile) {
            const resUpload = await handleUpdateFile(selectedFile, "book")
            if (resUpload.data) {
                thumbnailPath = resUpload.data.fileUploaded
            }
        }

        const res = await createBookAPI(thumbnailPath, title, author, price, quantity, category)

        if (res.data) {
            notification.success({
                message: "Create book",
                description: "Tạo book mới thành công"
            })
            resetAndCloseModal()
            await loadBooks()
        } else {
            notification.error({
                message: "Create book",
                description: res.message
            })
        }
    }

    const resetAndCloseModal = () => {
        setTitle("")
        setAuthor("")
        setPrice("")
        setQuantity("")
        setCategory("")
        setSelectedFile(null)
        setPreview(null)
        setIsCreateBookOpen(false)
    }

    const handleChange = value => {
        setCategory(value)
    };

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
            title="Update a user"
            open={isCreateBookOpen}
            onOk={() => handleSubmitClick()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText="Save"
        >
            <div
                style={{ marginBottom: "15px" }}>
                <span>Tiêu đề</span>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div
                style={{ marginBottom: "15px" }}>
                <span>Tác giả</span>
                <Input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </div>
            <div
                style={{ marginBottom: "15px" }}>
                <span style={{ display: "block" }}>Giá tiền</span>
                <InputNumber style={{ width: '100%' }}
                    value={price}
                    onChange={(value) => {
                        setPrice(value)
                    }}
                />
            </div>
            <div
                style={{ marginBottom: "15px" }}>
                <span style={{ display: "block" }}>Số lượng</span>
                <InputNumber style={{ width: '100%' }}
                    value={quantity}
                    onChange={(value) => setQuantity(value)}
                />
            </div>
            <div
                style={{ marginBottom: "15px" }}>
                <span style={{ display: "block" }}>Thể loại</span>
                <Select
                    style={{ width: "100%" }}
                    onChange={handleChange}
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
                    value={category}
                />
            </div>
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
                <input type="file" id="BtnUpload" hidden onChange={(e) => handleOnChangeFile(e)} />
            </div>
            {preview && (
                <img src={preview} width={100} height={"100%"} />
            )}
        </Modal>
    )
}

export default CreateBook