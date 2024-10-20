'use client'
import { use, useEffect, useState } from 'react'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { UserProfile, useUser } from '@clerk/nextjs'
import { getFirestore,collection, doc, getDoc,getDocs ,setDoc,collectionGroup} from 'firebase/firestore'
import { Container, Button, Typography, Select, AppBar, MenuItem, Toolbar, Box, Grid, CssBaseline} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import db from '@/firebase'
import Countcard from './components/Countcard'
// import { initializeApp } from 'firebase/app'

const Dashboard = () => {
  const [flashcardsLearned, setFlashcardsLearned] = useState(0);
  const [flashcardsCreated, setFlashcardsCreated] = useState(0);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [collectionNames, setCollectionsNames] = useState([]);
  const [selectedCollectionItems, setSelectedCollectionItems] = useState([]);
  const [collections, setCollections] = useState([]);

  const { isLoaded, isSignedIn, user } = useUser()
    // const db = initializeApp();
    useEffect(() => {
      async function getFlashcards() {
        if (!user) return
        const docRef = doc(collection(db, 'users'), user.id);
        console.log("Fetching flashcards for user:", user.id, "with path:", docRef.path);
        try {
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || []
            setCollections(collections)
            // console.log(collections)
            const collectionNames = collections.map(col => col.name);
              setCollectionsNames(collectionNames)
          }
          else {
            await setDoc(docRef, { flashcards: [] });
          }
        }
        catch (error) {
          console.log("Error fetching flashcards:", error);
        }
      }
        getFlashcards();
    }, [user])

  useEffect(async () => {
    if (selectedCollection) {
        console.log(selectedCollection);
      const collection = collections.find(col => col.name === selectedCollection);
      console.log(collection);
      if (collection) {
        const q = query(collection, where("front", "==", true));
        let items= await getDocs(q);
          setSelectedCollectionItems(items);
        }
    } else {
        setSelectedCollectionItems([]);
        console.log(`selectedCollection is null`);
    }
}, [selectedCollection, collections]);
    
  
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
                <Container className='container' maxWidth={false} disableGutters sx={{ height:'100vh'}}>
                <Head>
        <title >Flashcard SaaS </title>
        <meta name="description" content="Create flashcards from your text"/>
      </Head>
      <AppBar position="relative">
        <Toolbar color='primary.main'>
          <Typography variant='h6' style={{flexGrow :1,fontWeight:'bold'}}>
                FlashyCards
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
                    
                    <Box sx={{ textAlign: "center", mt: 4 }}>
                        <Typography variant="h4">Total Flashcards: {flashcardsCreated}</Typography>
                        <Typography variant="h6">Collections:</Typography>
                        <Select
                            value={selectedCollection}
                onChange={(e) => {
                  setSelectedCollection(e.target.value);
                  console.log(e.target.value);
                  console.log(selectedCollection);
                }}
                            // displayEmpty
                            sx={{ minWidth: 200, mt: 2 }}
                        >
                            <MenuItem value="" disabled>Select a collection</MenuItem>
                            {collectionNames.map((name, index) => (
                                <MenuItem key={index} value={name}>{name}</MenuItem>
                            ))}
                        </Select>
                        {selectedCollectionItems.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body1">Flashcards in {selectedCollection}:</Typography>
                                <ul>
                                    {selectedCollectionItems.map((flashcard, index) => (
                                        <li key={index}>{flashcard}</li>
                                    ))}
                                </ul>
                            </Box>
                        )}
                    </Box>
            </Container>
            </ThemeProvider>
        </>
    );
};

export default Dashboard;