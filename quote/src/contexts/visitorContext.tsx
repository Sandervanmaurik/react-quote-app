import { createContext, useContext, useEffect, useState } from 'react';
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import React from 'react';

type ContextType = {
    visitorId: string,
    visitorLoading: boolean
}

const VisitorContext = createContext<ContextType>({visitorId: "", visitorLoading: true});


const VisitorContextProvider = ({ children }: any) => {
    const [visitorId, setVisitorId] = useState<string>("");
    const [visitorLoading, setVisitorLoading] = useState(true);

    useEffect(() => {
        // Get visitor id on first render
        FingerprintJS.load()
            .then((fp) => fp.get())
            .then((result) => {
                setVisitorId(prev => result.visitorId);
                setVisitorLoading(false);
            });
    }, []);
    return (
        <VisitorContext.Provider value={{ visitorId, visitorLoading }}>
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