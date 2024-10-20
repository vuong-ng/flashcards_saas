import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Button, Typography, AppBar, Toolbar, Box, Grid, CssBaseline} from '@mui/material'
import React from 'react';


const Countcard = ({ title, count }) => {
    const theme = createTheme({
        palette: {
          primary: {
            main: '#FFB6C1'
          },
          secondary: {
            main: '#FFE4B5'
            },
            background: {
                paper: '#FFF5E1', // Light Yellow
                default: '#FFF0F5', // Lavender Blush
              },
        },
        typography: {
          h2: {
            fontFamily: 'var(--font-montserrat)',
            fontWeight: '600',
            },
            cardTitle: {
                fontFamily: 'var(--font-montserrat)',
                fontWeight: '500',
                fontSize: '1.2rem',
            },
            cardCount: {
                fontFamily: 'var(--font-montserrat)',
                fontWeight: '700',
                fontSize: '2rem',
              },
            
    
        },
      
      });
    return (
        <>
            <ThemeProvider>
                <Typography
                    variant={'cardTitle'}
                    style={{fontWeight:'bold'}}
                >
                    ${title}
                </Typography>
                <Typography
                    variant={'cardCount'}
                >
                    ${count}
                </Typography>
                </ThemeProvider>
        </>

    );
};

export default Countcard;