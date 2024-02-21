import { OpenAIApi, Configuration } from "openai";
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from "next/server";


const configuration = new Configuration({    
    apiKey: process.env.OPEN_AI_KEY 
})


const openai = new OpenAIApi(configuration)


export async function POST (req: Request) {

        const body = await req.json()

        try {            
            const dataId = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{ role: 'user', content: body.data }]
            })
            const responseText = dataId.data.choices[0].message?.content as string
            return NextResponse.json({responseText}, {status: 200})
            
        
        } catch(error){
            let errorMessage = ''
            if(error instanceof Error){
                return error.message
            }
        
        } 
    

}   
