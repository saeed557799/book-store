import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

const EditBookPopup = ({ open, handleClose, getBooksList, getBooks }) => {
    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            title: '',
            author: '',
            publicationYear: ''
        }
    });

    useEffect(() => {
        if (getBooks?.id) {
            const getBookById = async (id) => {
                try {
                    const res = await axios.get(`https://localhost:7020/api/books/get/${id}`);
                    reset(res.data); 
                } catch (error) {
                    toast.error('Error fetching book data');
                }
            };

            getBookById(getBooks.id);
        }
    }, [getBooks, reset]);

    const onSubmit = async (data) => {
        try {
            await axios.put(`https://localhost:7020/api/books/${getBooks.id}`, data);
            toast.success('Book updated successfully!');
            handleClose();
            getBooksList();
            reset();
        } catch (error) {
            toast.error('Error updating book');
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
            >Edit Book</DialogTitle>
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
                        >Update</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditBookPopup;
