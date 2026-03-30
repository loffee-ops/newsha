export const SHUTDOWN_TIMEOUT_MS = 10_000;

export const PROCESS_SIGNALS = {
    sigint: "SIGINT",
    sigterm: "SIGTERM",
    unhandledRejection: "unhandledRejection",
    uncaughtException: "uncaughtException",
} as const;

export const SERVER_LOG_MESSAGES = {
    shutdownStarted: "Shutdown started",
    forcedShutdownByTimeout: "Forced shutdown by timeout",
    shutdownCompleted: "Shutdown completed",
    shutdownError: "Shutdown error",
    unhandledPromiseRejection: "Unhandled promise rejection",
    uncaughtException: "Uncaught exception",
    startingServer: "Starting server",
    mongoConnected: "Mongo connected",
    cloudinaryAvailable: "Cloudinary available",
    cloudinaryUnavailable: "Cloudinary unavailable",
    googleAuthConfigLoaded: "Google auth config loaded",
    serverStarted: "Server started",
    serverStartupError: "Server startup error",
} as const;
