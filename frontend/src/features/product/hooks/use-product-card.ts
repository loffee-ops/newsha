import { useCallback, useMemo, useRef, useState, useEffect } from "react";

import { useAppDispatch } from "@/app/store/hooks";

import type { ProductPreview, ProductVolumeOption } from "@/entities/product/types";

import { USE_PRODUCT_CARD_TEXT } from "@/entities/product/config";
import { openCart } from "@/features/cart/model";
import { useCartActions } from "@/features/cart/hooks";
import { useWishlist } from "@/features/wishlist/hooks";

import { asQuantity } from "@shared/primitives";
import { useToast } from "@design-system/ui/Toast/hooks";
import { animateFlyToCart } from "@/features/cart/lib";

export function useProductCard(product: ProductPreview) {
    const dispatch = useAppDispatch();
    const cart = useCartActions();
    const toast = useToast();
    const wishlist = useWishlist();

    const imgRef = useRef<HTMLImageElement | null>(null);
    const qtyRef = useRef<HTMLSpanElement | null>(null);

    const volumes = useMemo<readonly ProductVolumeOption[]>(
        () => product.volumes ?? [],
        [product.volumes],
    );

    const defaultVolumeValue = useMemo<ProductVolumeOption["value"] | null>(() => {
        if (!volumes.length) return null;
        return volumes[0].value;
    }, [volumes]);

    const [selectedValue, setSelectedValue] = useState<ProductVolumeOption["value"] | null>(
        defaultVolumeValue,
    );

    useEffect(() => {
        setSelectedValue(defaultVolumeValue);
    }, [defaultVolumeValue]);

    const [qty, setQty] = useState(1);
    const safeQty = Math.max(1, qty);

    const selectedVolume = useMemo(
        () => volumes.find((v) => v.value === selectedValue) ?? null,
        [volumes, selectedValue],
    );

    const unitPrice = selectedVolume?.price ?? product.price ?? 0;
    const totalPrice = unitPrice * safeQty;

    const currentImage = selectedVolume?.image ?? product.image ?? "";

    const canBuy = useMemo(() => {
        if (!volumes.length) return true;
        if (!selectedVolume) return false;

        return selectedVolume.stock == null || selectedVolume.stock > 0;
    }, [volumes, selectedVolume]);

    const handleSelectVolume = useCallback((value: ProductVolumeOption["value"]) => {
        setSelectedValue(value);
        setQty(1);
    }, []);

    const handleIncrease = useCallback(() => {
        setQty((q) => q + 1);
    }, []);

    const handleDecrease = useCallback(() => {
        setQty((q) => Math.max(1, q - 1));
    }, []);

    const handleToggleWishlist = useCallback(() => {
        void wishlist.toggle(product.id);
    }, [wishlist, product.id]);

    const handleBuy = useCallback(() => {
        if (!canBuy || !selectedVolume) return;

        if (imgRef.current) {
            animateFlyToCart(imgRef.current);
        }

        void cart.add({
            productId: product.id,
            categoryId: product.categoryId,
            volume: selectedVolume.value,
            qty: asQuantity(safeQty),
        });

        dispatch(openCart());
        toast.success(USE_PRODUCT_CARD_TEXT.ADDED_TO_CART);
    }, [canBuy, selectedVolume, safeQty, product.id, product.categoryId, cart, dispatch, toast]);

    return {
        imgRef,
        qtyRef,
        volumes,
        selectedValue,
        selected: selectedVolume,
        qty: safeQty,
        currentImage,
        totalPrice,
        canBuy,
        productRating: product.rating ?? 0,
        productReviewsCount: product.reviewCount ?? 0,
        isWishlisted: wishlist.isInWishlist(product.id),
        onToggleWishlist: handleToggleWishlist,
        onSelectVolume: handleSelectVolume,
        onIncrease: handleIncrease,
        onDecrease: handleDecrease,
        onBuy: handleBuy,
    };
}
