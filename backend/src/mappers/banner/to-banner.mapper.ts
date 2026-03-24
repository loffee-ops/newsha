import type { BannerEntity } from "@shared/domain/banner";
import type { BannerDTO } from "@shared/contracts/banner";

export function toBannerDTO(entity: BannerEntity): BannerDTO {
    return {
        id: entity.id,
        placement: entity.placement,
        variant: entity.variant,
        image: entity.image,
        link: entity.link,
        alt: entity.alt,
        title: entity.title,
        subTitle: entity.subTitle,
        buttonText: entity.buttonText,
    };
}
