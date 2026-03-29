import { createContext } from "react";

import type { AnalyticsSDK } from "@/entities/analytics/types";

export const AnalyticsContext = createContext<AnalyticsSDK | null>(null);
