'use client';
import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFetch } from '@/hooks/useFetch';
import { useAccount } from '@/context/AccountContext';

const EventForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [type, setType] = useState('');
    
    const { data, loading, error, fetchData } = useFetch(
        "/sessions/",
        "POST"
    );
    const { accountId } = useAccount();
    const [formValid, setFormValid] = useState(false);
    // Initialize formErrors as an array of strings
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const validateForm = () => {
        const errors: string[] = []; // This ensures that errors is an array of strings
        if (!title) errors.push("Title is required.");
        if (!location) errors.push("Location is required.");
        // Add more checks for other fields if necessary
        setFormErrors(errors);
        return errors.length === 0;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const isFormValid = validateForm();
        console.log(accountId);
        // Check if the form is valid before fetching data
        if (isFormValid) {
            fetchData({
                title,
                description,
                location,
                startTime,
                endTime,
                type,
                creatorId: accountId
            });
        } else {
            // Handle invalid form submission attempt (e.g., show an error message)
            alert('Please fill in all the required fields.');
        }
    };
    const requiredField = <span className="text-red-500">*</span>;

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Input
                label={
                    <>
                        Title {requiredField}
                    </>
                }
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required // HTML5 validation to indicate required field
            />
            <Form.TextArea
                label={
                    <>
                        Description {requiredField}
                    </>
                }
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <Form.Input
                label={
                    <>
                        Location {requiredField}
                    </>
                }
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
            />
            <Form.Field required>
                <label>
                    Start Time 
                </label>
                <DatePicker
                    selected={startTime}
                    onChange={(date) => setStartTime(date)}
                    showTimeSelect
                    dateFormat="Pp"
                />
            </Form.Field>
            <Form.Field required>
                <label>
                    End Time 
                </label>
                <DatePicker
                    selected={endTime}
                    onChange={(date) => setEndTime(date)}
                    showTimeSelect
                    dateFormat="Pp"
                />
            </Form.Field>
            <Form.Input
                label={
                    <>
                        Type {requiredField}
                    </>
                }
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
            />
           {/* Error messages display */}
           {formErrors.map((error, index) => (
                <div key={index} className="text-red-500">{error}</div>
            ))}

            <Button type='submit'>Submit</Button>
        </Form>
    );
};

export default EventForm;