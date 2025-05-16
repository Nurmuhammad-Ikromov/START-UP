import React, { useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { API } from '../../utils/config';

export default function BookModal() {
    const [open, setOpen] = useState(false);
    const [isbn, setIsbn] = useState('');


    async function addBook() {

    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        console.log('Submitted ISBN:', isbn);
        if (!isbn) return
        const body = { isbn };
        console.log(body);

        const res = await API.post("books", body)
        const data = await res.data;
        alert(JSON.stringify(data));
        setOpen(false)
    };

    return (
        <Box>
            {/* Button to open the modal */}
            <Button variant="contained" color="primary" onClick={handleOpen}>
                + Create a book
            </Button>

            {/* Modal Dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        width: '400px',
                        borderRadius: '8px',
                        p: 1
                    }
                }}
            >
                {/* Modal Header */}
                <DialogTitle sx={{ p: 2, pb: 1 }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
                        Create a book
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 12,
                            top: 12,
                            color: 'grey.500',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                {/* Modal Content */}
                <DialogContent sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                        ISBN
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        placeholder=""
                        InputProps={{
                            sx: {
                                borderRadius: '4px',
                            }
                        }}
                    />
                </DialogContent>

                {/* Modal Footer */}
                <DialogActions sx={{ p: 2, pt: 1 }}>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        sx={{
                            flex: "1",
                            borderRadius: '4px',
                            color: 'blue',
                            borderColor: 'blue',
                            '&:hover': {
                                borderColor: 'purple',
                                backgroundColor: 'rgba(128, 0, 128, 0.04)'
                            },
                            textTransform: 'none',
                            px: 4
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{
                            flex: "1",
                            borderRadius: '4px',
                            backgroundColor: 'blue',
                            '&:hover': {
                                backgroundColor: ' #6200EE'
                            },
                            textTransform: 'none',
                            px: 4
                        }}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}