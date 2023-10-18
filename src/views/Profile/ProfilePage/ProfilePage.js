import Wrapper from './ProfilePage.styles';
import React, { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { IoMail } from 'react-icons/io5';

import { useUserContext } from 'context/UserProvider';
import { validateEmail, validatePassword } from 'api/auth';
import { useFetchShowing } from 'api/movies';
import {
    getFormattedDateFromDay,
    useFetchReservationsByUserId,
} from 'api/reservations';
import {
    useDeleteAccount,
    useUpdateProfile,
    useUpdatePassword,
} from 'api/users';

const ProfilePage = () => {
    const { user } = useUserContext();
    const [updateProfile] = useUpdateProfile();
    const [updatePassword] = useUpdatePassword();
    const [deleteAccount] = useDeleteAccount();

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    const [formData, setFormData] = useState(user || {});
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(true);

    const [emptyFirstName, setEmptyFirstName] = useState('');
    const [emptyLastName, setEmptyLastName] = useState('');
    const [invalidEmail, setInvalidEmail] = useState('');
    const [invalidPassword, setInvalidPassword] = useState('');
    const [invalidConfirmedPassword, setInvalidConfirmedPassword] =
        useState('');

    const {
        isLoading: isReservationsLoading,
        isError: isReservationsError,
        data: reservations,
    } = useFetchReservationsByUserId(user.id, true, true);

    const {
        isLoading: isMoviesLoading,
        isError: isMoviesError,
        data: showing,
    } = useFetchShowing();

    const isLoading = isReservationsLoading || isMoviesLoading;
    const isError = isReservationsError || isMoviesError;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleProfileErrors = () => {
        let isValid = true;

        // Reset errors
        setEmptyFirstName('');
        setEmptyLastName('');
        setInvalidEmail('');

        if (!formData.firstName) {
            setEmptyFirstName('Please fill out field');
            isValid = false;
        }

        if (!formData.lastName) {
            setEmptyLastName('Please fill out field');
            isValid = false;
        }

        // Validate email and password
        if (!validateEmail(formData.email)) {
            setInvalidEmail('Invalid email format');
            isValid = false;
        }

        return isValid;
    };

    const handlePasswordErrors = () => {
        let isValid = true;

        setInvalidPassword('');
        setInvalidConfirmedPassword('');

        if (!validatePassword(password)) {
            setInvalidPassword(
                'Password must be at least 8 characters long. Must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
            );
            isValid = false;
        } else if (password !== confirmedPassword) {
            setInvalidConfirmedPassword('Password does not match');
            isValid = false;
        }

        return isValid;
    };

    const handleEditProfile = async () => {
        if (isEditingProfile) {
            if (!handleProfileErrors()) {
                return;
            }

            updateProfile({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
            });
        } else {
            // Reset edit state
            setFormData(user || {});
            setEmptyFirstName('');
            setEmptyLastName('');
            setInvalidEmail('');
        }

        setIsEditingProfile((prev) => !prev);
    };

    const handleCancelEditProfile = () => {
        setIsEditingProfile((prev) => !prev);
    };

    const handleEditPassword = async () => {
        if (isEditingPassword) {
            if (!handlePasswordErrors()) {
                return;
            }

            updatePassword({ password });
        } else {
            // Reset edit state
            setPassword('');
            setConfirmedPassword('');
            setInvalidPassword('');
            setInvalidConfirmedPassword('');
            setShowPassword(true);
            setShowConfirmedPassword(true);
        }

        setIsEditingPassword((prev) => !prev);
    };

    const handleCancelEditPassword = () => {
        setIsEditingPassword((prev) => !prev);
    };

    const handleDeleteProfile = async () => {
        if (window.confirm('Are you sure you want to delete your profile?')) {
            deleteAccount();
        }
    };

    if (isLoading || isError) {
        return;
    }

    return (
        <Wrapper>
            <div className='vertical-container'>
                {isEditingProfile && (
                    <div className='container editing'>
                        <div className='input-container'>
                            <input
                                type='text'
                                name='firstName'
                                value={formData.firstName || ''}
                                onChange={handleInputChange}
                                placeholder='First Name'
                            />
                            {emptyFirstName && (
                                <p className='error'>{emptyFirstName}</p>
                            )}
                        </div>
                        <div className='input-container'>
                            <input
                                type='text'
                                name='lastName'
                                value={formData.lastName || ''}
                                onChange={handleInputChange}
                                placeholder='Last Name'
                            />
                            {emptyLastName && (
                                <p className='error'>{emptyLastName}</p>
                            )}
                        </div>
                        <div className='input-container'>
                            <input
                                type='text'
                                name='email'
                                value={formData.email || ''}
                                onChange={handleInputChange}
                                placeholder='Email'
                            />
                            <IoMail />
                            {invalidEmail && (
                                <p className='error'>{invalidEmail}</p>
                            )}
                        </div>
                        <div className='button-container'>
                            <button onClick={handleEditProfile}>
                                Save Changes
                            </button>
                            <button
                                className='cancel'
                                onClick={handleCancelEditProfile}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
                {isEditingPassword && (
                    <div className='container editing'>
                        <div className='input-container'>
                            <input
                                type={showPassword ? 'password' : 'text'}
                                name='password'
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                placeholder='Password'
                            />
                            {showPassword ? (
                                <AiFillEyeInvisible
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                />
                            ) : (
                                <AiFillEye
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                />
                            )}
                            {invalidPassword && (
                                <p className='error'>{invalidPassword}</p>
                            )}
                        </div>
                        <div className='input-container'>
                            <input
                                type={
                                    showConfirmedPassword ? 'password' : 'text'
                                }
                                name='confirmPassword'
                                value={confirmedPassword}
                                onChange={(event) =>
                                    setConfirmedPassword(event.target.value)
                                }
                                placeholder='Confirm Password'
                            />
                            {showConfirmedPassword ? (
                                <AiFillEyeInvisible
                                    onClick={() =>
                                        setShowConfirmedPassword(
                                            (prev) => !prev
                                        )
                                    }
                                />
                            ) : (
                                <AiFillEye
                                    onClick={() =>
                                        setShowConfirmedPassword(
                                            (prev) => !prev
                                        )
                                    }
                                />
                            )}
                            {invalidConfirmedPassword && (
                                <p className='error'>
                                    {invalidConfirmedPassword}
                                </p>
                            )}
                        </div>
                        <div className='button-container'>
                            <button onClick={handleEditPassword}>
                                Save Changes
                            </button>
                            <button
                                className='cancel'
                                onClick={handleCancelEditPassword}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
                {!isEditingProfile && !isEditingPassword && (
                    <div className='container'>
                        <h2 data-testid='name'>
                            {user && user.firstName} {user && user.lastName}
                        </h2>
                        <div className='info'>
                            <span>Email:</span>
                            <span data-testid='email'>
                                {user && user.email}
                            </span>
                        </div>
                        <div className='info'>
                            <span>Date Joined:</span>
                            <span data-testid='join-date'>
                                {user && user?.joined
                                    ? new Date(user?.joined).toDateString()
                                    : 'Not available'}
                            </span>
                        </div>
                        <div className='button-container'>
                            <button onClick={handleEditProfile}>
                                Edit Profile
                            </button>
                            <button onClick={handleEditPassword}>
                                Change Password
                            </button>
                            <button
                                className='delete'
                                onClick={handleDeleteProfile}
                            >
                                Delete Profile
                            </button>
                        </div>
                    </div>
                )}
                {reservations && (
                    <div className='container'>
                        <h2>Reservations</h2>
                        <div className='reservations'>
                            {reservations.map((reservation, index) => {
                                const dateStr = getFormattedDateFromDay(
                                    reservation.movieTime.day
                                );
                                const movie = showing.find(
                                    (movie) =>
                                        movie.id ===
                                        reservation.movieTime.movieId
                                );
                                const seats = reservation.seats.map(
                                    (seat) => seat.seat.row + seat.seat.number
                                );
                                return (
                                    <div className='reservation' key={index}>
                                        <h3>{movie.title}</h3>
                                        <h4>
                                            {dateStr} -{' '}
                                            {reservation.movieTime.time}
                                        </h4>
                                        <h5>Screen 1</h5>
                                        <h5>Seats - {seats.join(', ')}</h5>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </Wrapper>
    );
};

export default ProfilePage;
