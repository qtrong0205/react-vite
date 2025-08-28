// () => {}
// tên của component phải viết hoa chữ cái đầu
// component = HTML + CSS + JS
// class trong react sẽ được khai báo là className
import './style.css'

const MyComponent = () => {
  const myName = "Trọng" //string
  // const myName = 25 //number
  const obj = {
    name: "Trọng",
    age: 18
  }
  const arr = [1, 2, 3]
  return (
    // jsx chỉ có một phần tử cha duy nhất
    // đây là cú pháp khai báo fragment, khi lên browser sẽ không có thẻ nào bọc ngoài 2 thẻ div
    <> 
      <div>Học component cùng {JSON.stringify(arr)} update</div>
      <div>{console.log("Trọng")}</div>
      <div className="child" style={{borderRadius : "10px"}}>child</div>
    </>
  );
}

// sử dụng export default khi file đó chỉ xuất ra một component
export default MyComponent