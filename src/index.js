import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import App from './App';
import UserProvider from 'context/UserProvider';
import MediaProvider from 'context/MediaProvider';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <MediaProvider>
                <UserProvider>
                    <App />
                </UserProvider>
            </MediaProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
