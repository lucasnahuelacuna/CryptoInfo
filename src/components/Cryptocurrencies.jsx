import { Card, Col, Row, Typography } from 'antd'
import millify from 'millify'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CRYPTOS10, CRYPTOS100 } from '../constants'

const { Title } = Typography

const Cryptocurrencies = ({ simplified }) => {
  const dispatch = useDispatch()
  const { cryptos10, cryptos100 } = useSelector(state => state.coins)
  const count = simplified ? 10 : 100;
  const cryptos = simplified ? cryptos10 : cryptos100;

  useEffect(() => {
    if(cryptos.length === 0) {
        fetch(`https://coinranking1.p.rapidapi.com/coins?limit=${count}`, {
            method: 'GET',
            headers:{
                'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_CRYPTOS_API_KEY
            }
            })
            .then(res => res.json())
            .then(data => {
                dispatch({ 
                    type: simplified ? CRYPTOS10 : CRYPTOS100, 
                    payload: data?.data })
            })
            .catch(error => console.error('Error:', error));
    }
  }, [])

  return (
    <>
        { !simplified ? <Title level={2}>Top 100 Cryptocurrencies</Title> : null}
        <Row gutter={[32,32]} className="crypto-card-container">
            {cryptos.map(currency => (
                <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
                    <Link to={`/crypto/${currency.uuid}`}>
                        <Card
                            title={`${currency.rank}. ${currency.name}`}
                            extra={<img className='crypto-image' src={currency.iconUrl} />}
                            hoverable
                        >
                            <p>Price: {millify(currency.price)}</p>
                            <p>Market Cap: {millify(currency.marketCap)}</p>
                            <p>Daily Change: {millify(currency.change)}</p>
                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
    </>
  )
}

export default Cryptocurrencies