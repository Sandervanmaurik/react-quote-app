import { useState } from 'react';
export default function dataHook() {
    const [value, setValue] = useState();

    function toggleValue(value) {
        setValue(currentValue => {
            typeof value === "boolean" ? value : !currentvalue;
        });
    }
    return [value, toggleValue];
}