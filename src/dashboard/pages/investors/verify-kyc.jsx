import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
// import {  SitemarkIcon } from './CustomIcons';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import AppTheme from '../../../shared-theme/AppTheme';
import * as yup from 'yup';
import ColorModeSelect from '../../../shared-theme/ColorModeSelect';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
const validationSchema = yup.object({
    first_name: yup
    .string('Enter First Name')
    .required('First Name is required'),
    last_name: yup
    .string('Enter Last Name')
    .required('Last Name is required'),
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    // password: yup
    //   .string('Enter your password')
    //   .min(8, 'Password should be of minimum 8 characters length')
    //   .required('Password is required'),
  });

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));


const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function VerifyKyc(props) {
  let image_urls = []
    const [user, setUser] = useState(null)
    const {id} = useParams()
    useEffect(() => {
        axios
      .get(`http://localhost:3000/api/v1/users/${id}`, )
      .then(function (response) {
        console.log('data-------------', response.data.data)
        setUser(response.data.data)
        
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
    }, [])

    
    const handleInputChange = (event, formik) => {
        const { checked } = event.target;
        if (checked) {
          formik.setFieldValue("kyc_status", 'Verified');
        }
        else {
            formik.setFieldValue("kyc_status", '');
        }
    }

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      kyc_status: ''

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      
      updateInvestor(values)
    },
  });

  useEffect(() => {
    if (user) {
      formik.setValues({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        password: '', // you might want to handle password separately
        kyc_status: user.kyc_status
      });
    }
  }, [user]);

  const updateInvestor = (values) => {
    console.log('==============data', `http://localhost:3000/api/v1/users/${id}/update`)
    axios
     .put(
         `http://localhost:3000/api/v1/users/${id}/update`,
         values,
         { headers: { 'Content-Type': 'application/json' }}
      )
     .then(response => {
      navigate("/investors");
      toast.success("Investor updated Successfully");
    })
     .catch(error => {
        console.log('=====================', error)
      toast.error(error.response.message)
    });
  }
  if (user?.kyc_docs) {
    user?.kyc_docs?.map((doc) => {
      image_urls.push(`http://localhost:3000/${doc.url}`)
    })
  }
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      
      <SignInContainer direction="column" justifyContent="space-between">
        <Card sx={{minWidth: 775}}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Verify KYC
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
              
              
              <Box>
        {
          image_urls.map((url) => <img src={url} />)
        }
      </Box>
            
              

              
              
               <FormControlLabel
          control={
            <Checkbox
            onChange={(e) => handleInputChange(e, formik, )}
              value={formik.values.kyc_status}
              checked={formik.values.kyc_status === 'Verified' }
              name="kyc_status"
            />
          }
          label="Update KYC Status"
        />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              KYC Verify
            </Button>
          </Box>
         
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
