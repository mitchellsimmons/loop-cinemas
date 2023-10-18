import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Quill } from 'react-quill';

import UserProvider from 'context/UserProvider';
import * as UserProviderModule from 'context/UserProvider';
import * as ReviewsModule from 'api/reviews';
import MediaProvider from 'context/MediaProvider';
import ReviewsSection from './ReviewsSection';

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

    // Mock fetching user review data
    jest.spyOn(ReviewsModule, 'getUserReviewWaitTime').mockImplementation(
        (id) => {
            return Promise.resolve([0, 0]);
        }
    );

    jest.spyOn(
        ReviewsModule,
        'useFetchUserReviewsByMovieId'
    ).mockImplementation((id) => {
        return { isLoading: false, isError: false, data: [] };
    });

    // Provide context required to render component
    const queryClient = new QueryClient();
    const utils = render(
        <QueryClientProvider client={queryClient}>
            <MediaProvider>
                <UserProvider>
                    <BrowserRouter>
                        <ReviewsSection id={1} criticReviews={[]} />
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

describe('ReviewSection', () => {
    // Test component is rendering
    test('Review section renders', () => {
        expect(container).toBeInTheDocument();
    });

    // Test that the post is truncated to 600 characters
    test('Review post is truncated to 600 characters', async () => {
        const postContainer = screen.getByTestId('post-container');
        const quillEditor = postContainer.querySelector('.ql-editor');
        const quill = Quill.find(quillEditor);

        // All state mutations must be awaited for test to pass
        await waitFor(() => {
            fireEvent.change(quillEditor, {
                target: { textContent: `${'a'.repeat(1000)}` },
            });
        });

        // The extra character is a newline character that Quill adds when we query the post
        expect(quill.length()).toBe(601);
        expect(quillEditor.textContent).toBe(`${'a'.repeat(600)}`);
    });
});
