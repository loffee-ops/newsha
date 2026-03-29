export { getCart, addToCart, removeFromCart, clearCart } from "./cart.controller";
export { checkout, getMyOrders } from "./order.controller";
export { addRecentlyViewed, getRecentlyViewed } from "./recently-viewed.controller";
export { getMeHandler, updateMeHandler, changePasswordHandler } from "./user.controller";
export {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
} from "./wishlist.controller";
