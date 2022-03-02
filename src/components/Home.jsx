import React, { useEffect, useState } from 'react'
import { Typography, Row, Col, Statistic } from 'antd'
import millify from 'millify'
import Cryptocurrencies from './Cryptocurrencies'
import News from './News'
import { Link } from 'react-router-dom'

const { Title } = Typography

const Home = () => {
  
  return (
    <>
        <Title level={2} className="heading">Global Crypto Stats</Title>
        <Row>
            <Col span={12}><Statistic title="Total Cryptocurrencies" value={13363} /></Col>
            <Col span={12}><Statistic title="Total Exchanges" value={183} /></Col>
            <Col span={12}><Statistic title="Total Market Cap" value={millify(2023644008852)} /></Col>
            <Col span={12}><Statistic title="Total 24h Volume" value={millify(101330554719)} /></Col>
            <Col span={12}><Statistic title="Total Markets" value={millify(26431)} /></Col>
        </Row>
        <div className='home-heading-container'>
            <Title level={2} className="home-title">Top 10 Cryptocurrencies in the world</Title>
            <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Title>
        </div>
        <Cryptocurrencies simplified />
        <div className='home-heading-container'>
            <Title level={2} className="home-title">Latest Crypto News</Title>
            <Title level={3} className="show-more"><Link to="/news">Show More</Link></Title>
        </div>
        <News simplified />
    </>
  )
}

export default Home