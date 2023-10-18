import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { IoMail } from 'react-icons/io5';

import { validateEmail, validatePassword } from 'api/auth';
import { useRegister } from 'api/users';
import { useMediaContext } from 'context/MediaProvider';
import { Button } from 'components';
import { cinemaImage } from 'assets/images';
import Wrapper from './SignUpPage.styles';

const SignUpPage = ({ onSuccess, onAlreadyMember }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const { isDesktop } = useMediaContext();
    const register = useRegister();

    const [invalidEmail, setInvalidEmail] = useState('');
    const [invalidPassword, setInvalidPassword] = useState('');
    const [emptyFirstName, setEmptyFirstName] = useState('');
    const [emptyLastName, setEmptyLastName] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async () => {
        if (!handleErrors()) return;

        const lowercaseEmail = email.toLowerCase();

        const { status } = await register(
            firstName,
            lastName,
            lowercaseEmail,
            password
        );

        if (status === 201) {
            // Reset fields after sign up
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');

            // Navigate to profile page
            navigate('/profile');

            // Invoke user callback
            if (onSuccess) {
                onSuccess();
            }

            toast('Successfully registered!');
        } else if (status === 409) {
            setInvalidEmail('Email already in use');
        } else if (status === 500) {
            // Server error, notify user something went wrong
            toast.error('Registration failed');
        } else {
            // Server not responding
            toast.error('No server response');
        }
    };

    const handleErrors = () => {
        let valid = true;

        // Reset errors
        setInvalidEmail('');
        setInvalidPassword('');
        setEmptyFirstName('');
        setEmptyLastName('');

        // Validate first name
        if (!firstName) {
            setEmptyFirstName('Please fill out field');
            valid = false;
        }

        if (!lastName) {
            setEmptyLastName('Please fill out field');
            valid = false;
        }

        // Validate email format
        if (!validateEmail(email)) {
            setInvalidEmail('Invalid email format');
            valid = false;
        }

        // Validate password format
        if (!validatePassword(password)) {
            setInvalidPassword(
                'Password must be at least 8 characters long. Must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            );
            valid = false;
        }

        return valid;
    };

    return (
        <Wrapper>
            <div className='content-container'>
                <h2>Join The Club</h2>
                {isDesktop ? (
                    <p>
                        Already a member?{' '}
                        <Link onClick={onAlreadyMember}>Sign In</Link>
                    </p>
                ) : (
                    <p>
                        Already a member? <Link to='/sign-in'>Sign In</Link>
                    </p>
                )}

                <div className='form-container'>
                    <div className='name-container'>
                        <div className='first-name-container'>
                            <input
                                type='text'
                                value={firstName}
                                onChange={(event) =>
                                    setFirstName(event.target.value)
                                }
                                placeholder='First Name'
                            />
                            {emptyFirstName && (
                                <p
                                    className='error'
                                    data-testid='first-name-error'
                                >
                                    {emptyFirstName}
                                </p>
                            )}
                        </div>
                        <div className='last-name-container'>
                            <input
                                type='text'
                                value={lastName}
                                onChange={(event) =>
                                    setLastName(event.target.value)
                                }
                                placeholder='Last Name'
                            />
                            {emptyLastName && (
                                <p
                                    className='error'
                                    data-testid='last-name-error'
                                >
                                    {emptyLastName}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className='email-container'>
                        <input
                            type='text'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder='Email'
                        />
                        <IoMail />
                        {invalidEmail && (
                            <p className='error' data-testid='email-error'>
                                {invalidEmail}
                            </p>
                        )}
                    </div>
                    <div className='password-container'>
                        <input
                            type={showPassword ? 'password' : 'text'}
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder='Password'
                        />
                        {showPassword ? (
                            <AiFillEyeInvisible
                                onClick={() => setShowPassword((prev) => !prev)}
                            />
                        ) : (
                            <AiFillEye
                                onClick={() => setShowPassword((prev) => !prev)}
                            />
                        )}
                    </div>
                </div>
                {invalidPassword && (
                    <p className='error' data-testid='password-error'>
                        {invalidPassword}
                    </p>
                )}
                <Button onClick={handleSignUp}>Create Account</Button>
            </div>
            <div className='img-container'>
                <img src={cinemaImage} alt='People watching movie' />
            </div>
        </Wrapper>
    );
};

export default SignUpPage;
