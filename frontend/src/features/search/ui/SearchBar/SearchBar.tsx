import { forwardRef, type ChangeEvent } from "react";
import { useTheme } from "styled-components";

import type { AppTheme } from "@ds/theme";

import type { SearchBarProps } from "./types";
import {
    SearchBarRoot,
    SearchBarInputWrap,
    SearchBarIcon,
    SearchBarInput,
} from "./SearchBar.styled";

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(function SearchBar(
    { value, onChange, onBlur, className, placeholder = "Пошук", type = "search", ...props },
    ref,
) {
    const theme = useTheme() as AppTheme;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <SearchBarRoot {...(className ? { className } : {})}>
            <SearchBarInputWrap>
                <SearchBarIcon src={theme.assets.searchIcon} alt="" aria-hidden="true" />
                <SearchBarInput
                    ref={ref}
                    type={type}
                    value={value}
                    onChange={handleChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    {...props}
                />
            </SearchBarInputWrap>
        </SearchBarRoot>
    );
});
