# Wildcat Personality Quiz

An engaging, interactive quiz application that matches users with endangered wildcat species based on their personality traits. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🐱 Personality-based matching with endangered wildcats
- 📱 Fully responsive design for all devices
- ✨ Smooth animations and transitions
- 💾 Progress saving
- 📧 Newsletter integration
- 🔄 Social sharing capabilities

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Context API
- **Icons**: Heroicons

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/wildcat-quiz.git
cd wildcat-quiz
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/         # Reusable components
├── context/           # React Context for state management
├── lib/               # Utilities and data
├── styles/            # Global styles
└── types/             # TypeScript type definitions
```

## Components

- `Question`: Displays quiz questions and handles answer selection
- `ProgressBar`: Shows quiz progress
- `EmailForm`: Collects user email and newsletter preferences
- `Results`: Displays quiz results and sharing options

## State Management

The application uses React Context API for state management. The quiz state includes:

- Current question index
- User's answers
- Quiz results
- Email and newsletter preferences

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- FUZZ Newsletter for the project requirements and content
- Unsplash for wildcat images
- Conservation organizations working to protect endangered wildcats 