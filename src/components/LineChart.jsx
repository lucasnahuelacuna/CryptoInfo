import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, Title as T, Tooltip, Legend } from 'chart.js'
import { Col, Row, Typography } from 'antd'
import moment from 'moment'

const { Title } = Typography

const LineChart = ({ coinHistory, currentPrice, coinName, timePeriod }) => {
    const coinPrice = []
    const coinTimestamp = []
    
    for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
        coinPrice.push(coinHistory.data.history[i].price)
        if(timePeriod === '24h') {
            coinTimestamp.push(moment.unix(coinHistory?.data?.history[i].timestamp).format('LT'))
        } else {
            //timestamp is given in seconds. We must convert it to milliseconds
            coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp*1000).toLocaleDateString())
        }
    }

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd'
            }
        ]
    }

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, T, Tooltip, Legend)

    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">{coinName} Price Chart</Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">{coinHistory?.data?.change}%</Title>
                    <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    )
}

export default LineChart