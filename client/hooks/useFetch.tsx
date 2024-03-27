'use client';
import axios, { AxiosRequestConfig, Method } from 'axios';
import { useState } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const axiosInstance = axios.create({ baseURL: BASE_URL });

/**
 * Custom hook for making API requests and managing the response state.
 * @template T The type of the response data.
 * @template P The type of the payload data for the request.
 * @param {string} url The URL to make the request to.
 * @param {Method} method The HTTP method to use for the request. Default is 'GET'.
 * @returns {Object} An object containing the response data, loading state, error message, and a function to fetch the data.
 */
export const useFetch = <T, P>(url: string, method: Method = 'GET', updateAccountId: any = null) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const fetchData = async (payload?: P) => {
        setLoading(true);
        try {
            const config: AxiosRequestConfig = {
                url,
                method,
                ...(payload && { data: payload })
            };
            const response = await axiosInstance(config);
            if (updateAccountId) {
                updateAccountId(response.data.student_id)
            }
            setData(response.data);
            setError(null);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchData };
};
