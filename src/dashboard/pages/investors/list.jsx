import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Box, Typography, Stack, Button} from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AllInvestors() {
    const handleDeleteClick = (id) => {
        axios.delete(`http://localhost:3000/api/v1/users/${id}/delete`)
        .then(function (response){
            const users = investors.filter((investor) => investor._id != id)
            setInvestors(users)
            toast.success("Investor Deleted Successfully");
        })
    }
    const [investors, setInvestors] = useState([])
    useEffect(() => {
        axios
      .get('http://localhost:3000/api/v1/users/all-investors', )
      .then(function (response) {
        setInvestors(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
    }, [])
    const columns = [
        { field: 'first_name', headerName: 'First Name', flex: 1.5, minWidth: 100 },
        { field: 'last_name', headerName: 'Last Name', flex: 1.5, minWidth: 100 },
        { field: 'email', headerName: 'Email', flex: 1.5, minWidth: 250 },
        { field: 'balance', headerName: 'Balance', flex: 1.5, minWidth: 80 },
        { field: 'kyc_status', headerName: 'KYC Status', flex: 1.5, minWidth: 80 },
        {
            field: 'actions',   // Field for the action buttons
            headerName: 'Actions',
            width: 270,
            renderCell: (params) => (
              <>
              {/* <Link to={`${params.id}/edit-investor`} > */}
              <Link to={`${params.id}/edit`}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ marginRight: 10 }}
                  
                >
                  Edit
                </Button>
                </Link>
                <span style={{ pointerEvents: params.row.kyc_status === 'NotStarted' ? 'none' : '' }}>
                <Link to={`${params.id}/verify-kyc`}>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  style={{ marginRight: 10 }}
                  disabled={params.row.kyc_status === 'NotStarted' ? true : false}
                >
                  Verify KYC
                </Button>
                </Link>
                </span>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDeleteClick(params.id)}
                >
                  Delete
                </Button>
              </>
            ),
          },
      ];

  return (
    <Box sx={{ width: '90%', marginTop: '40px', maxWidth: { sm: '100%', md: '1700px' } }}>
        <Stack direction="row" spacing={2} justifyContent="space-between">
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        All Investors
      </Typography>

      <Link to={'/investors/new'}><Button variant="contained">New Investor</Button></Link>

        </Stack>
    <DataGrid
      autoHeight
      sx={{marginTop: '30px',}}
    //   checkboxSelection
      rows={investors}
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
