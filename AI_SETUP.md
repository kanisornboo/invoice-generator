# AI Integration Setup Guide

This invoice generator now includes AI-powered description enhancement using Google's Gemini AI.

## Setup Instructions

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Configure Environment Variables

1. Open the `.env.local` file in the project root
2. Replace `your_gemini_api_key_here` with your actual API key:

```env
GEMINI_API_KEY=AIzaSyC...your_actual_key_here
```

### 3. Start the Development Server

```bash
npm run dev
```

### 4. Test the AI Feature

1. Navigate to the invoice form
2. In any invoice item's description field, type a brief description (e.g., "web design")
3. Click the "Enhance" button with the sparkle icon
4. The AI will transform your brief description into a professional invoice line item

## Features

### AI Description Enhancement

- **Location**: Invoice item description field
- **Button**: Click "✨ Enhance" next to the description label
- **How it works**: 
  - Type a brief description (e.g., "consulting", "logo design", "server setup")
  - Click the Enhance button
  - AI generates a professional, clear invoice description
  - Description is automatically updated in the field

### Example Transformations

| Input | AI-Enhanced Output |
|-------|-------------------|
| "web design" | "Professional web design services including UI/UX development and responsive layout implementation" |
| "consulting" | "Professional consulting services and strategic business advisory" |
| "server setup" | "Cloud server infrastructure setup and configuration services" |

## Technical Details

- **API Route**: `/api/ai/enhance-description`
- **AI Model**: Google Gemini Pro
- **Processing**: Server-side (secure)
- **No Database**: All processing happens on-the-fly
- **Context-Aware**: AI considers other invoice items for consistency

## Cost & Usage

- Gemini API has a generous free tier
- Each enhancement is a single API call
- No data is stored or persisted
- Check [Google AI Studio pricing](https://ai.google.dev/pricing) for current rates

## Troubleshooting

### "GEMINI_API_KEY is not configured" error
- Verify `.env.local` exists in project root
- Ensure the API key is correctly pasted
- Restart the development server after changing `.env.local`

### Button is disabled
- The description field must have some text before you can enhance it
- Make sure you're not already in the middle of an enhancement

### Enhancement not working
- Check browser console for error messages
- Verify your API key is valid at [Google AI Studio](https://aistudio.google.com/app/apikey)
- Ensure you have internet connectivity

## Security Notes

- API key is stored in `.env.local` (not committed to git)
- API calls are made server-side via Next.js API routes
- Your API key is never exposed to the browser
- No invoice data is stored or logged
