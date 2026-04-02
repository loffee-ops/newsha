import { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store";

import {
    clearSearchResults,
    closeSearch,
    searchProducts,
    selectSearchQuery,
    setSearchQuery,
} from "@/features/search/model";
import { SearchBar } from "@/features/search/ui/SearchBar";

import { HeaderSearchRoot, HeaderSearchOverlay, HeaderSearchInner } from "./HeaderSearch.styled";

export function HeaderSearch() {
    const dispatch = useAppDispatch();
    const query = useAppSelector(selectSearchQuery);
    const blurTimeoutRef = useRef<number | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        const trimmed = query.trim();

        if (!trimmed) {
            dispatch(clearSearchResults());
            return;
        }

        const timeoutId = window.setTimeout(() => {
            void dispatch(searchProducts({ query: trimmed }));
        }, 300);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [dispatch, query]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                dispatch(closeSearch());
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [dispatch]);

    useEffect(() => {
        return () => {
            if (blurTimeoutRef.current !== null) {
                window.clearTimeout(blurTimeoutRef.current);
            }
        };
    }, []);

    const handleBlur = () => {
        blurTimeoutRef.current = window.setTimeout(() => {
            dispatch(closeSearch());
        }, 150);
    };

    const handleOverlayClick = () => {
        if (blurTimeoutRef.current !== null) {
            window.clearTimeout(blurTimeoutRef.current);
        }

        dispatch(closeSearch());
    };

    return (
        <HeaderSearchRoot>
            <HeaderSearchOverlay onClick={handleOverlayClick} />

            <HeaderSearchInner>
                <SearchBar
                    ref={inputRef}
                    value={query}
                    onChange={(value) => dispatch(setSearchQuery(value))}
                    onBlur={handleBlur}
                    placeholder="Пошук товарів"
                />
            </HeaderSearchInner>
        </HeaderSearchRoot>
    );
}
