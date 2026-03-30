import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store";

import type { BurgerSection } from "@/features/burger/config";
import {
    selectIsBurgerOpen,
    selectBurgerExpanded,
    openBurger,
    closeBurger,
    toggleBurger,
    toggleExpanded,
} from "@/features/burger/model";

export function useBurger() {
    const dispatch = useAppDispatch();

    const isOpen = useAppSelector(selectIsBurgerOpen);
    const expanded = useAppSelector(selectBurgerExpanded);

    const open = useCallback(
        (section?: BurgerSection | null) => {
            dispatch(openBurger(section));
        },
        [dispatch],
    );

    const close = useCallback(() => {
        dispatch(closeBurger());
    }, [dispatch]);

    const toggle = useCallback(() => {
        dispatch(toggleBurger());
    }, [dispatch]);

    const toggleExpandedSection = useCallback(
        (section: BurgerSection) => {
            dispatch(toggleExpanded(section));
        },
        [dispatch],
    );

    return {
        isOpen,
        expanded,
        open,
        close,
        toggle,
        toggleExpanded: toggleExpandedSection,
    };
}
