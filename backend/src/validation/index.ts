export { validateLogin, validateRegister } from "./auth.validation";
export { validateUserId, validateUserRole } from "./user.validation";
export { validateAddToCart, validateRemoveFromCart } from "./cart.validation";
export {
    validateBannerId,
    validateUploadBanner,
    validateUpdateBanner,
    validatePlacementQuery,
} from "./banner.validation";
export {
    validateCategoryId,
    validateCreateCategory,
    validateUpdateCategory,
} from "./category.validation";
export {
    validateOrderId,
    validateOrderStatus,
    validateCheckout,
    validateSetOrderStatus,
    validateAdminOrderFilters,
    validateSetPaid,
} from "./order.validation";
export {
    validateReviewId,
    validateProductId,
    validateReviewStatus,
    validateCreateReview,
} from "./review.validation";

export type { UploadBannerInput, UpdateBannerInput } from "./banner.validation";
export type { CreateCategoryInput, UpdateCategoryInput } from "./category.validation";
export type { CreateReviewInput } from "./review.validation";
