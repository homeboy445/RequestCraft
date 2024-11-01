import { useState, SetStateAction } from "react";

export const getUseStateWrapper = (onStateChangeCallback: () => void) => {
    return <T,>(value: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
        const [state, stateUpdaterCb] = useState<T>(value);
        return [state, (args: SetStateAction<T>) => {
          onStateChangeCallback();
          stateUpdaterCb(args);
        }];
    }
}
