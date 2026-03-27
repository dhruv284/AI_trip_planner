import { NextRequest, NextResponse } from "next/server"
import OpenAI from 'openai';

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_KEY_API,
  
});
const PROMPT = `
You are an AI Trip Planner Agent.

Your goal is to help the user plan a trip by asking ONE question at a time in a strict sequence.

Follow this exact order:

1. source (starting location)
2. destination (city or country)
3. groupSize (Solo, Couple, Family, Friends)
4. budget (Low, Medium, High)
5. tripDuration (number of days)
6. interests (adventure, sightseeing, cultural, food, nightlife, relaxation)

Rules:
- Ask ONLY ONE question at a time.
- Do NOT skip steps.
- Do NOT ask multiple questions.
- If a user answer is unclear, ask for clarification.
- Always be conversational and friendly.

UI Mapping (VERY IMPORTANT):
Return a UI field based on the current question:

source → "source"
destination → "destination"
group size → "groupSize"
budget → "budget"
trip duration → "tripDuration"
interests → "interests"
final output → "final"

STRICT OUTPUT FORMAT (MANDATORY):
- Always return ONLY valid JSON
- No extra text, no explanation

Format:
{
  "resp": "Your response message to the user",
  "ui": "one of: source | destination | groupSize | budget | tripDuration | interests | final"
}

FINAL STEP:

When all information is collected:

Return ONLY a short message like:
"Thanks for the details! I’m generating your personalized trip now."

Do NOT include the full itinerary in resp.

Instead, include full trip details inside a separate "data" field.

Example:
{
  "resp": "Thanks for the details! I’m generating your personalized trip now.",
  "ui": "final",
  "data": {
    "destination": "...",
    "itinerary": [...]
  }
}
`
const FINAL_PROMPT = `Generate Travel Plan with give details, give me Hotels options list with HotelName, 

Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and  suggest itinerary with placeName, Place Details, Place Image Url,

 Geo Coordinates,Place address, ticket Pricing, Time travel each of the location , with each day plan with best time to visit in JSON format.

 Output Schema:

 {

  "trip_plan": {

    "destination": "string",

    "duration": "string",

    "origin": "string",

    "budget": "string",

    "group_size": "string",

    "hotels": [

      {

        "hotel_name": "string",

        "hotel_address": "string",

        "price_per_night": "string",

        "hotel_image_url": "string",

        "geo_coordinates": {

          "latitude": "number",

          "longitude": "number"

        },

        "rating": "number",

        "description": "string"

      }

    ],

    "itinerary": [

      {

        "day": "number",

        "day_plan": "string",

        "best_time_to_visit_day": "string",

        "activities": [

          {

            "place_name": "string",

            "place_details": "string",

            "place_image_url": "string",

            "geo_coordinates": {

              "latitude": "number",

              "longitude": "number"

            },

            "place_address": "string",

            "ticket_pricing": "string",

            "time_travel_each_location": "string",

            "best_time_to_visit": "string"

          }

        ]

      }

    ]

  }

}`


export async function POST(req: NextRequest){
    
    const { messages, isFinal }= await req.json();
        try{
        const completion = await openai.chat.completions.create({
        model: "openai/gpt-4.1-mini",
        response_format: {type: 'json_object'},
        max_tokens: isFinal ? 3000 : 500,
        messages: [
        {
            "role": "system",
            "content": isFinal?FINAL_PROMPT:PROMPT
            
        },
        ...messages
        ]
    });

    console.log(completion.choices[0].message);
    const message=completion.choices[0].message
    return NextResponse.json(JSON.parse(message.content??''))
    }
    catch(e){
        return NextResponse.json(e)

    }
}