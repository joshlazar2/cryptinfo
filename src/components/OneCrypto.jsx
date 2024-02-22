import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const OneCrypto = () => {

    const { name } = useParams();

    const [crypto, setCrypto] = useState({})

    useEffect(() => {
        axios
            .get(`https://api.coincap.io/v2/assets/${name.toLowerCase()}`)
            .then((res) => {
                console.log(res.data.data)
                setCrypto(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [name])

    return (
        <div className='min-h-screen bg-slate-200'>
            <h2 className='text-blue-500 p-8 font-bold text-2xl'>{crypto.name}</h2>
            <div className='flex justify-center items-center'>
                <div className='bg-white rounded-2xl p-8 md:p-16 space-y-4 shadow-xl'>
                    <p className='text-blue-500'>Rank: {crypto.rank}</p>
                    <p className='text-blue-500'>Symbol: {crypto.symbol}</p>
                    <p className='text-blue-500'>Price: ${parseFloat(crypto.priceUsd) < 1 ? parseFloat(crypto.priceUsd).toLocaleString(undefined, { minimumFractionDigits: 10, maximumFractionDigits: 10 }).replace(/(\.0+|(?<=\..*?)0+)$/, '') : parseFloat(crypto.priceUsd).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    <p className='text-blue-500'>Market Cap: ${parseFloat(crypto.marketCapUsd).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    <p className='text-blue-500'>Supply: {parseFloat(crypto.supply).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    <p className='text-blue-500'>24 hr Volume: ${parseFloat(crypto.volumeUsd24Hr).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                </div>
            </div>
        </div>
    );
}

export default OneCrypto;
