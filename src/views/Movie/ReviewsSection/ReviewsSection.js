import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Wrapper from './ReviewsSection.styles';
import { Button, LinkButton, UserModalContainer } from 'components';
import { Review, RatingSelector } from 'views/Movie';
import { useUserContext } from 'context/UserProvider';
import { useMediaContext } from 'context/MediaProvider';
import {
    getUserReviewWaitTime,
    useFetchUserReviewsByMovieId,
    useEditReview,
    useCreateReview,
    useDeleteReview,
} from 'api/reviews';

const CHAR_LIMIT = 600;
// Empty quill post contains a newline character
const DEFAULT_POST_LENGTH = 1;

const ReviewsSection = ({ id, criticReviews }) => {
    const { user } = useUserContext();
    const { isDesktop } = useMediaContext();
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editorHasFocus, setEditorHasFocus] = useState(false);
    const [editorHtml, setEditorHtml] = useState('');
    const [postLength, setPostLength] = useState(0);
    const [rating, setRating] = useState(0);
    const [isSignUpPageOpen, setIsSignUpPageOpen] = useState(false);
    const [isSignInPageOpen, setIsSignInPageOpen] = useState(false);
    const reactQuillRef = useRef(null);
    const [editReview] = useEditReview();
    const [createReview] = useCreateReview();
    const [deleteReview] = useDeleteReview();
    const {
        isLoading,
        isError,
        data: userReviews,
    } = useFetchUserReviewsByMovieId(id);

    // Set focus on the editor when the user clicks to edit their review and place cursor at end
    useEffect(() => {
        if (isEditing && reactQuillRef?.current) {
            reactQuillRef.current.focus();
            const editor = reactQuillRef.current.getEditor();
            editor.setSelection(editor.getLength() - 1, 0);
        }
    }, [isEditing]);

    // Update post length state whenever post is edited
    useEffect(() => {
        setPostLength(
            (reactQuillRef?.current?.getEditor()?.getLength() ||
                DEFAULT_POST_LENGTH) - DEFAULT_POST_LENGTH
        );
    }, [isEditing, editorHtml]);

    if (isLoading || isError) {
        return;
    }

    // Show logged in user review last
    let sortedUserReviews = [];
    if (user !== null) {
        sortedUserReviews = userReviews
            .filter((review) => {
                return review.userId !== user.id;
            })
            .concat(
                userReviews.filter((review) => {
                    return review.userId === user.id;
                })
            );
    }

    const toggleSignUpPage = () => {
        setIsSignUpPageOpen((prev) => !prev);
    };

    const toggleSignInPage = () => {
        setIsSignInPageOpen((prev) => !prev);
    };

    // Check if the user has already posted a review for this movie
    // No need to use state, since value is dependent on reviews state
    let existingReview = null;
    const hasReview =
        sortedUserReviews.length &&
        sortedUserReviews[sortedUserReviews.length - 1].userId === user?.id;
    if (hasReview) {
        existingReview = sortedUserReviews[sortedUserReviews.length - 1];
    }

    const handlePostChange = (content) => {
        if (reactQuillRef?.current === null) {
            return;
        }

        const editor = reactQuillRef.current.getEditor();

        if (editor.getLength() > CHAR_LIMIT) {
            editor.deleteText(CHAR_LIMIT, editor.getLength());
            setEditorHtml(editor.root.innerHTML);
        } else {
            setEditorHtml(content);
        }
    };

    // Display wait time error when post field gains focus (unless user is editing)
    const handlePostFocus = async () => {
        setEditorHasFocus(true);

        if (user === null) {
            setError('Sign-in to post a review');
        } else if (!isEditing) {
            const [hoursRemaining, minutesRemaining] =
                await getUserReviewWaitTime(user.id);
            setWaitTimeError(hoursRemaining, minutesRemaining);
        }
    };

    // Clear all errors when post field loses focus
    const handlePostBlur = () => {
        setEditorHasFocus(false);
        setError('');
    };

    // Set error based on time user must wait between posting reviews
    const setWaitTimeError = (hoursRemaining, minutesRemaining) => {
        if (hoursRemaining > 0 || minutesRemaining > 0) {
            setError(
                `Limit reached, please wait ${hoursRemaining} hour${
                    hoursRemaining !== 1 && 's'
                } ${minutesRemaining} minute${minutesRemaining !== 1 && 's'}`
            );
        }
    };

    const resetUserState = () => {
        setEditorHtml('');
        setRating(0);
        setError('');
        setIsEditing(false);
    };

    // Validate review, then update state + local storage
    const handlePostReview = async () => {
        const [hoursRemaining, minutesRemaining] = await getUserReviewWaitTime(
            user.id
        );

        // Trim post just before posting
        const editor = reactQuillRef.current.getEditor();
        const trimmedPost = editor.getText().trim();
        const trimmedPostLength = trimmedPost.length;
        const whitespaceCount = postLength - trimmedPostLength;
        editor.deleteText(
            editor.getLength() - whitespaceCount,
            editor.getLength()
        );
        const post = editor.root.innerHTML;

        // Ignore time limit if user is editing their post
        if (!isEditing && (hoursRemaining > 0 || minutesRemaining > 0)) {
            setWaitTimeError(hoursRemaining, minutesRemaining);
        } else if (trimmedPostLength === 0) {
            setError('Post is empty');
        } else if (rating === 0) {
            setError('Select a rating');
        } else {
            if (isEditing) {
                editReview({ movieId: id, text: post, rating });
            } else {
                createReview({ movieId: id, text: post, rating });
            }

            // Reset state (if user deletes their review these values should be reset)
            resetUserState();
        }
    };

    // Display existing review data
    const handleEditReview = () => {
        setEditorHtml(existingReview.text);
        setRating(existingReview.rating);
        setIsEditing(true);
    };

    const handleDeleteReview = () => {
        deleteReview({ movieId: id });
    };

    const handleCancelEdit = () => {
        resetUserState();
    };

    return (
        <Wrapper id='reviews-section'>
            <h2>Reviews</h2>
            {criticReviews.map((criticReview, index) => {
                return <Review key={index} {...criticReview}></Review>;
            })}
            {userReviews.reduce((accumulator, review, index) => {
                // Do not render the current user's review if they are in editing mode
                if (review.userId !== user?.id || !isEditing) {
                    accumulator.push(
                        <Review
                            key={index}
                            editable={review.userId === user?.id}
                            onEdit={handleEditReview}
                            onDelete={handleDeleteReview}
                            critic={`${review.firstName} ${review.lastName}`}
                            {...review}
                        ></Review>
                    );
                }
                return accumulator;
            }, [])}
            {(!hasReview || isEditing) && (
                <div
                    className={`post-container ${editorHasFocus && 'focus'}`}
                    data-testid='post-container'
                >
                    <ReactQuill
                        ref={reactQuillRef}
                        value={editorHtml}
                        placeholder={'Leave a review'}
                        onChange={handlePostChange}
                        onFocus={handlePostFocus}
                        onBlur={handlePostBlur}
                    />
                    <p
                        className={'char-counter'}
                    >{`${postLength}/${CHAR_LIMIT}`}</p>
                    <p className='error'>{error}</p>
                </div>
            )}
            {user && (!hasReview || isEditing) && (
                <div className='button-rating-container'>
                    <RatingSelector rating={rating} setRating={setRating} />
                    {isEditing && (
                        <Button ghost onClick={handleCancelEdit}>
                            cancel
                        </Button>
                    )}
                    <Button onClick={handlePostReview}>post</Button>
                </div>
            )}
            {!user && isDesktop && (
                <>
                    <LinkButton onClick={toggleSignInPage}>sign in</LinkButton>
                    <UserModalContainer
                        isSignInPageOpen={isSignInPageOpen}
                        isSignUpPageOpen={isSignUpPageOpen}
                        toggleSignInPage={toggleSignInPage}
                        toggleSignUpPage={toggleSignUpPage}
                    />
                </>
            )}
            {!user && !isDesktop && (
                <LinkButton to='/sign-in'>sign in</LinkButton>
            )}
        </Wrapper>
    );
};

export default ReviewsSection;
