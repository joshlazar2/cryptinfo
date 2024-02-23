import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const OneCrypto = () => {

    const { id } = useParams();

    const [range, setRange] = useState({
        twentyFour: false,
        seven: false,
        fourteen: false,
        thirty: false,
        sixty: false,
        twoHundred: false,
        year: false
    })

    const [crypto, setCrypto] = useState({
        name: '',
        id: '',
        rank: 0,
        symbol: '',
        price: 0,
        marketCap: 0,
        supply: 0,
        volume: 0,
        image: '',
        description: ''
    })

    const [isError, setIsError] = useState(false)

    const errMessage = "Cryptocurrency Not Found"

    useEffect(() => {
        axios
            .get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
            .then((res) => {
                console.log(res.data)
                setIsError(false)
                setCrypto({
                    name: res.data.name,
                    id: res.data.id,
                    rank: res.data.market_cap_rank,
                    symbol: res.data.symbol,
                    price: res.data.market_data.current_price.usd,
                    marketCap: res.data.market_data.market_cap.usd,
                    supply: res.data.market_data.circulating_supply,
                    priceChange: res.data.market_data.price_change_24h_in_currency.usd,
                    priceChangePercentage24: res.data.market_data.price_change_percentage_24h,
                    priceChangePercentage7: res.data.market_data.price_change_percentage_7d,
                    priceChangePercentage14: res.data.market_data.price_change_percentage_14d,
                    priceChangePercentage30: res.data.market_data.price_change_percentage_30d,
                    priceChangePercentage60: res.data.market_data.price_change_percentage_60d,
                    priceChangePercentage200: res.data.market_data.price_change_percentage_200d,
                    priceChangePercentage1y: res.data.market_data.price_change_percentage_1y,
                    image: res.data.image.large,
                    description: res.data.description.en
                })
            })
            .catch((err) => {
                console.log(err)
                setCrypto({})
                setIsError(true)
            })
    }, [id])


    const clickHandler = (e) => {
        setRange({
            twentyFour: false,
            seven: false,
            fourteen: false,
            thirty: false,
            sixty: false,
            twoHundred: false,
            year: false,
            [e.target.name]: true
        })

    }

    return (
        <div className='p-4 min-h-screen'>
            <h2 className='text-blue-500 p-8 font-bold text-2xl'>{crypto.name}</h2>
            <div>
                {
                    isError ? <p className='text-red-500 font-bold text-2xl'>{errMessage}</p> :
                        <div className='bg-white rounded-2xl p-6 md:p-12 space-y-6 shadow-xl flex flex-col items-center justify-center'>
                            <img className='w-20' src={crypto.image} alt="" />
                            <div className='space-y-4 text-left'>
                                <div className='flex space-x-3'>
                                    <p className='text-blue-500 font-bold'>ID:</p>
                                    <p>{crypto.id}</p>
                                </div>
                                <div className='flex space-x-3'>
                                    <p className='text-blue-500 font-bold'>Rank:</p>
                                    <p>{crypto.rank}</p>
                                </div>
                                <div className='flex space-x-3'>
                                    <p className='text-blue-500 font-bold'>Symbol:</p>
                                    <p>{crypto.symbol}</p>
                                </div>
                                <div className='flex space-x-3'>
                                    <p className='text-blue-500 font-bold'>Price:</p>
                                    <p>${parseFloat(crypto.price) < 1 ? parseFloat(crypto.price).toLocaleString(undefined, { minimumFractionDigits: 10, maximumFractionDigits: 10 }).replace(/(\.0+|(?<=\..*?)0+)$/, '') : parseFloat(crypto.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                </div>
                                <div className='flex space-x-2'>
                                    <button onClick={clickHandler} name='twentyFour' className='bg-blue-500 text-white p-1 rounded-xl hover:bg-blue-700 text-sm w-10'>24hr</button>
                                    <button onClick={clickHandler} name='seven' className='bg-blue-500 text-white p-1 rounded-xl hover:bg-blue-700 text-sm w-10'>7d</button>
                                    <button onClick={clickHandler} name='fourteen' className='bg-blue-500 text-white p-1 rounded-xl hover:bg-blue-700 text-sm w-10'>14d</button>
                                    <button onClick={clickHandler} name='thirty' className='bg-blue-500 text-white p-1 rounded-xl hover:bg-blue-700 text-sm w-10'>30d</button>
                                    <button onClick={clickHandler} name='sixty' className='bg-blue-500 text-white p-1 rounded-xl hover:bg-blue-700 text-sm w-10'>60d</button>
                                    <button onClick={clickHandler} name='twoHundred' className='bg-blue-500 text-white p-1 rounded-xl hover:bg-blue-700 text-sm w-10'>200d</button>
                                    <button onClick={clickHandler} name='year' className='bg-blue-500 text-white p-1 rounded-xl hover:bg-blue-700 text-sm w-10'>1yr</button>
                                </div>
                                <div className='flex space-x-3'>
                                    <p className='text-blue-500 font-bold'>Percent Change:</p>
                                    <p>
                                        {range.twentyFour && `${crypto.priceChangePercentage24}%`}
                                        {range.seven && `${crypto.priceChangePercentage7}%`}
                                        {range.fourteen && `${crypto.priceChangePercentage14}%`}
                                        {range.thirty && `${crypto.priceChangePercentage30}%`}
                                        {range.sixty && `${crypto.priceChangePercentage60}%`}
                                        {range.twoHundred && `${crypto.priceChangePercentage200}%`}
                                        {range.year && `${crypto.priceChangePercentage1y}%`}
                                    </p>
                                </div>
                                <div className='flex space-x-3'>
                                    <p className='text-blue-500 font-bold'>24 hr Price Change:</p>
                                    <p>${parseFloat(crypto.priceChange).toFixed(2)}</p>
                                </div>
                                <div className='flex space-x-3'>
                                    <p className='text-blue-500 font-bold'>Market Cap:</p>
                                    <p>${parseFloat(crypto.marketCap).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                                </div>
                                <div className='flex space-x-3'>
                                    <p className='text-blue-500 font-bold'>Supply:</p>
                                    <p>{parseFloat(crypto.supply).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                                </div>
                            </div>
                            <div className='flex flex-col space-y-2 w-2/3'>
                                <p className='text-blue-500 font-bold'>Description:</p>
                                <div className='overflow-auto max-h-[200px] break-words'>
                                    <p className='text-xs md:text-sm text-left' dangerouslySetInnerHTML={{ __html: crypto.description }} />
                                </div>
                            </div>
                        </div>

                }
            </div>
        </div>
    );
}

export default OneCrypto;
