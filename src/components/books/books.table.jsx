import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space, Table } from "antd";
import { useEffect, useState } from "react"
import { fetchAllBooksAPI } from "../../services/api.service";
import ViewBookDetail from "./view.book.detail";
import UpdateBookControl from "./book.update.control";
import UpdateBookUnControl from "./book.update.uncontrol";

const BooksTable = (props) => {
    const [bookDetail, setBookDetail] = useState(null)
    const [isBookUpdateOpen, setIsBookUpdateOpen] = useState(false)
    const [isBookDetailOpen, setIsBookDetailOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)


    const { dataBooks, current, pageSize, total, setCurrent, setPageSize, setTotal, loadBooks } = props
    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => {
                return (
                    <>{(index + 1) + (current - 1) * pageSize}</>
                )
            }
        },
        {
            title: 'ID',
            dataIndex: '_id',
            key: 'id',
            render: (_, record) => {
                return (
                    <a href="#"
                        onClick={() => {
                            setBookDetail(record)
                            setIsBookDetailOpen(true)
                        }}
                    >
                        {record._id}
                    </a>
                )
            }
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
            key: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => {
                return (
                    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.price)
                )
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditOutlined style={{ color: "orange" }}
                        onClick={() => {
                            setDataUpdate(record)
                            setIsBookUpdateOpen(true)
                        }}
                    />
                    <DeleteOutlined style={{ color: "red" }} />
                </Space>
            ),
        },
    ]

    const onChange = (pagination, filters, sorter, extra) => {
        // nếu thay đổi trang
        console.log(pagination)
        if (pagination && pagination.current) {
            if (+current !== +pagination.current) {
                setCurrent(+pagination.current) // sử dụng dấu cộng tự convert thành số nguyên
            }
        }
        // nếu thay đổi số phần tử mỗi trang
        if (pagination && pagination.pageSize) {
            if (+pageSize !== +pagination.pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }
    };
    return (
        <>
            <Table
                columns={columns}
                dataSource={dataBooks}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange}
            />

            <ViewBookDetail
                bookDetail={bookDetail}
                setBookDetail={setBookDetail}
                isBookDetailOpen={isBookDetailOpen}
                setIsBookDetailOpen={setIsBookDetailOpen}
            />

            {/* <UpdateBookControl
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                isBookUpdateOpen={isBookUpdateOpen}
                setIsBookUpdateOpen={setIsBookUpdateOpen}
                loadBooks={loadBooks}
            /> */}

            <UpdateBookUnControl
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                isBookUpdateOpen={isBookUpdateOpen}
                setIsBookUpdateOpen={setIsBookUpdateOpen}
                loadBooks={loadBooks}
            />
        </>
    )
}

export default BooksTable