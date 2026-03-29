import { useEffect } from "react";

type UseOnOpenParams = {
    isOpen: boolean;
    onOpen?: () => void;
};

export function useOnOpen({ isOpen, onOpen }: UseOnOpenParams) {
    useEffect(() => {
        if (!isOpen) return;
        onOpen?.();
    }, [isOpen, onOpen]);
}
