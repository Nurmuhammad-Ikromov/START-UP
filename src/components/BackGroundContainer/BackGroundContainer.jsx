import React from 'react';
import { Box } from '@mui/material';

const BackgroundContainer = ({ children }) => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                minHeight: '100vh',
                backgroundColor: '#2d2d2d',
                overflow: 'hidden',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100%',
                    height: '100%',
                    background: 'white',
                    clipPath: 'polygon(100% -50%, 30% 100%, 100% 100%)',
                    zIndex: 0,
                }
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default BackgroundContainer;