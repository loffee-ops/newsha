import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ $fullscreen: boolean }>`
    ${({ $fullscreen, theme }) =>
        $fullscreen
            ? css`
                  position: fixed;
                  inset: 0;
                  z-index: 9999;
                  display: grid;
                  place-items: center;
                  background: ${theme.colors.white};
              `
            : css`
                  width: 100%;
                  min-height: 100vh;
                  display: grid;
                  place-items: center;
                  background: ${theme.colors.white};
              `}
`;
