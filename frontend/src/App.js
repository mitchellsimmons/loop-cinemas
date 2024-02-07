import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomeLayout } from 'layouts';
import { HomePage } from 'views/Home';
import { ErrorPage } from 'views/Error';
import { MoviePage } from 'views/Movie';
import { SignInPage } from 'views/SignIn';
import { SignUpPage } from 'views/SignUp';
import { ProfilePage } from 'views/Profile';
import { BookingPage } from 'views/Booking';
import { PersistLogin, RequireAuth, RequireLoggedOut } from 'components';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                // index: true,
                element: <PersistLogin />,
                children: [
                    {
                        index: true,
                        element: <HomePage />,
                    },
                    {
                        path: '/movies/:title',
                        element: <MoviePage />,
                    },
                    {
                        path: '/sign-in',
                        // User must be logged out to access sign-in page
                        element: <RequireLoggedOut />,
                        children: [
                            {
                                index: true,
                                element: <SignInPage />,
                            },
                        ],
                    },
                    {
                        path: '/sign-up',
                        // User must be logged out to access sign-up page
                        element: <RequireLoggedOut />,
                        children: [
                            {
                                index: true,
                                element: <SignUpPage />,
                            },
                        ],
                    },
                    {
                        path: '/profile',
                        // User must be logged in to access profile page
                        element: <RequireAuth />,
                        children: [
                            {
                                index: true,
                                element: <ProfilePage />,
                            },
                        ],
                    },
                    {
                        path: '/booking/:movieId/:timeId',
                        element: <BookingPage />,
                    },
                ],
            },
        ],
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer
                position='top-center'
                autoClose={1200}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
            />
        </>
    );
}

export default App;
