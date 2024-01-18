import React, {useEffect, useState} from 'react';
import './Card.css';

function Card({ index, name, type, color, price, id }) {
    const topValue = `${5 + index * 5}px`;

    const cardStyle = {
        top: topValue,
    };

    const initialStatus = localStorage.getItem(`cardStatus_${id}`) || 'available';
    const [status, setStatus] = useState(initialStatus);

    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        setStatus(newStatus);

        const cardElement = event.target.closest('.card');
        const id = cardElement.querySelector('.id').textContent;

        try {
            await fetch(`http://localhost:3001/bikes/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus })
            });
        } catch (error) {
            console.error('Error updating bike status:', error);
        }

        localStorage.setItem(`cardStatus_${id}`, newStatus);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            localStorage.removeItem(`cardStatus_${id}`);
        }, 10 * 60 * 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [id]);

    return (
        <div className={`card ${status}`} style={cardStyle}>
            <div>
                <span>{name}</span>
                <span>- {type} ({color})</span>
                <span>ID: <span className='id'>{id}</span></span>
                <label>
                    <span className='status'>Status: </span>
                    <select value={status} onChange={handleStatusChange}>
                        <option value='available'>Available</option>
                        <option value='busy'>Busy</option>
                        <option value='unavailable'>Unavailable</option>
                    </select>
                </label>
                <span className='price'>{price} USD/hr.</span>
            </div>
        </div>
    );
}

export default Card;