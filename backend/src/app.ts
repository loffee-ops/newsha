import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";

import { initSwagger } from "./docs/swagger";

import { CORS_ORIGINS } from "@/config";

import {
    productsRouter,
    productFiltersRouter,
    categoriesRouter,
    bannersRouter,
    bannerAdminRouter,
    reviewsRouter,
    authRouter,
    userRouter,
    cartRouter,
    orderRouter,
    wishlistRouter,
    orderAdminRouter,
    healthRouter,
    searchRouter,
    adminUsersRouter,
    recentlyViewedRouter,
    consultationRouter,
    analyticsRouter,
    analyticsAdminRouter,
    cooperationRouter,
    adminProductsRouter,
    adminCategoriesRouter,
    adminReviewsRouter,
} from "@/routes";

import {
    multerErrorHandler,
    errorMiddleware,
    requestContext,
    globalRateLimit,
    publicFormRateLimit,
    searchRateLimit,
} from "@/middleware";

import { httpLogger } from "@/infrastructure/logger";

export const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(compression());
app.use(
    cors({
        origin: CORS_ORIGINS,
        credentials: true,
    }),
);

app.use(globalRateLimit);

app.use(express.json());
app.use(cookieParser());
app.use(requestContext);
app.use(httpLogger);

app.use("/banners", express.static("public/banners"));
app.use("/api/products", productsRouter);
app.use("/api/product-filters", productFiltersRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/banners", bannersRouter);
app.use("/api/admin/banners", bannerAdminRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/auth", authRouter);
app.use("/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/admin/orders", orderAdminRouter);
app.use("/api/health", healthRouter);
app.use("/api/admin/users", adminUsersRouter);
app.use("/api/recently-viewed", recentlyViewedRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/admin/analytics", analyticsAdminRouter);
app.use("/api/search", searchRateLimit, searchRouter);
app.use("/api/consultations", publicFormRateLimit, consultationRouter);
app.use("/api/cooperation", publicFormRateLimit, cooperationRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/categories", adminCategoriesRouter);
app.use("/api/admin/reviews", adminReviewsRouter);

initSwagger(app);

app.get("/", (_req, res) => {
    res.send("Backend works");
});

app.use((_req, res) => {
    res.status(404).json({ message: "Not found" });
});

app.use(multerErrorHandler);
app.use(errorMiddleware);
