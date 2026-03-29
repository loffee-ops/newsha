import { StyledLoader, StyledLoaderBar } from "./Loader.styled";
import type { LoaderProps } from "./types";

export const Loader = ({ size = "md", fullScreen = false, className, ...props }: LoaderProps) => {
    return (
        <StyledLoader className={className} $size={size} $fullScreen={fullScreen} {...props}>
            <StyledLoaderBar />
            <StyledLoaderBar />
            <StyledLoaderBar />
        </StyledLoader>
    );
};
