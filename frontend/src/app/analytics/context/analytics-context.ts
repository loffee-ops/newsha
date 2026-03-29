import { createContext } from "react";

import type { AnalyticsSDK } from "@/app/analytics/types";

export const AnalyticsContext = createContext<AnalyticsSDK | null>(null);
