import React, { useState, useEffect } from 'react';
import { Button, Drawer, notification } from 'antd';
import { handleUpdateFile, updateUserAvatarAPI } from '../../services/api.service';

const ViewUserDetail = (props) => {
    // const [id, setId] = useState("")
    // const [fullName, setFullName] = useState("")
    // const [email, setEmail] = useState("")
    // const [phone, setPhone] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)


    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen, loadUser } = props

    // useEffect(() => {
    //     if (dataDetail) {
    //         setId(dataDetail._id)
    //         setFullName(dataDetail.fullName)
    //         setEmail(dataDetail.email)
    //         setPhone(dataDetail.phone)
    //     }
    // }, [dataDetail])

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

    const handleUpdateAvatar = async () => {
        console.log("check file", selectedFile)
        const responseUpload = await handleUpdateFile(selectedFile, "avatar")
        if (responseUpload.data) {
            const avatar = responseUpload.data.fileUploaded
            console.log("check new data", avatar)
            const resUpdateAvatar = await updateUserAvatarAPI(avatar,
                dataDetail._id, dataDetail.fullName, dataDetail.phone
            )
            if (resUpdateAvatar.data) {
                setIsDetailOpen(false)
                setSelectedFile(null)
                setPreview(null)
                await loadUser()
                notification.success(
                    {
                        message: "Success update file",
                        description: JSON.stringify("Cập nhật avatar thành công")
                    }
                )
            }
            else {
                notification.error(
                    {
                        message: "Error update file",
                        description: JSON.stringify(resUpdateAvatar.message)
                    }
                )
            }
        }
        else {
            notification.error(
                {
                    message: "Error update file",
                    description: JSON.stringify(responseUpload.message)
                }
            )
        }
    }
    return (
        <>
            <Drawer
                width={"40vw"}
                title="Chi tiết User"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => {
                    setDataDetail(null)
                    setIsDetailOpen(false)
                }}
                open={isDetailOpen}
            >
                {dataDetail
                    ?
                    <>
                        <p style={{ marginBottom: "10px" }}>ID: {dataDetail._id}</p>
                        <p style={{ marginBottom: "10px" }}>Full Name: {dataDetail.fullName}</p>
                        <p style={{ marginBottom: "10px" }}>Email: {dataDetail.email}</p>
                        <p style={{ marginBottom: "10px" }}>Phone Number: {dataDetail.phone}</p>
                        <p style={{ marginBottom: "10px" }}>Avatar:</p>
                        <div>
                            <img src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`}
                                style={{ height: "150px", marginBottom: '15px' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="BtnUpload"
                                style={{
                                    width: "100px",
                                    backgroundColor: "cyan",
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    cursor: "pointer"
                                }}
                            >
                                Upload avatar
                            </label>
                            <input type="file" id="BtnUpload" hidden
                                onChange={(event) => handleOnChangeFile(event)}
                            />
                        </div>
                        {preview &&
                            <>
                                <div>
                                    <img src={preview}
                                        style={{ height: "150px", margin: '35px 0 15px' }}
                                    />
                                </div>
                                <Button type='primary'
                                    onClick={() => handleUpdateAvatar()}>Save</Button>
                            </>
                        }

                    </>
                    :
                    <p>Không có dữ liệu</p>
                }
            </Drawer >
        </>
    );
}

export default ViewUserDetail