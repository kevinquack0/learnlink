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
    const { accountId } = useAccount();
    const { data, loading, error, fetchData } = useFetch(
        "/sessions/",
        "POST"
    );
    const handleSubmit = (e: any) => {
        e.preventDefault();
        fetchData(
            {
                title,
                description,
                location,
                startTime,
                endTime,
                type,
                creatorId: accountId
            }
        )
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Input
                label='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Form.TextArea
                label='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Form.Input
                label='Location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <Form.Field>
                <label>Start Time</label>
                <DatePicker
                    selected={startTime}
                    onChange={(date: any) => setStartTime(date)}
                    showTimeSelect
                    dateFormat="Pp"
                />
            </Form.Field>
            <Form.Field>
                <label>End Time</label>
                <DatePicker
                    selected={endTime}
                    onChange={(date: any) => setEndTime(date)}
                    showTimeSelect
                    dateFormat="Pp"
                />
            </Form.Field>
            <Form.Input
                label='Type'
                value={type}
                onChange={(e) => setType(e.target.value)}
            />
            <Button type='submit'>Submit</Button>
        </Form>
    );
};

export default EventForm;