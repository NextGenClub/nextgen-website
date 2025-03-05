# NextGen Website Frontend README

# NextGen Website Frontend

This is the frontend part of the NextGen Website project, built using React and TypeScript. The application allows community members to submit project ideas, vote on proposals, and manage ongoing tasks.

## Project Structure

```
frontend
├── public
│   ├── favicon.ico          # Favicon for the website
│   └── index.html           # Main HTML file
├── src
│   ├── components           # React components
│   │   ├── Auth             # Authentication components
│   │   ├── Dashboard        # Dashboard components
│   │   ├── Ideas           # Idea submission and voting components
│   │   ├── Layout          # Layout components (Header, Footer, Navigation)
│   │   └── Tasks           # Task management components
│   ├── contexts             # Context API for state management
│   ├── hooks                # Custom hooks
│   ├── pages                # Page components
│   ├── services             # API service functions
│   ├── types                # TypeScript types
│   ├── App.tsx              # Main application component
│   ├── index.tsx            # Entry point for the React application
│   └── routes.tsx           # Routing configuration
├── .env.example              # Example environment variables
├── package.json              # Project dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the frontend directory:
   ```
   cd nextgen-website/frontend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

To start the development server, run:
```
npm start
```

The application will be available at `http://localhost:3000`.

### Environment Variables

Create a `.env` file in the `frontend` directory based on the `.env.example` file and configure the necessary environment variables.

### Testing

To run tests, use:
```
npm test
```

### Contributing

Contributions are welcome! Please follow the Git branching strategy and submit pull requests for any changes.

### License

This project is licensed under the MIT License. See the LICENSE file for details.