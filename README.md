# Tailway - Animal Emergency Guidance Platform

Tailway is a digital platform providing immediate, location-based guidance for people who encounter animals in distress.

## Key Features
- **Dynamic Routing for Animal Guides**
  - Emergency response guides for dogs, cats, and birds
  - Step-by-step instructions with safety tips
  - Interactive flow charts

- **Directory Listings**
  - Searchable directory of animal services
  - Service type filtering
  - Emergency service indicators

- **Internationalization**
  - English (en), Dutch (nl), French (fr) support
  - Language switcher in navigation
  - Dynamic routing with language prefixes

## Deployment
- **Frontend**: [https://tailway.vercel.app](https://tailway.vercel.app)
- **Backend**: [https://tailway-cms-production.up.railway.app](https://tailway-cms-production.up.railway.app)

## Tech Stack
- **Frontend**: Next.js 15.1.3
- **Backend**: Strapi CMS
- **Styling**: Tailwind CSS
- **TypeScript**: ^5
- **Deployment**:
  - Vercel (Frontend)
  - Railway (Backend)

## Development
### Frontend Commands
```bash
# Run development server
npm run dev

# Build for production
npm run build
```

### Project Structure
```
tailway/
├── public/             # Static assets
├── src/                # Source code
│   ├── app/            # Next.js app router
│   ├── components/     # Reusable components
│   ├── config/         # Configuration
│   ├── lib/            # Utilities
│   └── middleware.ts   # Next.js middleware
├── .eslintrc.json      # ESLint config
├── next.config.js      # Next.js config
├── tailwind.config.ts  # Tailwind config
└── tsconfig.json       # TypeScript config
```

## Backend Configuration
- Strapi CMS manages all content
- PostgreSQL database on Railway
- Local development uses SQLite
- API accessible at: https://tailway-cms-production.up.railway.app

## Contributing
1. Clone both repositories:
   ```bash
   git clone https://github.com/your-username/tailway.git
   git clone https://github.com/your-username/tailway-cms.git
   ```

2. Install dependencies:
   ```bash
   cd tailway && npm install
   cd ../tailway-cms && npm install
   ```

3. Start development servers:
   ```bash
   # Frontend
   cd tailway && npm run dev

   # Backend
   cd tailway-cms && npm run develop
   ```

4. Access:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:1337/admin
