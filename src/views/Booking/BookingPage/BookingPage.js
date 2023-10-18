import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFetchMovieById, useFetchMovieTimeById } from 'api/movies';
import { getFormattedDateFromDay, useCreateReservation } from 'api/reservations';
import { Button, LinkButton, UserModalContainer } from 'components';
import { useUserContext } from 'context/UserProvider';
import { useMediaContext } from 'context/MediaProvider';
import Wrapper from './BookingPage.styles';

// --- Constants ---

const NUM_ROWS = 2;
const NUM_SEATS_PER_ROW = 5;

const BookingPage = () => {
    const { movieId, timeId } = useParams();
    const [selectedSeats, setSelectedSeats] = useState({});
    const { user } = useUserContext();
    const { isDesktop } = useMediaContext();
    const [isSignUpPageOpen, setIsSignUpPageOpen] = useState(false);
    const [isSignInPageOpen, setIsSignInPageOpen] = useState(false);
    const [createReservation] = useCreateReservation();
    const {
        isMovieLoading,
        isMovieError,
        data: movie,
    } = useFetchMovieById(movieId);

    const {
        isLoading: isTimesLoading,
        isError: isTimesError,
        data: time,
    } = useFetchMovieTimeById(timeId, true);

    const reservedSeats = time?.seats;
    const isLoading = isMovieLoading || isTimesLoading;
    const isError = isMovieError || isTimesError;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleBookingSubmit = async () => {
        createReservation({
            userId: user.id,
            timeId,
            seats: Object.values(selectedSeats),
        });
    };

    const handleSeatClick = (seat) => {
        setSelectedSeats((prev) => {
            const key = seat.row + seat.number;
            if (key in prev) {
                let { [key]: seat, ...rest } = prev;
                return rest;
            } else {
                return { ...prev, [key]: seat };
            }
        });
    };

    const toggleSignUpPage = () => {
        setIsSignUpPageOpen((prev) => !prev);
    };

    const toggleSignInPage = () => {
        setIsSignInPageOpen((prev) => !prev);
    };

    const getSeatingPlan = () => {
        const vacancyMatrix = [];

        for (let row = 0; row < NUM_ROWS; row++) {
            let vacancyRow = [];

            for (let seatNo = 0; seatNo < NUM_SEATS_PER_ROW; seatNo++) {
                vacancyRow.push(0);
            }

            vacancyMatrix.push(vacancyRow);
        }

        if (reservedSeats) {
            for (let reservedSeat of reservedSeats) {
                // 65 is ASCII for 'A'
                const rowIndex = reservedSeat.seat.row.charCodeAt(0) - 65;
                const seatIndex = reservedSeat.seat.number - 1;
                vacancyMatrix[rowIndex][seatIndex] = 1;
            }
        }

        const rowsOfSeats = [];

        for (let rowIndex = 0; rowIndex < vacancyMatrix.length; rowIndex++) {
            const row = vacancyMatrix[rowIndex];
            const rowOfSeats = [
                <p key={0}>{String.fromCharCode(65 + rowIndex)}</p>,
            ];
            const rowChar = String.fromCharCode(65 + rowIndex);

            for (let seatIndex = 0; seatIndex < row.length; seatIndex++) {
                const isReserved = row[seatIndex];
                const seat = { row: rowChar, number: seatIndex + 1 };
                const key = seat.row + seat.number;

                if (isReserved === 1) {
                    rowOfSeats.push(
                        <div key={seat.number} className='seat reserved'>
                            {seatIndex + 1}
                        </div>
                    );
                } else {
                    rowOfSeats.push(
                        <div
                            key={seat.number}
                            className={`seat ${
                                key in selectedSeats ? 'selected' : ''
                            }`}
                            onClick={() => handleSeatClick(seat)}
                        >
                            {seatIndex + 1}
                        </div>
                    );
                }
            }

            rowsOfSeats.push(<div key={rowIndex} className='row'>{rowOfSeats}</div>);
        }

        return <div className='container'>{rowsOfSeats}</div>;
    };

    if (isLoading || isError) {
        return;
    }

    const dateStr = getFormattedDateFromDay(time.day);

    return (
        <Wrapper>
            <h2>Booking</h2>
            <div className='details'>
                <h3>{movie.title}</h3>
                <h4>
                    {dateStr} - {time.time}
                </h4>
                <h3>Screen 1</h3>
            </div>
            <h2>Select Seats</h2>
            {getSeatingPlan()}
            {user && (
                <Button className='btn' onClick={handleBookingSubmit}>
                    Book Now
                </Button>
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

export default BookingPage;
