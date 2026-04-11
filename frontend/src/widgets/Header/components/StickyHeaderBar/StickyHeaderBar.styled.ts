import styled from "styled-components";
import { GlassPill } from "@ds/ui/GlassPill/GlassPill";

export const StickyHeaderBarRoot = styled.div`
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
`;

export const StickyHeaderBarInner = styled.div`
    padding: 0 12px;
`;

export const StickyHeaderGlass = styled(GlassPill).attrs({
    width: "100%",
    minHeight: "72px",
    padding: "0 6px",
    radius: "999px",
    display: "flex",
    justify: "flex-start",
})`
    position: relative;
`;

export const StickyHeaderContent = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
