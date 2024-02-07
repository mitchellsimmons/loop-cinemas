import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import UserProvider from 'context/UserProvider';
import * as UserProviderModule from 'context/UserProvider';
import MediaProvider from 'context/MediaProvider';
import ProfilePage from './ProfilePage';

// --- Test State ---

let container = null;

// Test user
let mockTestUser = {
    id: 0,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    password: 'Password#1',
    joined: new Date().toISOString(),
};

// Active user will be manually set to simulate logged in user
let mockActiveUser = null;

// --- Mock & Render ---

beforeEach(() => {
    // Mock property required by jest
    // jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });

    // Mock user state (simulate logged-in user)
    mockActiveUser = mockTestUser;
    jest.spyOn(UserProviderModule, 'useUserContext').mockImplementation(() => ({
        user: mockActiveUser,
    }));

    // Provide context required to render component
    // Note, the profile page is a protected route that expects a user to be logged-in
    const queryClient = new QueryClient();
    const utils = render(
        <QueryClientProvider client={queryClient}>
            <MediaProvider>
                <UserProvider>
                    <BrowserRouter>
                        <ProfilePage />
                    </BrowserRouter>
                </UserProvider>
            </MediaProvider>
        </QueryClientProvider>
    );

    container = utils.container;
});

// --- Cleanup ---

afterEach(() => {
    mockActiveUser = null;
    jest.resetAllMocks();
});

// --- Test ---

describe('ProfilePage', () => {
    // Test component is rendering
    test('Profile page renders', () => {
        expect(container).toBeInTheDocument();
    });

    // Test the profile page is displaying information of the logged in user
    test('Profile page displays user information', () => {
        const nameElement = screen.getByTestId('name');
        const emailElement = screen.getByTestId('email');
        const joinDateElement = screen.getByTestId('join-date');

        expect(nameElement.innerHTML).toBe(
            `${mockActiveUser.firstName} ${mockActiveUser.lastName}`
        );

        expect(emailElement.innerHTML).toBe(mockActiveUser.email);

        expect(joinDateElement.innerHTML).toBe(
            new Date(mockActiveUser?.joined).toDateString()
        );
    });
});
