import React, { useState, useEffect } from 'react';
import { Button, Drawer } from 'antd';

const ViewUserDetail = (props) => {
    // const [id, setId] = useState("")
    // const [fullName, setFullName] = useState("")
    // const [email, setEmail] = useState("")
    // const [phone, setPhone] = useState("")

    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props

    // useEffect(() => {
    //     if (dataDetail) {
    //         setId(dataDetail._id)
    //         setFullName(dataDetail.fullName)
    //         setEmail(dataDetail.email)
    //         setPhone(dataDetail.phone)
    //     }
    // }, [dataDetail])

    return (
        <>
            <Drawer
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
                    </>
                    :
                    <p>Không có dữ liệu</p>
                }
            </Drawer >
        </>
    );
}

export default ViewUserDetail