import { Button } from "antd"
import BooksTable from "../components/books/books.table"
import { fetchAllBooksAPI } from "../services/api.service"
import { useEffect, useState } from "react"

const BookPage = () => {
    const [dataBooks, setDataBooks] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        loadBooks()
    }, [current, pageSize])

    const loadBooks = async () => {
        const res = await fetchAllBooksAPI(current, pageSize)
        if (res.data) {
            setDataBooks(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Books</h3>
                <Button type="primary" >Create Book</Button>
            </div>
            <BooksTable
                dataBooks={dataBooks}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                setTotal={setTotal}
            />
        </>
    )
}

export default BookPage