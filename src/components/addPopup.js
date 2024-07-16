import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { toast } from "react-toastify";


const AddBookPopup = ({ open, handleClose, getBooksList }) => {
    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            title: '',
            author: '',
            publicationYear: ''
        }
    });

    const onSubmit = async (data) => {
        try {
            await axios.post('https://localhost:7020/api/books', data);
            toast.success('Book added successfully!');
            handleClose();
            getBooksList(); // getting all books 
            reset();
        } catch (error) {
            toast.error('Error submitting book');
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle
            sx={{
                textAlign:'center',
                fontWeight: 'bold',
                color: '#000',
                textDecoration: 'underline'
            }}
            >Add Book</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: 'Title is required' }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label="Title"
                                fullWidth
                                margin="dense"
                                error={!!error}
                                helperText={error ? error.message : null}
                            />
                        )}
                    />
                    <Controller
                        name="author"
                        control={control}
                        rules={{ required: 'Author is required' }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label="Author"
                                fullWidth
                                margin="dense"
                                error={!!error}
                                helperText={error ? error.message : null}
                            />
                        )}
                    />
                    <Controller
                        name="publicationYear"
                        control={control}
                        rules={{ 
                            required: 'Publication Year is required', 
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Publication Year must be a number'
                            } 
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label="Publication Year"
                                fullWidth
                                margin="dense"
                                error={!!error}
                                helperText={error ? error.message : null}
                            />
                        )}
                    />
                    <DialogActions>
                        <Button onClick={handleClose} 
                         sx={{ 
                            backgroundColor: '#1f6922', 
                            color: '#fff',
                            display: 'flex',
                            '&:hover': {
                                backgroundColor: '#1f8724',
                                boxShadow: 'none',
                              },
                            }}
                            >Cancel</Button>
                        <Button type="submit"
                         sx={{ 
                            backgroundColor: '#1f6922', 
                            color: '#fff',
                            display: 'flex',
                            '&:hover': {
                                backgroundColor: '#1f8724',
                                boxShadow: 'none',
                              },
                            }}
                        >Add</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddBookPopup;
