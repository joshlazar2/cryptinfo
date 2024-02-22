import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Main = () => {

    const apiKey = process.env.REACT_APP_API_KEY;

    const [topTen, setTopTen] = useState([])

    useEffect(() => {
        axios
            .get('https://api.coincap.io/v2/assets?limit=20')
            .then((res) => {
                setTopTen(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className='min-h-screen bg-slate-200 p-4'>
            <h2 className="p-8 font-bold text-blue-500 text-2xl">Top Market Caps</h2>
            <div className='flex items-center justify-center'>
                <div className='grid grid-cols-1 gap-14 md:grid-cols-4 md:gap-10'>
                    {
                        topTen.map((crypto) => (
                            <Link to={`/oneCrypto/${crypto.name}`}>
                                <div className='border rounded-xl bg-white shadow-xl p-6 md:p-14 space-y-4 text-left' key={crypto.name}>
                                    <h3 className='text-blue-500 font-bold'>{crypto.name}</h3>
                                    <div className='flex space-x-3'>
                                        <p className='text-blue-500 font-bold'>Rank:</p>
                                        <p className='text-blue-500'>{crypto.rank}</p>
                                    </div>
                                    <div className='flex space-x-3'>
                                        <p className='text-blue-500 font-bold'>Symbol:</p>
                                        <p className='text-blue-500'>{crypto.symbol}</p>
                                    </div>
                                    <div className='flex space-x-3'>
                                        <p className='text-blue-500 font-bold'>Price</p>
                                        <p className='text-blue-500'>${parseFloat(crypto.priceUsd) < 1 ? parseFloat(crypto.priceUsd).toLocaleString(undefined, { minimumFractionDigits: 10, maximumFractionDigits: 10 }).replace(/(\.0+|(?<=\..*?)0+)$/, '') : parseFloat(crypto.priceUsd).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Main;