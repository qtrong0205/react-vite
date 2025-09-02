import UserForm from "../components/users/users.form"
import UserTable from "../components/users/users.table"
import { useEffect, useState } from 'react';
import { fetchAllUserAPI } from '../services/api.service';

const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)

    // empty array => run once
    useEffect(() => {
        loadUser()
    }, [current, pageSize]) // [] + condition

    const loadUser = async () => {
        console.log("check current load", current)
        const response = await fetchAllUserAPI(current, pageSize)
        if (response.data) {
            setDataUsers(response.data.result)
            setCurrent(response.data.meta.current)
            setPageSize(response.data.meta.pageSize)
            setTotal(response.data.meta.total)
        }

    }

    console.log("check current", current)
    return (
        <div style={{ padding: "0 25px" }}>
            <UserForm loadUser={loadUser} />
            <UserTable
                dataUsers={dataUsers}
                loadUser={loadUser}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
            />
        </div>)
}

export default UserPage