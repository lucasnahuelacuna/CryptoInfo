import { Avatar, Card, Col, Row, Typography } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { NEWS6, NEWS12 } from '../constants'

const { Title, Text } = Typography

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const News = ({ simplified }) => {
  const dispatch = useDispatch();
  const { news6, news12 } = useSelector(state => state.news )
  const count = simplified ? 6 : 12;
  const cryptoNews = simplified ? news6 : news12; 

  useEffect(() => {
    if(cryptoNews.length === 0) {
        fetch(`https://bing-news-search1.p.rapidapi.com/news/search?q=Cryptocurrency&safeSearch=Off&setLang=english&cc=us&textFormat=Raw&freshness=Week&count=${count}`, {
            method: 'GET',
            headers:{
            'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_NEWS_API_KEY
            }
        }).then(res => res.json())
        .then(data => {
            dispatch({ 
                type: simplified ? NEWS6 : NEWS12, 
                payload: data.value })
        })
        .catch(error => console.error('Error:', error));
    }
  }, [])
  
  return (
    <Row gutter={[24, 24]}>
        {cryptoNews.map((news, i) => (
            <Col xs={24} sm={12} lg={8} key={i}>
                <Card hoverable className="news-card">
                    <a href={news.url} target="_blank" rel="noreferrer">
                        <div className="news-image-container">
                            <Title className='news-title' level={4}>{news.name}</Title>
                            <img
                                className='news-image'
                                src={news?.image?.thumbnail?.contentUrl || demoImage}
                                alt="news" 
                            />
                        </div>
                        <p>
                            {
                                news.description > 100
                                    ? `${news.description.subString(0,100)} ...`
                                    : news.description
                            }
                        </p>
                        <div className="provider-container">
                            <div>
                                <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                                <Text className="provider-name">{news.provider[0]?.name}</Text>
                            </div>
                            <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                        </div>
                    </a>
                </Card>
            </Col>
        ))}
    </Row>
  )
}

export default News