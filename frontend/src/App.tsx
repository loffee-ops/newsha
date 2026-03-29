import { useEffect } from "react";

import { AppRouter } from "@/app/routes/AppRouter";

export function App() {
    useEffect(() => {
        const loader = document.getElementById("startup-loader");

        if (!loader) return;

        requestAnimationFrame(() => {
            loader.classList.add("is-hidden");

            window.setTimeout(() => {
                loader.remove();
            }, 350);
        });
    }, []);

    return <AppRouter />;
}

export default App;
