import { useState } from 'react';

import Wrapper from './DaySelector.styles';

const DaySelector = ({ day, setDay }) => {
    const getSelectorLables = () => {
        const days = {
            0: 'sunday',
            1: 'monday',
            2: 'tuesday',
            3: 'wednesday',
            4: 'thursday',
            5: 'friday',
            6: 'saturday',
        };

        let today = day;
        let tomorrow = day !== 6 ? day + 1 : 0;

        let labels = [
            ['today', day],
            ['tomorrow', tomorrow],
        ];

        if (tomorrow === 0) {
            for (let i = 1; i < today; ++i) {
                labels.push([days[i], i]);
            }
        } else {
            for (let i = tomorrow + 1; i <= 6; ++i) {
                labels.push([days[i], i]);
            }

            for (let i = 0; i < day; ++i) {
                labels.push([days[i], i]);
            }
        }

        return labels;
    };

    // Lazyily initialise the labels (ie. initial render only)
    // Note, we should probabily setup a timeout to update the labels at midnight..
    const [labels] = useState(getSelectorLables);

    return (
        <Wrapper id='day-selector'>
            {labels.map(([label, id]) => {
                return (
                    <button
                        key={id}
                        className={`day-btn ${day === id && 'active-btn'}`}
                        onClick={() => setDay(id)}
                    >
                        {label}
                    </button>
                );
            })}
        </Wrapper>
    );
};

export default DaySelector;
