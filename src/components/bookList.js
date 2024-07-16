import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddBookPopup from './addPopup';
import EditBookPopup from './editPopup';
import DeleteConfirmPopup from './deletePopup';
import useStyles from './bookStore.styles';
import { toast } from 'react-toastify';

const BookList = () => {
    const classes = useStyles();

    const [data, setData] = useState({
        books: [],
        openAddPopup: false,
        openEditPopup: false,
        openDeletePopup: false,
        getBooks: null,
        loading: true,
        pageNumber:1,
        pageSize:10,
        totalCount: 0
    });

    
    const getBooksList = async () => {
        try {
            const response = await axios.get('https://localhost:7020/api/books/all', {
                params: {
                    pageNumber: data.pageNumber,
                    pageSize: data.pageSize
                }
            });
            console.log("response => ", response);
            if (response.status === 200) {
                setData(prevData => ({
                    ...prevData,
                    books: response.data.sortedBooks,
                    totalCount: response.data.totalCount,
                    loading: false
                }));
            }
        } catch (error) {
            toast.error("Error fetching books");
        }
    };
    
    // useEffect(() => {
    //     getBooksList();
    // }, []);

    useEffect(() => {
        getBooksList();
    }, [data.pageNumber, data.pageSize]); 
    
    const handleEdit = (data) => {
        setData(prevData => ({
            ...prevData,
            getBooks: data,
            openEditPopup: true
        }));
    };

    const handleDelete = (data) => {
        setData(prevData => ({
            ...prevData,
            getBooks: data,
            openDeletePopup: true
        }));
    };

    const distinct = [...new Set(data?.books?.map(item => item.title))];

    const columnDefs = [
        { field: 'title', 
          cellStyle: { textAlign: 'left' },
          filter: 'agSetColumnFilter', 
          filterParams: { 
            values: distinct
          }
        },
        { field: 'author', 
          cellStyle: { textAlign: 'left' },  
          filter: true
        },
        { field: 'publicationYear',
          filter: 'agNumberColumnFilter',
          cellStyle: { textAlign: 'left' } 
        },
        {
            field: 'Actions',
            cellStyle: { textAlign: 'left' },
            cellRenderer: (params) => (
                <div>
                    <IconButton sx={{ color: "blue" }} onClick={() => handleEdit(params.data)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.data)} sx={{ color: 'red' }}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            )
        }
    ];

    // const onPaginationChanged = (params) => {
    //     if (params.api.paginationGetCurrentPage() + 1 !== data.pageNumber) {
    //         setData(prevData => ({
    //             ...prevData,
    //             pageNumber: params.api.paginationGetCurrentPage() + 1
    //         }));
    //     }
    // };


    const onPaginationChanged = (params) => {
        const newPageNumber = params.api.paginationGetCurrentPage() + 1;
        if (newPageNumber !== data.pageNumber) {
            setData(prevData => ({
                ...prevData,
                pageNumber: newPageNumber
            }));
        }
    };

    const paginationNumberFormatter = (params) => {
        return `[ ${params.value}]`;
    };

    return (
        <div>
            {data.loading ? (
                <div>..loading</div>
            ) : (
                <div>
                    <div className={classes.button_container}>
                        <Button
                            onClick={() => setData(prevData => ({ ...prevData, openAddPopup: true }))}
                            sx={{
                                backgroundColor: '#1f6922',
                                color: '#fff',
                                display: 'flex',
                                marginBottom: '10px',
                                padding: '10px 10px',
                                '&:hover': {
                                    backgroundColor: '#1f8724',
                                    boxShadow: 'none',
                                },
                            }}
                        >
                            Add Book
                        </Button>
                    </div>
                    <div className="ag-theme-alpine" style={{ height: 500, width: 820, marginBottom: '30px' }}>
                        <AgGridReact
                            rowData={data.books}
                            columnDefs={columnDefs}
                            suppressRowClickSelection={true}
                            pagination={true}
                            paginationPageSize={data.pageSize} 
                            onPaginationChanged={onPaginationChanged}
                            paginationPageSizeSelector={false}
                            // paginationNumberFormatter={paginationNumberFormatter}
                            // onRowSelected={params => {
                            //     const currentPage = params?.api?.paginationGetCurrentPage() + 1;
                            //     setData(prevData => ({
                            //         ...prevData,
                            //         pageNumber: currentPage
                            //     }));
                            // }}
                            // gridOptions={gridOptions}
                        />
                    </div>
                </div>
            )}
            <AddBookPopup
                open={data.openAddPopup}
                handleClose={() => setData(prevData => ({ ...prevData, openAddPopup: false }))}
                getBooksList={getBooksList}
            />
            <EditBookPopup
                open={data.openEditPopup}
                handleClose={() => setData(prevData => ({ ...prevData, openEditPopup: false }))}
                getBooksList={getBooksList}
                getBooks={data.getBooks}
            />
            <DeleteConfirmPopup
                open={data.openDeletePopup}
                handleClose={() => setData(prevData => ({ ...prevData, openDeletePopup: false }))}
                getBooksList={getBooksList}
                getBooks={data.getBooks}
            />
        </div>
    );
};

export default BookList;
