import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, message } from 'antd'
import {
    HomeOutlined, UsergroupAddOutlined, AuditOutlined, SettingOutlined
    , LoginOutlined, AliwangwangOutlined
} from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { LogoutAPI } from '../../services/api.service';
const Header = () => {
    const [current, setCurrent] = useState('');

    const { user, setUser } = useContext(AuthContext);

    let navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        console.log("check location", location)
        if (location && location.pathname) {
            const allRoutes = ["users", "books"]
            const currentRoute = allRoutes.find(item => `/${item}` === location.pathname)
            if (currentRoute) {
                setCurrent(currentRoute)
            }
            else {
                setCurrent("home")
            }
        }
    }, [location])

    const onClick = e => {
        setCurrent(e.key);
    };

    // const a = !user.id ? {
    //     label: <Link to={"/login"}>Đăng nhập</Link>,
    //     key: 'login',
    //     icon: <LoginOutlined />,
    // } : {}

    const handleLogout = async () => {
        const res = await LogoutAPI()
        if (res.data) {
            localStorage.removeItem("access_token")
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            })
            message.success("Đăng xuất thành công.")
            navigate("/")
        }
    }

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: 'users',
            icon: <UsergroupAddOutlined />,
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: 'books',
            icon: <AuditOutlined />,
        },

        ...(!user.id ?
            [{
                label: <Link to={"/login"}>Đăng nhập</Link>,
                key: 'login',
                icon: <LoginOutlined />,
            }] : []),

        ...(user.id ?
            [{
                label: `Welcome ${user.fullName} `,
                key: 'setting',
                icon: <AliwangwangOutlined />,
                children: [
                    {
                        label: <span
                            onClick={() => handleLogout()}
                        >Đăng xuất</span>,
                        key: 'logout',
                    },
                ],
            }] : [])
    ];
    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal" items={items} />
    )
}

export default Header