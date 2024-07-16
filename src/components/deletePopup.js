import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import axios from 'axios';
import { toast } from 'react-toastify';

const DeleteConfirmPopup = ({ open, handleClose, getBooksList , getBooks }) => {

       const handleDelete = async () => {
        try {
            await axios.delete(`https://localhost:7020/api/books/${getBooks?.id}`);
            toast.success('Book deleted successfully!');
            getBooksList();
        } catch (error) {
            toast.error('Error deleting book');
        }
        handleClose();
    };

    return (
        <Dialog open={open}>
            <DialogTitle sx={{textAlign:'center'}}>Are you sure you? </DialogTitle>
            <DialogContent>
            You will not be able to recover this Book.
            </DialogContent>

            <DialogActions sx={{marginRight: '10px'}}>
                <Button onClick={handleClose}
                 sx={{ 
                            backgroundColor: '#1f6922', 
                            color: '#fff',
                            display: 'flex',
                            marginBottom: '10px',
                            '&:hover': {
                                backgroundColor: '#1f8724',
                                boxShadow: 'none',
                              },
                            }}
                >Cancel</Button>
                <Button onClick={handleDelete}
                 sx={{ 
                            backgroundColor: '#1f6922', 
                            color: '#fff',
                            display: 'flex',
                            marginBottom: '10px',
                            '&:hover': {
                                backgroundColor: '#1f8724',
                                boxShadow: 'none',
                              },
                            }}
                >OK</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmPopup;
