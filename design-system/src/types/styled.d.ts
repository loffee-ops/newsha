import "styled-components";
import type { AppTheme } from "@ds/theme";

declare module "styled-components" {
    export interface DefaultTheme extends AppTheme {}
}
