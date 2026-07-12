import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt, type } = await req.json();
    let systemPrompt = '';
    switch (type) {
      case 'insights':
        systemPrompt = 'You are an ESG (Environmental, Social, Governance) expert analyst. Provide detailed, actionable insights based on the given ESG data. Make sure to explain key metrics, trends, and areas for improvement.';
        break;
      case 'recommendations':
        systemPrompt = 'You are a sustainability consultant. Provide specific, actionable carbon reduction and ESG improvement recommendations based on the given data. Prioritize high-impact, feasible actions.';
        break;
      case 'summarize':
        systemPrompt = 'You are an expert ESG report summarizer. Create clear, concise, executive-level summaries of the given ESG report or data.';
        break;
      case 'forecast':
        systemPrompt = 'You are an ESG data forecaster. Provide a forecast of ESG scores and trends for the next 1-3 years based on historical data.';
        break;
      case 'anomaly':
        systemPrompt = 'You are an ESG data analyst. Analyze the given data for anomalies, outliers, or unexpected trends that require attention.';
        break;
      case 'search':
        systemPrompt = 'You are an ESG report search assistant. Answer the user\'s query based on the provided ESG report/document data.';
        break;
      default:
        systemPrompt = 'You are an ESG expert assistant.';
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 2048,
    });

    return NextResponse.json({ result: chatCompletion.choices[0]?.message?.content || 'No response' }, { status: 200 });
  } catch (error) {
    console.error('Error with Groq API:', error);
    return NextResponse.json({ error: 'Failed to get response from AI' }, { status: 500 });
  }
}
