import { useEffect } from "react";

import type { SeoMeta } from "@/app/seo/types";
import { buildOpenGraph } from "@/app/seo/builders";
import { setMeta, setLink } from "@/app/seo/lib";

export function SeoHead({ meta }: { meta: SeoMeta }) {
    const { title, description, canonical, image, noIndex } = meta;

    useEffect(() => {
        const og = buildOpenGraph(
            {
                title,
                description,
                canonical,
                ...(image && { image }),
                ...(noIndex !== undefined && { noIndex }),
            },
            window.location.origin,
        );

        document.title = title;

        setMeta("description", description);

        setMeta("og:title", og.title);
        setMeta("og:description", og.description);
        setMeta("og:url", og.url);
        if (og.image) setMeta("og:image", og.image);

        setLink("canonical", canonical);

        setMeta("robots", noIndex ? "noindex,nofollow" : "index,follow");
    }, [title, description, canonical, image, noIndex]);

    return null;
}
