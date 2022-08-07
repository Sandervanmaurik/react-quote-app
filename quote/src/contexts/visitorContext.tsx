import { createContext, useContext, useEffect, useState } from 'react';
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import React from 'react';

type ContextType = {
    visitorId: string,
    isLoading: boolean
}

const VisitorContext = createContext<ContextType>({visitorId: "", isLoading: true});


const VisitorContextProvider = ({ children }: any) => {
    const [visitorId, setVisitorId] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Get visitor id on first render
        FingerprintJS.load()
            .then((fp) => fp.get())
            .then((result) => {
                setVisitorId(prev => result.visitorId);
                setIsLoading(false);
            });
    }, []);
    return (
        <VisitorContext.Provider value={{ visitorId, isLoading }}>
            {children}
        </VisitorContext.Provider>
    )
}

export default VisitorContextProvider;

export function useVisitor() {
    const context = useContext(VisitorContext);
    if (!context) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}