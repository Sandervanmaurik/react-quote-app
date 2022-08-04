import { EffectCallback, MutableRefObject, useCallback, useEffect, useRef } from "react";

export default function useTimeout(callback: EffectCallback, delay: number) {
    const callbackRef: MutableRefObject<EffectCallback> = useRef(callback);
    const timeoutRef: MutableRefObject<any> = useRef();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback])

    const set = useCallback(() => {
        timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
    }, [delay]);

    const clear = useCallback(() => {
        timeoutRef.current && clearTimeout(timeoutRef.current);
    }, []);

    useEffect(() => {
        set();
        return clear;
    }, [delay, set, clear])

    const reset = useCallback(() => {
        clear();
        set();
    }, [clear, set]);

    return { reset, clear }
}