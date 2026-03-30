import type { ID } from "@shared/primitives";
import type { CurrentUser } from "@shared/domain/user";

import type { CartItem } from "@/entities/cart/types";

export type UserSession = {
    user: CurrentUser;
    cart: readonly CartItem[];
    wishlist: readonly ID[];
};
