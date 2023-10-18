import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import UserProvider from 'context/UserProvider';
import * as UserProviderModule from 'context/UserProvider';
import * as UserModule from 'api/users';
import MediaProvider from 'context/MediaProvider';
import SignUpPage from './SignUpPage';

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

    // Mock user registration
    const mockedRegister = jest.fn((firstName, lastName, email, password) => {
        if (
            firstName === mockTestUser.firstName &&
            lastName === mockTestUser.lastName &&
            email === mockTestUser.email &&
            password === mockTestUser.password
        ) {
            mockedSetUser(mockTestUser);
            return { data: mockActiveUser, status: 201 };
        } else {
            return { data: null, status: 401 };
        }
    });

    // Returned function will register/login the test user
    jest.spyOn(UserModule, 'useRegister').mockImplementation(
        () => mockedRegister
    );

    // Provide context required to render component
    const queryClient = new QueryClient();
    const utils = render(
        <QueryClientProvider client={queryClient}>
            <MediaProvider>
                <UserProvider>
                    <BrowserRouter>
                        <SignUpPage />
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

describe('SignUpPage', () => {
    // Test component is rendering
    test('Sign-up page renders', () => {
        expect(container).toBeInTheDocument();
    });

    // Test registering a user
    test('User registered when valid inputs provided', async () => {
        const firstNameInput = screen.getByPlaceholderText('First Name');
        const lastNameInput = screen.getByPlaceholderText('Last Name');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const registerButton = screen.getByText('Create Account');

        // All state mutations must be awaited for test to pass
        await waitFor(() => {
            // Set registration details of the test user
            fireEvent.change(firstNameInput, {
                target: { value: mockTestUser.firstName },
            });
            fireEvent.change(lastNameInput, {
                target: { value: mockTestUser.lastName },
            });
            fireEvent.change(emailInput, {
                target: { value: mockTestUser.email },
            });
            fireEvent.change(passwordInput, {
                target: { value: mockTestUser.password },
            });

            // Verify changes
            expect(firstNameInput).toHaveValue(mockTestUser.firstName);
            expect(lastNameInput).toHaveValue(mockTestUser.lastName);
            expect(emailInput).toHaveValue(mockTestUser.email);
            expect(passwordInput).toHaveValue(mockTestUser.password);

            // Register the user
            fireEvent.click(registerButton);
        });

        // Test user successfully registered and logged in
        expect(mockActiveUser).toBe(mockTestUser);

        // Test user state dispatch function was called exactly once
        expect(
            UserProviderModule.useUserContext().setUser
        ).toHaveBeenCalledTimes(1);
        expect(
            UserProviderModule.useUserContext().setUser
        ).toHaveBeenCalledWith(mockTestUser);

        // Test registration function was called exactly once
        expect(UserModule.useRegister()).toHaveBeenCalledTimes(1);
        expect(UserModule.useRegister()).toHaveReturnedWith({
            data: mockTestUser,
            status: 201,
        });

        // Test registered user was redirected to profile page
        expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/profile');
    });

    // Test errors displayed when inputs not filled out
    test('Errors shown when no name or email or password provided', async () => {
        const registerButton = screen.getByText('Create Account');

        // All state mutations must be awaited for test to pass
        await waitFor(() => {
            // Attempt registration
            fireEvent.click(registerButton);
        });

        // Errors are conditionally rendered so must come after attempted login
        const firstNameError = screen.getByTestId('first-name-error');
        const lastNameError = screen.getByTestId('last-name-error');
        const emailError = screen.getByTestId('email-error');
        const passwordError = screen.getByTestId('password-error');

        // Test expected error text
        expect(firstNameError.innerHTML).toBe('Please fill out field');
        expect(lastNameError.innerHTML).toBe('Please fill out field');
        expect(emailError.innerHTML).toBe('Invalid email format');
        expect(passwordError.innerHTML).toBe(
            'Password must be at least 8 characters long. Must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        );

        // Test no user was logged in
        expect(mockActiveUser).toBe(null);

        // Test user state dispatch function was never called
        expect(
            UserProviderModule.useUserContext().setUser
        ).not.toHaveBeenCalled();

        // Test login function was never called
        expect(UserModule.useRegister()).not.toHaveBeenCalled();

        // Test page was never redirected
        expect(mockedUsedNavigate).not.toHaveBeenCalled();
    });
});
