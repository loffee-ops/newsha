import styled, { css, keyframes } from "styled-components";

const enlarge = keyframes`
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1.2);
  }
`;

export const StyledLikeButton = styled.button<{ $isLiked: boolean }>`
    position: relative;
    cursor: pointer;
    display: flex;
    height: 48px;
    width: 136px;
    border-radius: 16px;
    border: none;
    background-color: #1d1d1d;
    overflow: hidden;
    box-shadow:
        inset -2px -2px 5px rgba(255, 255, 255, 0.2),
        inset 2px 2px 5px rgba(0, 0, 0, 0.1),
        4px 4px 10px rgba(0, 0, 0, 0.4),
        -2px -2px 8px rgba(255, 255, 255, 0.1);

    .like-icon {
        fill: #505050;
        height: 28px;
        width: 28px;
    }

    ${({ $isLiked }) =>
        $isLiked &&
        css`
            .like-icon {
                fill: #fc4e4e;
                animation: ${enlarge} 0.2s ease-out 1;
                transition: all 0.2s ease-out;
            }

            .two {
                transform: translateX(0);
                color: #fcfcfc;
            }

            .one {
                transform: translateY(-40px);
            }
        `}
`;

export const StyledLikeLabel = styled.span`
    width: 70%;
    height: 100%;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: space-evenly;
`;

export const StyledLikeText = styled.span`
    color: #fcfcfc;
    font-size: 16px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const StyledLikeCount = styled.span`
    position: absolute;
    right: 0;
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #717070;
    font-size: 16px;
    border-left: 2px solid #4e4e4e;
    transition: all 0.5s ease-out;

    &.two {
        transform: translateY(40px);
    }
`;
