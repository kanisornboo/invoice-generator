import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { description, context } = await request.json();

    if (!description || description.trim().length === 0) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `You are a professional invoice description writer. Transform the following brief description into a clear, professional invoice line item description.

Rules:
- Keep it concise (1-2 sentences maximum)
- Use professional business language
- Be specific and clear about the service/product
- Don't add pricing information
- Don't add unnecessary details
- Return ONLY the enhanced description, nothing else

Brief description: ${description}
${context ? `\nAdditional context: ${JSON.stringify(context)}` : ""}

Enhanced description:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const enhancedDescription = response.text().trim();

    return NextResponse.json({
      enhancedDescription,
      originalDescription: description,
    });
  } catch (error) {
    console.error("AI Enhancement Error:", error);
    return NextResponse.json(
      {
        error: "Failed to enhance description",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
