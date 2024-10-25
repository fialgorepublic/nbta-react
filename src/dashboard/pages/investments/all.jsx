import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Box, Typography, Stack, Button} from '@mui/material';
import {  rows } from '../../internals/data/gridData';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
export default function AllInvestments() {
    const [investments, setInvestments] = useState([])
    const navigate = useNavigate()
    const handleEditClick = (id) => {

    }

    const handleDeleteClick = (id) => {
        axios.delete(`http://localhost:3000/api/v1/users/${id}/delete`)
        .then(function (response){
            const users = investments.filter((investment) => investment._id != id)
            setInvestments(users)
            toast.success("Investment Deleted Successfully");
        })
    }
    
    useEffect(() => {
        axios
      .get('http://localhost:3000/api/v1/investments/list', )
      .then(function (response) {
        setInvestments(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
    }, [])
    const columns = [
        { field: 'investor', headerName: 'Investor', flex: 1.5, minWidth: 100 },
        { field: 'amount', headerName: 'Amount', flex: 1.5, minWidth: 100 },
        { field: 'createdAt', headerName: 'Date', flex: 1.5, minWidth: 200 },
        // { field: 'balance', headerName: 'Balance', flex: 1.5, minWidth: 80 },
        // { field: 'kyc_status', headerName: 'KYC Status', flex: 1.5, minWidth: 80 },
        // {
        //     field: 'actions',   // Field for the action buttons
        //     headerName: 'Actions',
        //     width: 250,
        //     renderCell: (params) => (
        //       <>
        //         <Button
        //           variant="contained"
        //           color="primary"
        //           size="small"
        //           style={{ marginRight: 10 }}
        //           onClick={() => handleEditClick(params.id)}
        //         >
        //           Edit
        //         </Button>
        //         <Button
        //           variant="contained"
        //           color="secondary"
        //           size="small"
        //           onClick={() => handleDeleteClick(params.id)}
        //         >
        //           Delete
        //         </Button>
        //       </>
        //     ),
        //   },
      ];

      const rows = [
        {
          _id: 1,
          firstName: 'Homepage Overview',
          lastName: 'Online',
          email: 8345,
          balance: 212423,
          kycStatus: 18.5,
          
        },
      ];
  return (
    <Box sx={{ width: '90%', marginTop: '40px', maxWidth: { sm: '100%', md: '1700px' } }}>
        <Stack direction="row" spacing={2} justifyContent="space-between">
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        All Investments
      </Typography>

      <Link to={'/investments/new'}><Button variant="contained">New Investment</Button></Link>

        </Stack>
    <DataGrid
      autoHeight
      sx={{marginTop: '30px',}}
    //   checkboxSelection
      rows={investments}
      columns={columns}
      getRowId={(row) => row._id}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small',
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
              },
            },
          },
        },
      }}
    />
    </Box>
  );
}
