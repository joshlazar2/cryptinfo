import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Nav = () => {

    const navigate = useNavigate();

    const [crypto, setCrypto] = useState("")

    const changeHandler = (e) => {
        setCrypto(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        navigate(`/oneCrypto/${crypto}`)
    }

    return (
        <div className='flex flex-col space-y-4 md:flex-row md:justify-around md:space-y-0 p-4 bg-slate-200'>
            <Link to={'/'}><h1 className='text-blue-500 text-4xl font-bold'>Cryptinfo</h1></Link>
            <form onSubmit={submitHandler} className='space-x-4'>
                <input className='p-2 rounded-xl' type="text" onChange={changeHandler} placeholder='Search a Crypto ID'/>
                <button className='text-white bg-blue-500 rounded-xl p-2'>Search</button>
            </form>
        </div>
    );
}

export default Nav;