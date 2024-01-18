import React, {useEffect, useState} from "react";
import './Statistics.css'

const Statistics = () => {
    const [bikeCount, setBikeCount] = useState(null);
    const [availableBikes, setAvailableBikes] = useState(null);
    const [bookedBikes, setBookedBikes] = useState(null);
    const [averageCost, setAverageCost] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/bikes');
                const bikes = await response.json();

                setBikeCount(bikes.length);

                const totalCost = bikeCount > 0 ? bikes.reduce((acc, bike) => acc + bike.price, 0) / bikeCount : 0;
                setAverageCost(Math.floor(totalCost * 100) / 100);

                const available = bikes.filter(item => item.status === 'available');
                setAvailableBikes(available.length);

                const busy = bikes.filter(item => item.status === 'busy');
                setBookedBikes(busy.length);

            } catch (error) {
                console.error('Error fetching bikes:', error);
            }
        };
        fetchData();
    });

    return (
        <div className='statistics'>
            <h1>Statistics</h1>
            <p>Total Bikes: <span>{bikeCount === null ? 'Loading...' : bikeCount}</span></p>
            <p>Available Bikes: <span>{availableBikes === null ? 'Loading...' : availableBikes}</span></p>
            <p>Booked Bikes: <span>{bookedBikes === null ? 'Loading...' : bookedBikes}</span></p>
            <p>Average bike cost: <span>{averageCost === null ? 'Loading...' : averageCost + ` USD/hr.`}</span></p>
        </div>
    );
};

export default Statistics;

