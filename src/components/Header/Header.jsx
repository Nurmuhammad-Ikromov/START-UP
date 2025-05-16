import React from 'react';
import { Box, Typography } from '@mui/material';
import BookModal from '../BookModal/BookModal';

const Header = ({ count, setIsbn, addBook }) => (
  <Box mt={4} mb={2} display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={2}>
    <Box>
      <Typography variant="h4" fontWeight="bold" color='white'>
        You’ve got <span style={{
          color: " #6200EE"
        }}>{count} book</span>
      </Typography>
      <Typography  variant="h6" color='white'>Your books today</Typography>
    </Box>

    <BookModal  />
  </Box>

);

export default Header;
