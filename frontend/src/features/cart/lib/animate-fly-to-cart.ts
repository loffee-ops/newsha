const flyingImages = new WeakSet<HTMLImageElement>();

export function animateFlyToCart(sourceImg: HTMLImageElement | null) {
    if (!sourceImg) return;
    if (typeof window === "undefined") return;

    if (flyingImages.has(sourceImg)) return;
    flyingImages.add(sourceImg);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        flyingImages.delete(sourceImg);
        return;
    }

    const cartEl = document.querySelector<HTMLElement>("[data-cart-icon]");
    if (!cartEl) {
        flyingImages.delete(sourceImg);
        return;
    }

    const imgRect = sourceImg.getBoundingClientRect();
    const cartRect = cartEl.getBoundingClientRect();

    const clone = sourceImg.cloneNode(true) as HTMLImageElement;

    Object.assign(clone.style, {
        position: "fixed",
        left: `${imgRect.left}px`,
        top: `${imgRect.top}px`,
        width: `${imgRect.width}px`,
        height: `${imgRect.height}px`,
        objectFit: "cover",
        borderRadius: "16px",
        zIndex: "var(--z-fly-to-cart, 3000)",
        pointerEvents: "none",
        opacity: "1",
        willChange: "transform, opacity",
        transition: "transform 0.7s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.7s ease",
        transformOrigin: "center center",
    } satisfies Partial<CSSStyleDeclaration>);

    document.body.appendChild(clone);

    const translateX = cartRect.left + cartRect.width / 2 - (imgRect.left + imgRect.width / 2);
    const translateY = cartRect.top + cartRect.height / 2 - (imgRect.top + imgRect.height / 2);

    const cleanup = () => {
        flyingImages.delete(sourceImg);
        clone.remove();
    };

    const timeoutId = window.setTimeout(cleanup, 900);

    requestAnimationFrame(() => {
        clone.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(0.2)`;
        clone.style.opacity = "0.1";
    });

    clone.addEventListener(
        "transitionend",
        () => {
            window.clearTimeout(timeoutId);
            cleanup();
        },
        { once: true },
    );
}
