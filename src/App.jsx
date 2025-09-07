import Header from './components/layout/header'
import Footer from './components/layout/footer'
import { Outlet } from 'react-router-dom'
import { getAccountAPI } from './services/api.service'
import { useContext, useEffect } from 'react'
import { AuthContext } from './components/context/auth.context'
import { Spin } from 'antd';

const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);
  useEffect(() => {
    fetchUserInfo()
  }, [])
  // const delay = (milSecond) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve()
  //     }, milSecond)
  //   })
  // }
  const fetchUserInfo = async () => {
    const res = await getAccountAPI()
    // await delay(3000)
    if (res.data) {
      setUser(res.data.user)
    }
    setIsAppLoading(false)
  }
  return (
    <>
      {isAppLoading
        ?
        <Spin style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }} />
        :
        <>

          <Header />
          <Outlet />
          <Footer />
        </>
      }
    </>
  )
}

export default App
