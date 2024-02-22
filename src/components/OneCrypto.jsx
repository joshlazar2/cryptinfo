import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const OneCrypto = () => {

    const { name } = useParams();

    const [crypto, setCrypto] = useState({})

    const [isError, setIsError] = useState(false)

    const errMessage = "Cryptocurrency Not Found"

    useEffect(() => {
        axios
            .get(`https://api.coincap.io/v2/assets/${name.toLowerCase()}`)
            .then((res) => {
                console.log(res.data.data)
                setIsError(false)
                setCrypto(res.data.data)
            })
            .catch((err) => {
                console.log(err)
                setCrypto({})
                setIsError(true)
            })
    }, [name])

    return (
        <div className='min-h-screen bg-slate-200'>
            <h2 className='text-blue-500 p-8 font-bold text-2xl'>{crypto.name}</h2>
            <div className='flex justify-center items-center'>
                {
                    isError ? <p className='text-red-500 font-bold text-2xl'>{errMessage}</p> :
                        <div className='bg-white rounded-2xl p-8 md:p-16 space-y-4 shadow-xl text-left'>
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
                            <div className='flex space-x-3'>
                                <p className='text-blue-500 font-bold'>Market Cap:</p>
                                <p className='text-blue-500'>${parseFloat(crypto.marketCapUsd).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                            </div>
                            <div className='flex space-x-3'>
                                <p className='text-blue-500 font-bold'>Supply:</p>
                                <p className='text-blue-500'>{parseFloat(crypto.supply).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                            </div>
                            <div className='flex space-x-3'>
                                <p className='text-blue-500 font-bold'>24 hr Volume: </p>
                                <p className='text-blue-500'>${parseFloat(crypto.volumeUsd24Hr).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
}

export default OneCrypto;
