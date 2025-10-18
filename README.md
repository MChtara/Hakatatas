# AI-WealthX - AI-Powered Investment Assistant

A modern React dashboard for analyzing financial assets (Tijari Bank and Injaz) using AI modules including Sentiment Analysis, LSTM, VAR, and Explainable AI (XAI).

## Features

- **Dashboard**: Real-time price charts with AI-powered analysis
- **AI Report**: Investment recommendations and portfolio allocation
- **Explainability**: SHAP-based feature importance visualization
- **Tokenomics**: Blockchain-based asset tokenization

## Tech Stack

- React 18 + Vite
- TailwindCSS for styling
- Recharts for data visualization
- React Router DOM for navigation
- Axios for API calls

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## Project Structure

```
src/
├── api/
│   ├── config.js          # Axios configuration
│   ├── services.js        # API service functions
│   └── mockData.js        # Mock data for development
├── components/
│   ├── Navbar.jsx         # Navigation bar
│   ├── ChartCard.jsx      # Price chart component
│   ├── TokenCard.jsx      # Token display card
│   └── LoadingSpinner.jsx # Loading indicator
├── pages/
│   ├── Dashboard.jsx      # Main dashboard
│   ├── Report.jsx         # AI recommendations
│   ├── Explainability.jsx # Feature importance
│   └── Tokenomics.jsx     # Token management
├── App.jsx                # Main app with routing
├── main.jsx               # Entry point
└── index.css              # Global styles
```

## API Endpoints

The application expects the following backend endpoints:

- `GET /collect` - Fetch raw financial data
- `POST /analyze` - Analyze specific asset
- `GET /strategy` - Get investment recommendations
- `GET /explain` - Get explainability data
- `GET /tokenize` - Get tokenomics information

## Mock Data

The app includes comprehensive mock data that allows it to run without a backend. All API calls gracefully fall back to mock data if the backend is unavailable.

## Deployment

Build the production version:

```bash
npm run build
```

Deploy the `dist` folder to your hosting provider (Vercel, Netlify, etc.).

## License

MIT

---

Built for the hackathon demo. Happy investing! 🚀
