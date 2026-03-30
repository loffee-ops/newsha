import { useAppDispatch, useAppSelector } from "@/app/store";
import { openCart } from "@/features/cart/model/cart-ui.slice";
import { selectCartCount } from "@/features/cart/model/cart.selectors";

import { CartButton } from "./CartButton";

type HeaderCartButtonProps = {
    className?: string;
};

export function HeaderCartButton({ className }: HeaderCartButtonProps) {
    const dispatch = useAppDispatch();
    const count = useAppSelector(selectCartCount);

    const handleClick = () => {
        dispatch(openCart());
    };

    return (
        <CartButton
            count={Number(count)}
            onClick={handleClick}
            {...(className ? { className } : {})}
        />
    );
}
