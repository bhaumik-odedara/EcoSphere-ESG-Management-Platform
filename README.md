
# EcoSphere - ESG Management Platform

A modern, AI-driven ESG (Environmental, Social, Governance) management platform built with Next.js and TypeScript.

## website Link - https://trae1iqyuo12-fprafbnxi-devs-projects-54682bc7.vercel.app/dashboard.

## Features

- **Dashboard**: Overview of key ESG metrics and performance indicators
- **Environmental Module**: Track carbon emissions, energy usage, and environmental impact
- **Social Module**: Manage employee engagement, diversity metrics, and community initiatives
- **Governance Module**: Monitor compliance, risk management, and board performance
- **AI Insights**: Leverage Groq AI for:
  - ESG insights and analysis
  - Carbon reduction recommendations
  - Report summarization
  - ESG score forecasting
  - Smart anomaly detection
  - Natural language report search
- **Gamification**: Engage users with challenges and rewards
- **Reports**: Generate and manage ESG reports
- **Settings**: Customize platform configuration

## Tech Stack

- **Framework**: Next.js 16 (Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI, Base UI React
- **Icons**: Lucide React
- **Charts**: Recharts
- **Markdown Rendering**: React Markdown + Remark GFM
- **AI Integration**: Groq SDK
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Groq API Key (from [console.groq.com](https://console.groq.com))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bhaumik-odedara/EcoSphere-ESG-Management-Platform.git
   cd EcoSphere-ESG-Management-Platform
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your GROQ_API_KEY
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

- `GROQ_API_KEY`: Your Groq API key (required for AI features)

## Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint

## License

MIT
