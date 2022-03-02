import Layout from 'antd/lib/layout/layout';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route, Link } from 'react-router-dom'
import Cryptocurrencies from './components/Cryptocurrencies';
import Cryptodetails from './components/Cryptodetails';
import Home from './components/Home';
import News from './components/News';
import { Space, Typography } from 'antd';

const { Title } = Typography

function App() {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="crypto/:coinId" element={<Cryptodetails />} />
              <Route path="news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Title level={5} style={{ color: 'white', textAlign: 'center' }}>
            Crypto Info <br />
            All rights reserved
          </Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
