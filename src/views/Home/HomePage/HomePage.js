import { useEffect } from 'react';

import {
    HeroCarousel,
    NowShowingSection,
    ComingSoonSection,
    MemberSection,
} from 'views/Home';
import { SearchSection } from 'components';
import { useUserContext } from 'context/UserProvider';
import { useMediaContext } from 'context/MediaProvider';
import Wrapper from './HomePage.styles';

const HomePage = () => {
    const { user } = useUserContext();
    const { isDesktop } = useMediaContext();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Wrapper>
            {isDesktop && <SearchSection />}
            {isDesktop && <HeroCarousel />}
            <NowShowingSection />
            <ComingSoonSection />
            {user === null && <MemberSection />}
        </Wrapper>
    );
};

export default HomePage;
