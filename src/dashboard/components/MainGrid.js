import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import StatCard from './StatCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MainGrid() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
  .get('http://localhost:3000/api/v1/users/investors-records', )
  .then(function (response) {
    setData(response.data.data)
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {});
}, [])
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
