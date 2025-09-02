import UserForm from "../components/users/users.form"
import UserTable from "../components/users/users.table"
import { useEffect, useState } from 'react';
import { fetchAllUserAPI } from '../services/api.service';

const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([])

    // empty array => run once
    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = async () => {
        const response = await fetchAllUserAPI()
        setDataUsers(response.data)
    }

    return (<div>
        <UserForm loadUser={loadUser} />
        <UserTable
            dataUsers={dataUsers}
            loadUser={loadUser}
        />
    </div>)
}

export default UserPage