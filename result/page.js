'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import getStripe from '@/utils/get-stripe'
import { useSearchParams } from 'next/navigation'
import { CircularProgress, Typography, Box, Container } from '@mui/material'

const ResultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session-id')

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if (!session_id) return 
            try {
                const res = await fetch(`/api/checkout_session?session_id=${session_id}`)
                const sessionData = await res.json()
                console.log(res)
                if (res.ok) {
                    setSession(sessionData)
                } else {
                    setError(sessionData.error)
                }
            } catch (error){
                setError("An error has occured")
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchCheckoutSession()
    }, [session_id]) 
    // console.log(session.payment_status)
    if (loading) {
        console.log("loading")
        return (
            <Container maxWidth="100vw" sx={{
                textAlign: "center",
                mt:4,
            }}>
                <CircularProgress />
                <Typography variant="h6"> Loading...</Typography>
            </Container>
        )
    }
    console.log(loading)
    if (error) {
        console.log("error")
        return (
            <Container
                maxWidth="100vw"
                sx={{
                    textAlign: "center",
                    mt:4
                }}>
                <Typography vatiant="h6">{error}</Typography>
            </Container>
        )
    }
    return (
        <Container
        maxWidth="100vw"
            sx={{
                textAlign: 'center',
                mt:4,
            }}>
            {session.payment_status === 'paid' ? (
                <>
                    <Typography variant="h4">Thank you for purchasing</Typography>
                    <Box sx={{ mt: 22 }}>
                        <Typography variant="h6">Sessioin ID: {session_id}</Typography>
                        <Typography variant="body1">We have received your payment. You will receive an email with details shortly.</Typography>
                    </Box>
                </>
            ) : (
                <>
                <Typography variant="h4">Payment failed</Typography>
                <Box sx={{ mt: 22 }}>
                    <Typography variant="body1">An error has occured. Please try again.</Typography>
                </Box>
            </>
            ) }
        </Container>
    )
}
export default ResultPage