import React from 'react';
import { Box, Grid } from '@mui/material';
import BookCard from '../BookCard/BookCard';

const BookList = ({ books }) => {
    return (


        <Box
            display="grid"
            gridTemplateColumns="32% 32% 32%"
            gap={1}
            justifyContent="space-between"
        >
            {books.map((book) => (
                <Box key={book._id} height={"100%"}>
                    <BookCard book={book} />
                </Box>
            ))}
        </Box>


    );
}

export default BookList;
