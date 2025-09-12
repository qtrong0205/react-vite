import { Button } from "antd"
import BooksTable from "../components/books/books.table"
import { useEffect, useState } from "react"
import CreateBook from "../components/books/book.create"
import { fetchAllBooksAPI } from "../services/api.service"

const BookPage = () => {
    const [dataBooks, setDataBooks] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        loadBooks()
    }, [current, pageSize])

    const [isCreateBookOpen, setIsCreateBookOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("")

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
                <Button type="primary" onClick={() => setIsCreateBookOpen(true)}>Create Book</Button>
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

            <CreateBook
                isCreateBookOpen={isCreateBookOpen}
                setIsCreateBookOpen={setIsCreateBookOpen}
                setTitle={setTitle}
                setAuthor={setAuthor}
                setPrice={setPrice}
                setQuantity={setQuantity}
                setCategory={setCategory}
                title={title}
                author={author}
                price={price}
                quantity={quantity}
                category={category}
                loadBooks={loadBooks}
            />
        </>
    )
}

export default BookPage