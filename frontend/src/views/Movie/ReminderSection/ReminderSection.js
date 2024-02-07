import Wrapper from './ReminderSection.styles';
import { LinkButton } from 'components';

const ReminderSection = ({ release }) => {
    const releaseDate = new Date(release);
    const releaseDateStr = releaseDate.toLocaleString('default', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });

    return (
        <Wrapper id='reminder-section'>
            <div className='container'>
                <h3>releasing</h3>
                <h4>{releaseDateStr}</h4>
                <LinkButton>add reminder</LinkButton>
            </div>
        </Wrapper>
    );
};

export default ReminderSection;
