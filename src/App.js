import React, {useEffect, useState} from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Form from './components/Form/Form';
import Card from './components/Card/Card';
import Statistics from "./components/Statistics/Statistics";
import "./App.css"

export default function App() {
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/bikes');
                const data = await response.json();
                setCardData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    });

  return (
      <div className="App">
        <Header></Header>
        <main>
          <div className='container container-one'>
            {cardData.map((card, index) => (
                <Card key={index} index={index} name={card.name} type={card.type} color={card.color} id={card.id} price={card.price} />
            ))}
          </div>
          <div className="vertical-divider"></div>
          <div className='container container-two'>
            <Form></Form>
            <div className="horizontal-divider"></div>
            <Statistics></Statistics>
          </div>
        </main>
        <Footer></Footer>
      </div>
  );
}