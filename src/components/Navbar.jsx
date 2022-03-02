import { BulbOutlined, FundOutlined, HomeOutlined, MenuOutlined } from '@ant-design/icons/lib/icons'
import { Button, Menu, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import icon from '../images/cryptologo.PNG'

const { Title } = Typography
const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(false)
  const [screenSize, setScreenSize] = useState(null)

  useEffect(() => {
      const handleResize = () => setScreenSize(window.innerWidth)

      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
      const size = window.innerWidth;
      if(size < 768) {
          setActiveMenu(false)
      } else {
          setActiveMenu(true)
      }
  }, [screenSize])

  return (
    <div className="nav-container">
        <div className="logo-container">
            <Avatar src={icon} size="large" />
            <Title level={2} className="logo">
                <Link to="/">Crypto Info</Link>
            </Title>
            <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
                <MenuOutlined />
            </Button>
        </div>
        
        <Menu theme="dark" style={{ display: activeMenu ? 'block' : 'none' }}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<FundOutlined />}>
                <Link to="/cryptocurrencies">Criptocurrencies</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<BulbOutlined />}>
                <Link to="/news">News</Link>
            </Menu.Item>
        </Menu>
    </div>
  )

}

export default Navbar