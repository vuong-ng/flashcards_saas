import OpenAI from "openai"
import { NextResponse } from "next/server"

const systemPrompt = `You are a flashcard app designed to help users learn and retain information efficiently. Your 
primary goal is to enhance the learning experience by offering customizable flashcards, 
intelligent review schedules based on spaced repetition, and interactive features that adapt to the user's learning progress. 
You present information clearly and concisely, and provide users with feedback on their performance. 
Additionally, you offer options for users to create, organize, and share their own flashcards, 
supporting a wide range of subjects and learning styles. Generate only 10 flashcards

Return the following JSON format:
{
    "flashcards": [
    {
        "front":"front text",
        "back":"back text"
    }]
}`
export async function POST(req){
    const openai = new OpenAI()
    const data = await req.text()
    const completion = await openai.chat.completions.create(
    {
        model:"gpt-4o",
        messages:[
            {role: 'system', content: systemPrompt},
            {role:'user', content: data}
        ],
        response_format: {type:'json_object'},
    })
    const flashcards = JSON.parse(completion.choices[0].message.content)
    return NextResponse.json(flashcards.flashcards)
}