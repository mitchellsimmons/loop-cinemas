import { createContext, useContext, useEffect, useState } from 'react';

// --- CONTEXT ---

const MediaContext = createContext();

// Custom hook to access global state from descendant components
export const useMediaContext = () => useContext(MediaContext);

// --- PROVIDER ---

// Media context component
const MediaProvider = ({ children }) => {
    const [isTablet, setIsTablet] = useState(
        window.matchMedia('(min-width: 640px)').matches
    );

    const [isDesktop, setIsDesktop] = useState(
        window.matchMedia('(min-width: 1024px)').matches
    );

    useEffect(() => {
        const update = (e) => setIsTablet(e.matches);

        // Listen for change in media size
        window
            .matchMedia('(min-width: 640px)')
            .addEventListener('change', update);

        // Cleanup
        return () => {
            window
                .matchMedia('(min-width: 640px)')
                .removeEventListener('change', update);
        };
    }, []);

    useEffect(() => {
        const update = (e) => setIsDesktop(e.matches);

        // Listen for change in media size
        window
            .matchMedia('(min-width: 1024px)')
            .addEventListener('change', update);

        // Cleanup
        return () => {
            window
                .matchMedia('(min-width: 1024px)')
                .removeEventListener('change', update);
        };
    }, []);

    return (
        <MediaContext.Provider
            value={{
                isTablet,
                isDesktop,
            }}
        >
            {children}
        </MediaContext.Provider>
    );
};

export default MediaProvider;
