'use client'

import {UserProfile, useUser} from '@clerk/nextjs'
import {use, useEffect, useState} from 'react'

import { collection, doc, getDoc, setDoc} from 'firebase/firestore'
import db from '@/firebase'
import { Container, Card, CardActionArea, Grid, CardContent, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function Flashcards() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router=useRouter()

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || []
                setFlashcards(collections)
            } else {
                await setDoc(docRef, {flashcards:[]})
            }
        }
        getFlashcards()
    }, [user])

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }
    return (
        <Container maxwdith="100vw">
            <Grid
            container
            spacing={3}
            sx={{
                mt:4,
            }}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardActionArea
                            onClick={() => {
                                handleCardClick(flashcard.name)
                            }}>
                                <CardContent>
                                    <Typography variant="h6">
                                        {flashcard.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}