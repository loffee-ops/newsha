import { LikeIcon } from "./LikeIcon";
import {
    StyledLikeButton,
    StyledLikeCount,
    StyledLikeLabel,
    StyledLikeText,
} from "./LikeButton.styled";
import type { LikeButtonProps } from "./types";

export const LikeButton = ({
    isLiked = false,
    likesCount = 0,
    showCount = true,
    type = "button",
    icon,
    ...props
}: LikeButtonProps) => {
    return (
        <StyledLikeButton type={type} $isLiked={isLiked} {...props}>
            <StyledLikeLabel>
                {icon ?? <LikeIcon />}
                <StyledLikeText>Likes</StyledLikeText>
            </StyledLikeLabel>

            {showCount ? (
                <>
                    <StyledLikeCount className="one">{likesCount}</StyledLikeCount>
                    <StyledLikeCount className="two">
                        {likesCount + (isLiked ? 1 : 0)}
                    </StyledLikeCount>
                </>
            ) : null}
        </StyledLikeButton>
    );
};
