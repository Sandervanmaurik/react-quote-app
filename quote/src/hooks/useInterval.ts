import { MutableRefObject, useCallback, useEffect, useRef } from "react";

const useInterval = (callback: any, interval: any) => {
    const callbackRef: MutableRefObject<any> = useRef(callback);
    const intervalRef: MutableRefObject<any> = useRef();
    // After every render, save the latest callback into our ref.
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback])

    const set = useCallback(() => {
        intervalRef.current = setInterval(() => callbackRef.current(), interval)
    }, [interval]);

    const clear = useCallback(() => {
        intervalRef.current && clearTimeout(intervalRef.current);
    }, []);

    useEffect(() => {
        set();
        return clear;
    }, [interval, set, clear])

    const reset = useCallback(() => {
        clear();
        set();
    }, [clear, set]);

    return { reset, clear }
};

export default useInterval;