import React, {useState} from 'react';
import './Form.css';

const Form = () => {
    const [form, setForm] = useState({
        name: '',
        color: '',
        price: '',
        type: '',
        wheelSize: '',
        id: '',
        description: '',
    });

    // Event handler for user input changes
    const handleUserInput = (event) => {
        event.preventDefault();

        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value,
        });
    };

    // Event handler for form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    // Event handler for form reset
    const handleFormReset = () => {
        setForm({
            name: '',
            color: '',
            price: '',
            type: '',
            wheelSize: '',
            id: '',
            description: '',
        });
    };

    return(
        <form action="/save" method="post" onSubmit={handleFormSubmit} onReset={handleFormReset}>
            <div className='two-columns'>
                <div className='column'>
                    <input type="text" name="name" value={form.name} onChange={handleUserInput} placeholder="Name" required />
                    <input type="text" name="color" value={form.color} onChange={handleUserInput} placeholder="Color" required />
                    <input type="number" name="price" value={form.price} onChange={handleUserInput} placeholder="Price" required />
                </div>
                <div className='column'>
                    <input type="text" name="type" value={form.type} onChange={handleUserInput} placeholder="Type" required />
                    <input type="number" name="wheelSize" value={form.wheelSize} onChange={handleUserInput} placeholder="Wheel Size"/>
                    <input type="number" name="id" value={form.id} onChange={handleUserInput} placeholder="ID" required />
                </div>
            </div>
            <div className='description'>
                <textarea name="description" value={form.description} onChange={handleUserInput} placeholder="Description" rows="4"></textarea>
            </div>
            <div className='buttons'>
                <button type="submit">Save</button>
                <button type="reset">Clear</button>
            </div>
        </form>
    );
}

export default Form;