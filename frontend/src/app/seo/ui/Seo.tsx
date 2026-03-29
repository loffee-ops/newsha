import type { SeoMeta } from "@/app/seo/types";

import { SeoHead } from "./SeoHead";

export function Seo({ meta }: { meta: SeoMeta }) {
    return <SeoHead meta={meta} />;
}
