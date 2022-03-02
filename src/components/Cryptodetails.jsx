import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons'
import HTMLReactParser from 'html-react-parser'
import LineChart from './LineChart'

const { Title, Text } = Typography
const { Option } = Select

const Cryptodetails = () => {
  const { coinId } = useParams()
  const [timePeriod, setTimePeriod] = useState('7d')
  const [cryptoDetails, setCryptoDetails] = useState(null)
  const [coinHistory, setCoinHistory] = useState(null)

  const time = ['24h', '7d', '30d', '1y', '5y'];


  useEffect(async () => {
    const config = {
      method: 'GET',
      headers:{
          'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_CRYPTOS_API_KEY
      }
    }

    try {
      const details = await fetch(`https://coinranking1.p.rapidapi.com/coin/${coinId}`, config)
      const data1 = await details.json()
      setCryptoDetails(data1.data.coin)
      const history = await fetch(`https://coinranking1.p.rapidapi.com/coin/${coinId}/history?timePeriod=${timePeriod}`, config)
      const data2 = await history.json()
      setCoinHistory(data2)

    } catch (error) {
      console.log(error)
    }
  }, [timePeriod])

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails && cryptoDetails["24hVolume"] && millify(Number(cryptoDetails["24hVolume"]))}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(Number(cryptoDetails?.allTimeHigh?.price))}`, icon: <TrophyOutlined /> },
  ]

  const genericStats = [
      { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
      { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
      { title: 'Approved Supply', value: cryptoDetails?.supply.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
      { title: 'Total Supply', value: `$ ${cryptoDetails?.supply.total && millify(Number(cryptoDetails?.supply.total))}`, icon: <ExclamationCircleOutlined /> },
      { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply.circulating && millify(Number(cryptoDetails?.supply.circulating))}`, icon: <ExclamationCircleOutlined /> },
  ]

  return (
    <Col className='coin-detail-container'>
      <Col className="coin-heading-container">
        <Title level={2} className='coin-name'>
          {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
        </Title>
        <p>
            {cryptoDetails?.name} live price is US dollars.
            View value statatistics, market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={value => setTimePeriod(value)}
      >
        {time.map(date => <Option key={date}>{date}</Option>)}
      </Select>
      {<LineChart coinHistory={coinHistory} currentPrice={ cryptoDetails?.price && millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} timePeriod={timePeriod} />}
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                  {cryptoDetails?.name} Value Statistics
              </Title>
              <p>
                  An overview showing the stats of {cryptoDetails?.name}
              </p>
          </Col>
          {stats.map(({ icon, title, value}, i) => (
              <Col className="coin-stats" key={i}>
                  <Col className="coin-stats-name">
                      <Text>{icon}</Text>
                      <Text>{title}</Text>
                  </Col>
                  <Text className="stats">{value}</Text>
              </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                  Other Statistics
              </Title>
              <p>
                  An overview showing the stats of all cryptocurrencies
              </p>
          </Col>
          {genericStats.map(({ icon, title, value}, i) => (
              <Col className="coin-stats" key={i}>
                  <Col className="coin-stats-name">
                      <Text>{icon}</Text>
                      <Text>{title}</Text>
                  </Col>
                  <Text className="stats">{value}</Text>
              </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
              What is {cryptoDetails?.name}
              
          </Title>
          {cryptoDetails?.description && HTMLReactParser(cryptoDetails?.description)}
        </Row>
        <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
                {cryptoDetails?.name} Links
            </Title>
            {cryptoDetails?.links.map((link, i) => (
                <Row className="coin-link" key={link.name + i}>
                    <Title level={5} className="link-name">{link.type}</Title>
                    <a href={link.url} target="_blank" rel="noreferrer">
                        {link.name}
                    </a>
                </Row>
            ))}
        </Col>
      </Col>
    </Col>
  )
}

export default Cryptodetails