import type { BannerEntity } from "@shared/domain/banner";
import { asID, asISODate, asSlug } from "@shared/primitives";

import type { BannerPersistence } from "./banner.persistence";

export function toBannerEntity(doc: BannerPersistence): BannerEntity {
    return {
        id: asID(doc._id.toString()),
        placement: doc.placement,
        variant: doc.variant,
        image: doc.image,
        order: doc.order,
        link: doc.link ? asSlug(doc.link) : undefined,
        isActive: doc.isActive,
        startsAt: doc.startsAt ? asISODate(doc.startsAt.toISOString()) : undefined,
        endsAt: doc.endsAt ? asISODate(doc.endsAt.toISOString()) : undefined,
        alt: doc.alt ?? undefined,
        title: doc.title ?? undefined,
        subTitle: doc.subTitle ?? undefined,
        buttonText: doc.buttonText ?? undefined,
    };
}
