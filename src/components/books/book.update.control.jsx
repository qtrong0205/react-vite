import { Input, InputNumber, message, Modal, notification, Select } from "antd"
import { use, useEffect } from "react"
import { useState } from "react"
import { handleUpdateFile, updateBookAPI } from "../../services/api.service"

const UpdateBookControl = (props) => {
    const [Id, setID] = useState("")
    const [mainText, setMainText] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("")
    const [preview, setPreview] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const { dataUpdate, setDataUpdate, isBookUpdateOpen, setIsBookUpdateOpen, loadBooks } = props

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            setID(dataUpdate._id)
            setMainText(dataUpdate.mainText)
            setAuthor(dataUpdate.author)
            setPrice(dataUpdate.price)
            setQuantity(dataUpdate.quantity)
            setCategory(dataUpdate.category)
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
        }
    }, [dataUpdate])
    const resetAndCloseModal = () => {
        setIsBookUpdateOpen(false)
        setID("")
        setAuthor("")
        setMainText("")
        setPrice("")
        setQuantity("")
        setCategory("")
        setDataUpdate(null)
        setPreview(null)
        setSelectedFile(null)
    }

    const handleSubmitClick = async () => {
        if (!preview && !selectedFile) {
            notification.error({
                message: "Update book error",
                description: "Vui lòng thêm thumbnail"
            })
            return
        }
        let thumbnailPath = ""
        if (preview && selectedFile) {
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
        else {
            thumbnailPath = dataUpdate.thumbnail
        }
        const res = await updateBookAPI(thumbnailPath, Id, mainText, author, price, quantity, category)
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
        resetAndCloseModal()
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
            title="Update a user"
            open={isBookUpdateOpen}
            onOk={() => handleSubmitClick()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText="Save"
        >
            <div
                style={{ marginBottom: "15px" }}>
                <span>ID</span>
                <Input
                    value={Id}
                    disabled
                />
            </div>
            <div
                style={{ marginBottom: "15px" }}>
                <span>Tiêu đề</span>
                <Input
                    value={mainText}
                    onChange={(e) => setMainText(e.target.value)}
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
                    value={category}
                    onChange={(value) => setCategory(value)}
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
                <input type="file" id="BtnUpload" hidden
                    onChange={(e) => handleOnChangeFile(e)}
                    onClick={(e) => e.target.value = null}
                />
            </div>
            {preview && (
                <img src={preview} width={100} height={"100%"} />
            )}
        </Modal>
    )
}

export default UpdateBookControl