import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Link,
    Box,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { API } from '../../utils/config';
import moment from 'moment';

const statusOptions = [
    { value: '1', label: 'New', color: '#ff0000' },
    { value: '2', label: 'Reading', color: '#ffcc00' },
    { value: '3', label: 'Finished', color: '#00cc00' }
];

const BookCard = ({ book }) => {
    const [showActions, setShowActions] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editedBook, setEditedBook] = useState({ ...book });

    const onUpdate = async (data) => {
        try {
            const res = await API.patch(`/books/${data._id}`, data); // PATCH so‘rovi
            const message = await res.data
            console.log(message);

        } catch (error) {
            console.error("Kitobni yangilashda xatolik:", error);
        }
    }

    const onDelete = async (id) => {
        try {
            const res = await API.delete(`/books/${id}`); // PATCH so‘rovi
            const message = await res.data
            console.log(message);

        } catch (error) {
            console.error("Kitobni o'chirishda xatolik:", error);
        }
    }

    // Handle mouse events for showing/hiding action buttons
    const handleMouseEnter = () => setShowActions(true);
    const handleMouseLeave = () => setShowActions(false);

    // Delete dialog handlers
    const openDeleteDialog = (e) => {
        e.stopPropagation();
        setDeleteDialogOpen(true);
    };
    const closeDeleteDialog = () => setDeleteDialogOpen(false);
    const confirmDelete = () => {
        onDelete(book._id);
        closeDeleteDialog();
    };

    // Edit dialog handlers
    const openEditDialog = (e) => {
        e.stopPropagation();
        setEditedBook({ ...book });
        setEditDialogOpen(true);
    };
    const closeEditDialog = () => setEditDialogOpen(false);
    const handleEditChange = (field) => (e) => {
        setEditedBook({ ...editedBook, [field]: e.target.value });
    };


    const saveChanges = () => {
        onUpdate(editedBook);

        closeEditDialog();
    };

    // Find the current status object
    const currentStatus = statusOptions.find(status => status.value == book?.status) || statusOptions[0];

    return (
        <>
            <Card
                sx={{
                    width:"100%",
                    height:"100%",
                    position: 'relative',
                    borderRadius: 2,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                    }
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Action buttons - only visible on hover */}
                <Box
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        opacity: showActions ? 1 : 0,
                        transition: 'opacity 0.2s',
                        zIndex: 1
                    }}
                >
                    <IconButton
                        sx={{
                            bgcolor: '#ff5252',
                            color: 'white',
                            m: 1,
                            '&:hover': { bgcolor: '#ff1744' }
                        }}
                        onClick={openDeleteDialog}
                    >
                        <DeleteIcon />
                    </IconButton>
                    <IconButton
                        sx={{
                            bgcolor: '#7c4dff',
                            color: 'white',
                            m: 1,
                            '&:hover': { bgcolor: '#651fff' }
                        }}
                        onClick={openEditDialog}
                    >
                        <EditIcon />
                    </IconButton>
                </Box>

                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                        {book?.title}
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1" component="div" sx={{ mb: 1 }}>
                            Cover: <Link href={book?.cover} color="primary">{book?.cover}</Link>
                        </Typography>

                        <Typography variant="body1" component="div" sx={{ mb: 1 }}>
                            Pages: {book?.pages}
                        </Typography>

                        <Typography variant="body1" component="div" sx={{ mb: 1 }}>
                            Published: {moment(book?.published).format("YYYY")}
                        </Typography>

                        <Typography variant="body1" component="div" sx={{ mb: 3 }}>
                            Isbn: {book?.isbn}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <Typography variant="body1" component="div">
                            {book?.author ? book.author : "Unknown author"} / {moment(book?.published).format("YYYY")}
                        </Typography>

                        <Chip
                            label={currentStatus.label}
                            sx={{
                                bgcolor: currentStatus.color,
                                color: 'white',
                                fontWeight: 'bold',
                                borderRadius: '16px'
                            }}
                        />
                    </Box>
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete "{book?.title}"?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Book Dialog */}
            <Dialog open={editDialogOpen} onClose={closeEditDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Edit Book
                    <IconButton
                        aria-label="close"
                        onClick={closeEditDialog}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Title"
                            fullWidth
                            value={editedBook.title}
                            onChange={handleEditChange('title')}
                        />
                        <TextField
                            label="Cover URL"
                            fullWidth
                            value={editedBook.cover}
                            onChange={handleEditChange('coverUrl')}
                        />
                        <TextField
                            label="Pages"
                            type="number"
                            fullWidth
                            value={editedBook.pages}
                            onChange={handleEditChange('pages')}
                        />
                        <TextField
                            label="Published Year"
                            fullWidth
                            value={editedBook.published}
                            onChange={handleEditChange('publishedYear')}
                        />
                        <TextField
                            label="ISBN"
                            fullWidth
                            value={editedBook.isbn}
                            onChange={handleEditChange('isbn')}
                        />
                        <TextField
                            label="Author"
                            fullWidth
                            value={editedBook.author}
                            onChange={handleEditChange('author')}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={editedBook.status}
                                label="Status"
                                onChange={handleEditChange('status')}
                            >
                                {statusOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box
                                                sx={{
                                                    width: 16,
                                                    height: 16,
                                                    borderRadius: '50%',
                                                    bgcolor: option.color
                                                }}
                                            />
                                            {option.label}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeEditDialog}>Cancel</Button>
                    <Button onClick={saveChanges} variant="contained" color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};


export default BookCard
// Example usage
// export default function BookCardExample() {
//     const [book, setBook] = useState({
//         id: '1',
//         title: 'Raspberry Pi User Guide',
//         coverUrl: 'http://url.to.book.cover',
//         pages: 221,
//         publishedYear: 2012,
//         isbn: '9781118464465',
//         author: 'Eben Upton',
//         status: 'finished'
//     });

//     const handleDelete = (id) => {
//         console.log(`Deleting book with id: ${id}`);
//         // In a real app, you would remove the book from your data store
//     };

//     const handleUpdate = (updatedBook) => {
//         console.log('Updated book:', updatedBook);
//         setBook(updatedBook);
//     };

//     return (
//         <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
//             <BookCard
//                 book={book}
//                 onDelete={handleDelete}
//                 onUpdate={handleUpdate}
//             />
//         </Box>
//     );
// }