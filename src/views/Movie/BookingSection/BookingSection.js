import { useEffect, useState } from 'react';

import Wrapper from './BookingSection.styles';
import { DaySelector } from 'components';
import Selector from 'components/Selector/Selector';
import { useNavigate } from 'react-router-dom';

const BookingSection = ({ times }) => {
    // Lazyily initialise the date (ie. initial render only)
    const [day, setDay] = useState(() => {
        const d = new Date();
        return d.getDay();
    });
    const navigate = useNavigate();

    // Selected time
    const [time, setTime] = useState(-1);
    // Times associated with selected day
    const [selectedTimes, setSelectedTimes] = useState([]);

    useEffect(() => {
        setSelectedTimes(times.filter((time) => time.day === day));
    }, [day, times]);

    const navigateToBooking = (index) => {
        setTime(index);
        navigate(
            `/booking/${selectedTimes[index].movieId}/${selectedTimes[index].id}`
        );
    };

    return (
        <Wrapper id='booking-section'>
            <h2>book tickets</h2>
            <h3>day</h3>
            <DaySelector day={day} setDay={setDay} />
            <h3>time</h3>
            <Selector
                labels={selectedTimes.map((time) => time.time)}
                index={time}
                setIndex={navigateToBooking}
            />
        </Wrapper>
    );
};

export default BookingSection;
