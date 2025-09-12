import { Drawer } from "antd"

const ViewBookDetail = (props) => {
    const { bookDetail, setBookDetail, isBookDetailOpen, setIsBookDetailOpen } = props
    console.log(bookDetail)
    return (
        <Drawer
            title="Chi tiết book"
            closable={{ 'aria-label': 'Close Button' }}
            onClose={() => {
                setBookDetail(null)
                setIsBookDetailOpen(false)
            }}
            open={isBookDetailOpen}
            width={"40%"}
        >
            {bookDetail &&
                (
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div>ID: {bookDetail._id}</div>
                        <div>Tiêu đề: {bookDetail.mainText}</div>
                        <div>Tác giả: {bookDetail.author}</div>
                        <div>Thể loại: {bookDetail.category}</div>
                        <div>Giá tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(bookDetail.price)}</div>
                        <div>Số lượng: {bookDetail.quantity}</div>
                        <div>Đã bán: {bookDetail.sold}</div>

                        <div>Thumbnail:</div>
                        <div>
                            <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${bookDetail.thumbnail}`}
                                style={{ height: "150px", marginBottom: '15px' }}
                            />
                        </div>
                    </div>
                )
            }
        </Drawer>
    )
}

export default ViewBookDetail