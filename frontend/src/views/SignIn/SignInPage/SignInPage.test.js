import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import UserProvider from 'context/UserProvider';
import * as UserProviderModule from 'context/UserProvider';
import * as AuthModule from 'api/auth';
import MediaProvider from 'context/MediaProvider';
import SignInPage from './SignInPage';

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

// Active user will be set upon logging in
let mockActiveUser = null;

// --- Mock & Render ---

// Mock navigation (this must be mocked in global scope)
const mockedUsedNavigate = jest.fn(({ to }) => {});
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

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

    // Mock user state
    const mockedSetUser = jest.fn((user) => {
        mockActiveUser = user;
    });

    jest.spyOn(UserProviderModule, 'useUserContext').mockImplementation(() => ({
        setUser: mockedSetUser,
        user: mockActiveUser,
    }));

    // Mock user login
    const mockedLogin = jest.fn((email, password) => {
        if (
            email === mockTestUser.email &&
            password === mockTestUser.password
        ) {
            mockedSetUser(mockTestUser);
            return { data: mockActiveUser, status: 200 };
        } else {
            return { data: null, status: 401 };
        }
    });

    // Returned function will login the test user if the email and password match
    jest.spyOn(AuthModule, 'useLogin').mockImplementation(() => mockedLogin);

    // Provide context required to render component
    const queryClient = new QueryClient();
    const utils = render(
        <QueryClientProvider client={queryClient}>
            <MediaProvider>
                <UserProvider>
                    <BrowserRouter>
                        <SignInPage />
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

describe('SignInPage', () => {
    // Test component is rendering
    test('Sign-in page renders', () => {
        expect(container).toBeInTheDocument();
    });

    // Test signing in a user
    test('User logged in when valid email and password provided', async () => {
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByText('Sign In');

        // All state mutations must be awaited for test to pass
        await waitFor(() => {
            // Set the email and password of the test user
            fireEvent.change(emailInput, {
                target: { value: mockTestUser.email },
            });
            fireEvent.change(passwordInput, {
                target: { value: mockTestUser.password },
            });

            // Verify changes
            expect(emailInput).toHaveValue(mockTestUser.email);
            expect(passwordInput).toHaveValue(mockTestUser.password);

            // Login the user
            fireEvent.click(loginButton);
        });

        // Test user successfully logged in
        expect(mockActiveUser).toBe(mockTestUser);

        // Test user state dispatch function was called exactly once
        expect(
            UserProviderModule.useUserContext().setUser
        ).toHaveBeenCalledTimes(1);
        expect(
            UserProviderModule.useUserContext().setUser
        ).toHaveBeenCalledWith(mockTestUser);

        // Test login function was called exactly once
        expect(AuthModule.useLogin()).toHaveBeenCalledTimes(1);
        expect(AuthModule.useLogin()).toHaveReturnedWith({
            data: mockTestUser,
            status: 200,
        });

        // Test logged in user was redirected to profile page
        expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/profile');
    });

    // Test errors displayed when inputs not filled out
    test('Error shown when no email or password provided', async () => {
        const loginButton = screen.getByText('Sign In');

        // All state mutations must be awaited for test to pass
        await waitFor(() => {
            // Attempt login
            fireEvent.click(loginButton);
        });

        // Errors are conditionally rendered so must come after attempted login
        const emailError = screen.getByTestId('email-error');
        const passwordError = screen.getByTestId('password-error');

        // Test expected error text
        expect(emailError.innerHTML).toBe('Please fill out field');
        expect(passwordError.innerHTML).toBe('Please fill out field');

        // Test no user was logged in
        expect(mockActiveUser).toBe(null);

        // Test user state dispatch function was never called
        expect(
            UserProviderModule.useUserContext().setUser
        ).not.toHaveBeenCalled();

        // Test login function was never called
        expect(AuthModule.useLogin()).not.toHaveBeenCalled();

        // Test page was never redirected
        expect(mockedUsedNavigate).not.toHaveBeenCalled();
    });

    // Test errors displayed when inputs not filled out
    test('Error shown when invalid email or password provided', async () => {
        const loginButton = screen.getByText('Sign In');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');

        // All state mutations must be awaited for test to pass
        await waitFor(() => {
            // Set the email and password of the test user
            fireEvent.change(emailInput, {
                target: { value: 'Invalid' },
            });
            fireEvent.change(passwordInput, {
                target: { value: 'Invalid' },
            });

            // Verify changes
            expect(emailInput).toHaveValue('Invalid');
            expect(passwordInput).toHaveValue('Invalid');

            // Attempt login
            fireEvent.click(loginButton);
        });

        await waitFor(() => {
            // Errors are conditionally rendered so must come after attempted login
            const emailError = screen.getByTestId('email-error');
            const passwordError = screen.getByTestId('password-error');

            // Test expected error text
            expect(emailError.innerHTML).toBe('Invalid email or password.');
            expect(passwordError.innerHTML).toBe('Invalid email or password.');
        });

        // Test no user was logged in
        expect(mockActiveUser).toBe(null);

        // Test user state dispatch function was never called
        expect(
            UserProviderModule.useUserContext().setUser
        ).not.toHaveBeenCalled();

        // Test login function was called exactly once
        expect(AuthModule.useLogin()).toHaveBeenCalledTimes(1);
        expect(AuthModule.useLogin()).toHaveReturnedWith({
            data: null,
            status: 401,
        });

        // Test page was never redirected
        expect(mockedUsedNavigate).not.toHaveBeenCalled();
    });
});
