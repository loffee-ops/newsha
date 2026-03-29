export { authReducer, setAuth, clearAuth } from "./auth.slice";
export { authUIReducer, openLoginModal, openRegisterModal, closeAuthModal } from "./auth-ui.slice";

export {
    selectAuthState,
    selectAuthUser,
    selectAuthStatus,
    selectAuthError,
    selectSessionLoaded,
    selectUser,
    selectUserName,
    selectUserEmail,
    selectUserRole,
    selectIsAuthenticated,
    selectIsAdmin,
    selectIsGuestUser,
} from "./auth.selectors";

export { restoreSession, login, loginWithGoogle, register, logout } from "./auth.thunks";

export type { AuthState } from "./auth.slice";
export type { AuthModalMode } from "./auth-ui.slice";
