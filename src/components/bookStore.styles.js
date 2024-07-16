import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  button_container: {
    display:'flex',
    justifyContent: 'flex-end'
    },
  dialogTitle: {
    textAlign: 'center',
    fontWeight: 'bolder !important',
    color: '#000',
    textDecoration: 'underline'
  },
  cancelButton: {
    backgroundColor: '#1f6922',
    color: '#fff',
    marginBottom: '10px',
    '&:hover': {
      backgroundColor: '#1f8724',
      boxShadow: 'none'
    }
  },
  submitButton: {
    backgroundColor: '#1f6922',
    color: '#fff',
    marginBottom: '10px',
    '&:hover': {
      backgroundColor: '#1f8724',
      boxShadow: 'none'
    }
  }
}));

export default useStyles;
