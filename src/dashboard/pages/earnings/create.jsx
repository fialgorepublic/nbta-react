import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
// import {  SitemarkIcon } from './CustomIcons';
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import AppTheme from "../../../shared-theme/AppTheme";
import * as yup from "yup";
import MenuItem from "@mui/material/MenuItem";
import {Select, FormHelperText} from "@mui/material";
import { useState, useEffect } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
    earningFor: yup
  .string('Select Earning for').required('Please select one'),
  earning_type: yup
  .string('select type').required('please select one'),
  
  investor: yup.array().when("earningFor", {
    is: (val) => val === "individual",
    then: (schema) => yup.array().min(1, 'atleast one').required("* Please Select One."),
    otherwise: (schema) => schema.min(0),
}),
  return_percentage: yup
    .string("Enter amount")
    .min(1, "Amount is atleast 1")
    .required("Amount is required"),
});

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function Earning(props) {
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


  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
        earningFor: '',
        earning_type: '',
      investor: [],
      return_percentage: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        console.log('values')
      createInvestment(values);
    },
  });

  const createInvestment = (values) => {
    axios
      .post("http://localhost:3000/api/v1/earnings/create", values, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("response", response);
        navigate("/investments");
        toast.success("Investment created Successfully");
      })
      .catch((error) => {
        console.log("errorsss", error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card sx={{ minWidth: 775 }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Manage Earnings
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
             <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Manage Earning For</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="earningFor"
        row
        value={formik.values.earningFor}
        onChange={formik.handleChange}
      >
        <FormControlLabel value="Accumulate" control={<Radio />} label="Accumulative" />
        <FormControlLabel value="individual" control={<Radio />} label="Investors" />
      </RadioGroup>
      <FormHelperText sx={{ color: "#d32f2f"}}>
                  {formik.touched.earningFor &&
                    formik.errors.earningFor}
                </FormHelperText>
    </FormControl>
            
            { formik.values.earningFor === 'individual' && 
                <FormControl fullWidth>
                <FormLabel htmlFor="email">Investor</FormLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  name="investor"
                  value={formik.values.investor}
                  onChange={formik.handleChange}
                  error={formik.touched.investor && Boolean(formik.errors.investor)}
                  helperText={formik.touched.investor && formik.errors.investor}
                >
                  {investors.map((investor) => (
                    <MenuItem key={investor._id} value={investor._id}>
                      {investor.first_name + " " + investor.last_name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                {formik.touched.investor && formik.errors.investor}
              </FormHelperText>
             
                </FormControl>
            }

<FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Earning Type</FormLabel>
      <RadioGroup
      row
        aria-labelledby="demo-radio-buttons-group-label"
        name="earning_type"
        value={formik.values.earning_type}
        onChange={formik.handleChange}
      >
        <FormControlLabel value="profit" control={<Radio />} label="Profit" />
        <FormControlLabel value="loss" control={<Radio />} label="Loss" />
      </RadioGroup>
      <FormHelperText sx={{ color: "#d32f2f"}}>
                  {formik.touched.earning_type &&
                    formik.errors.earning_type}
                </FormHelperText>
    </FormControl>
            
            
            <FormLabel>Return Percentage</FormLabel>
            <TextField
              fullWidth
              id="last_name"
              type="number"
              name="return_percentage"
              value={formik.values.return_percentage}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.return_percentage && Boolean(formik.errors.return_percentage)
              }
              helperText={formik.touched.return_percentage && formik.errors.return_percentage}
            />

            <Button type="submit" fullWidth variant="contained">
              Manage Earning
            </Button>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
