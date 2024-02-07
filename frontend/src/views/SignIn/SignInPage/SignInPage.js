import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { IoMail } from 'react-icons/io5';

import { useMediaContext } from '@/context/MediaProvider';
import { useLogin } from '@/api/auth';
import { Button } from 'components';
import { cinemaImage } from '@/assets/images';
import Wrapper from './SignInPage.styles';

const SignInPage = ({ onSuccess, onNotMember }) => {
    const { isDesktop } = useMediaContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidEmail, setInvalidEmail] = useState('');
    const [invalidPassword, setInvalidPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const navigate = useNavigate();
    const login = useLogin();

    const handleSignIn = async () => {
        if (!handleErrors()) return;

        const { data, status } = await login(email, password);

        if (status === 200) {
            // Reset fields
            setEmail('');
            setPassword('');

            // Navigate to profile page
            navigate('/profile');

            // Invoke user callback
            if (onSuccess) {
                onSuccess();
            }

            toast(`Welcome ${data.firstName}!`);
        } else if (status === 401) {
            setInvalidEmail('Invalid email or password.');
            setInvalidPassword('Invalid email or password.');
        } else if (status === 500) {
            // Server error, notify user something went wrong
            toast.error('Login failed');
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

        // Validate email and password
        if (!email) {
            setInvalidEmail('Please fill out field');
            valid = false;
        }

        if (!password) {
            setInvalidPassword('Please fill out field');
            valid = false;
        }

        return valid;
    };

    return (
        <Wrapper>
            <div className='content-container'>
                <h2>Welcome Back</h2>
                {isDesktop ? (
                    <p>
                        Not a member? <Link onClick={onNotMember}>Sign Up</Link>
                    </p>
                ) : (
                    <p>
                        Not a member? <Link to='/sign-up'>Sign Up</Link>
                    </p>
                )}
                <div className='form-container'>
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
                        {invalidPassword && (
                            <p className='error' data-testid='password-error'>
                                {invalidPassword}
                            </p>
                        )}
                    </div>
                    <Button onClick={handleSignIn}>Sign In</Button>
                </div>
            </div>
            <div className='img-container'>
                <img src={cinemaImage} alt='People watching movie' />
            </div>
        </Wrapper>
    );
};

export default SignInPage;
