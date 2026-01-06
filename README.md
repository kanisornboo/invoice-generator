# Invoice Generator

A modern, professional invoice generator built with Next.js. Create, preview, and download invoices as PDFs with automatic currency detection based on your location.

## Features

- **Invoice Creation** - Add line items with description, quantity, and rate
- **Live Preview** - See your invoice update in real-time as you type
- **PDF Export** - Download professional-looking invoices as PDF files
- **Auto Currency Detection** - Automatically detects your locale and displays the appropriate currency symbol (supports 30+ countries)
- **Tax Calculation** - Configurable tax rate with automatic subtotal, tax, and total calculations
- **Responsive Design** - Works on desktop and mobile devices
- **Dark Mode Support** - LinkedIn-inspired theme with light and dark modes

## Tech Stack

### Core Framework

| Package | Version | Description |
|---------|---------|-------------|
| Next.js | 16.1.1 | React framework for production |
| React | 19.2.3 | UI library |
| React DOM | 19.2.3 | React rendering for web |
| TypeScript | 5.x | Type-safe JavaScript |

### Styling

| Package | Version | Description |
|---------|---------|-------------|
| Tailwind CSS | 4.x | Utility-first CSS framework |
| tailwind-merge | 3.4.0 | Merge Tailwind classes without conflicts |
| clsx | 2.1.1 | Utility for constructing className strings |
| class-variance-authority | 0.7.1 | CSS-in-TS variant management |
| tw-animate-css | 1.4.0 | Animation utilities for Tailwind |

### UI Components

| Package | Version | Description |
|---------|---------|-------------|
| @radix-ui/react-label | 2.1.8 | Accessible label component |
| @radix-ui/react-slot | 1.2.4 | Primitive slot component |
| lucide-react | 0.562.0 | Beautiful icon library |

### PDF Generation

| Package | Version | Description |
|---------|---------|-------------|
| jsPDF | 4.0.0 | Client-side PDF generation |

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd invoice-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
invoice-generator/
├── app/                    # Next.js app directory
│   ├── globals.css         # Global styles and theme
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── ui/                 # Reusable UI components
│   ├── invoice-preview/    # Invoice preview components
│   ├── invoice-from.tsx    # Invoice form container
│   ├── invoice-item.tsx    # Line item component
│   └── tax-and-totals.tsx  # Tax and totals section
├── context/                # React context providers
│   └── invoice-context.tsx # Invoice state management
├── lib/                    # Utilities and constants
│   └── constant.ts         # Initial invoice data
├── types/                  # TypeScript type definitions
│   └── invoice.ts          # Invoice types
└── utils/                  # Helper functions
    ├── calculations.ts     # Tax and total calculations
    └── formatter.ts        # Currency and date formatting
```

## Currency Support

The app automatically detects your browser's locale and displays prices in the appropriate currency:

| Region | Currency | Symbol |
|--------|----------|--------|
| United States | USD | $ |
| United Kingdom | GBP | £ |
| European Union | EUR | € |
| Japan | JPY | ¥ |
| Thailand | THB | ฿ |
| India | INR | ₹ |
| Australia | AUD | A$ |
| Canada | CAD | C$ |
| And 20+ more... | | |

## License

This project is private and not licensed for public distribution.
