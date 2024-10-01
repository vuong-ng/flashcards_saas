'use client'
import Image from "next/image";
import getStripe from '@/utils/get-stripe'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Container, Button, Typography, AppBar, Toolbar, Box, Grid, CssBaseline} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Head from 'next/head'
import { loadStripe } from '@stripe/stripe-js'
// import { teal, blueGrey, lightBlue } from '@mui/material/colors';
// import { flashcard } from './assets/card-index-dividers-svgrepo-com.svg';

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        origin: 'https://localhost:3000',
      },
    })
    const checkoutSessionJson = await checkoutSession.json()
    console.log(checkoutSessionJson)
    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }
    const stripe = await getStripe()
    // console.log(stripe)
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })
    if (error) {
      console.warn(error.message)
    }
  }
  const theme = createTheme({
    palette: {
      primary: {
        main: '#143366'
      },
      secondary: {
        main: '#E8E9F3'
      },
    },
    typography: {
      h2: {
        fontFamily: 'var(--font-montserrat)',
        fontWeight: '600',
      }

    },
  
  });
  return (
    <>
      <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Container maxWidth={false} disableGutters sx={{ height:'100vh'}} maxHeight={false}>
      <Head>
        <title >Flashcard SaaS </title>
        <meta name="description" content="Create falshcard from your text"/>
      </Head>
      {/* sx={{m:"0", p:"0", width:"100%", maxWidth:"1280px"}} */}
      {/* sx={{display:"flex", width:"100%"}}> */}
      <AppBar position="relative">
        <Toolbar color='primary.main'>
          <Typography variant='h6' style={{flexGrow :1,fontWeight:'bold'}}>
                FlashyCards
                {/* <img src={flashcard} /> */}
            </Typography>
          <SignedOut>
            <Button variant="contained" sx={{mx:"10px"}} href="/sign-in">Login</Button>
            <Button variant="contained" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </Toolbar>
      </AppBar> 
      <Box sx={{
        textAlign:"center",
        mt:4,
      }}
      position="static">
        <Typography
              variant="h2"
              m={10}
            color='#272635'>
          Welcome to FlashyCards
          </Typography>
          <Typography variant="h5">
            {' '}
            The easiest way to create flashcards from scratch
          </Typography>
          <Button variant="contained" color="primary" sx={{mt:2}} href="/generate">
            Get Started
          </Button>
      </Box>
      <Box sx={{my:6}} textAlign={"center"}>
        <Typography variant="h4" components="h2" mb={5}>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy text input</Typography>
            <Typography >Simply input your text and let we take care the rest!</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Smart flashcards</Typography>
            <Typography>Our AI intelligently breaks down your text into concise flashcards perfect for studying</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Accessible anywhere</Typography>
            <Typography>Access your flashcards from any device at any time. Study on the go with ease.</Typography>
          </Grid>     
        </Grid>
        <Box sx={{my:6}} textAlign="center" >
        <Typography variant="h4" components="h2" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4} alignSelf={'center'} ml={'auto'} mr={'auto'}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                    p:3,
                    border:"1px solid",
                    borderColor:"grey.300",
                    borderRadius: 2,
                      backgroundColor: '#B7C2D5',
                      boxShadow: '3px 3px 1px 0px #EEC1C4',
                    maxWidth: '600px',
                    maxHeight:'200px'
              
              }}
                    m={5}>
            <Typography variant="h5" gutterBottom>
              Basic
              </Typography>
            <Typography variant="h6" gutterBottom>
              $5 / month</Typography>
            <Typography>
              {' '}
              Access to basic flashcard features and limited storage
            </Typography>
            <Button variant="contained" color="primary" sx={{mt:2}} onClick={handleSubmit}>
              Choose basic
            </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
            sx={{
              p:3,
              border:"1px solid",
              borderColor:"grey.300",
                      borderRadius: 2,
              backgroundColor: '#B7C2D5',
                      boxShadow: '3px 3px 1px 0px #EEC1C4',
                      maxWidth: '600px',
                    maxHeight:'200px'
                    }}
                  m={5}>
            <Typography variant="h5" gutterBottom>
              Pro
              </Typography>
            <Typography variant="h6" gutterBottom>
              $7 / month</Typography>
            <Typography>
              {' '}
              Unlimited flashcards and storage, with priority support.
            </Typography>
            <Button variant="contained" color="primary" sx={{mt:2}} onClick={handleSubmit}>
              Choose Pro
            </Button>
            </Box>
          </Grid> 
        </Grid>
        </Box>
      </Box>
      </Container>
    </ThemeProvider>
      </>
  );
}
