import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';

import axios from 'axios';
import Header from '../../components/Header/Header';
import BookList from '../../components/BookList/BookList';
import { API, API_URL } from '../../utils/config';
import { MD5 } from 'crypto-js';
import BookModal from '../../components/BookModal/BookModal';
import HeaderTop from '../../components/HeaderTop/HeaderTop';
import BackgroundContainer from '../../components/BackGroundContainer/BackGroundContainer';
import { useSelector } from 'react-redux';

function Home() {
    const [books, setBooks] = useState([]);
    const [isbn, setIsbn] = useState("")

    const matchedBooks = useSelector((state) => state.search.matchedBookTitle)
    console.log(matchedBooks);

    useEffect(() => {
        setBooks(matchedBooks)
    }, [matchedBooks])

    async function getBooks() {

        const res = await API.get("/books")
        const data = await res.data;

        console.log(data.data);

        setBooks(data.data)

    }

    useEffect(() => {

        getBooks()
    }, [])
    return (

        <div className="container">
            <HeaderTop />
            <Header />


            <BookList books={books} />
        </div>

    );
}

export default Home;