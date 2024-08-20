'use client'
import Image from "next/image";
import getStripe from '@/utils/get-stripe'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import {Container, Button, Typography, AppBar, Toolbar, Box, Grid} from '@mui/material'
import Head from 'next/head'
import { loadStripe } from '@stripe/stripe-js'

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
  return (
    <Container sx={{mx:"0", px:"0"}} width="100vw">
      <Head>
        <title>Flashcard SaaS </title>
        <meta name="description" content="Create falshcard from your text"/>
      </Head>

      <AppBar position="static">
        <Toolbar sx={{m:"0", p:"0"}} width="100%">
          <Typography variant='h6' style={{flexGrow :1}}>
            Flashcard SaaS
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
        variant="h2">
          Welcome to Flashcard SaaS
          </Typography>
          <Typography variant="h5">
            {' '}
            The easiest way to create flashcards from scratch
          </Typography>
          <Button variant="contained" color="primary" sx={{mt:2}}>
            Get Started
          </Button>
      </Box>
      <Box sx={{my:6}} textAlign={"center"}>
        <Typography variant="h4" components="h2">
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
        <Box sx={{my:6}} textAlign="center">
        <Typography variant="h4" components="h2" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
            sx={{
              p:3,
              border:"1px solid",
              borderColor:"grey.300",
              borderRadius:2,
            }}>
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
              borderRadius:2,
            }}>
            <Typography variant="h5" gutterBottom>
              Pro
              </Typography>
            <Typography variant="h6" gutterBottom>
              $7 / month</Typography>
            <Typography>
              {' '}
              Unlimited flashcards and storage, with priority support.
            </Typography>
            <Button variant="contained" color="primary">
              Choose basic
            </Button>
            </Box>
          </Grid> 
        </Grid>
        </Box>
      </Box>
    </Container>
  );
}
