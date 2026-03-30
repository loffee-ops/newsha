import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

import type { Breadcrumb } from "@shared/domain/breadcrumb";

import { Wrapper, List, Item, Separator } from "./Breadcrumbs.styled";

type Props = {
    breadcrumbs: Breadcrumb;
};

export function Breadcrumbs({ breadcrumbs }: Props) {
    const location = useLocation();

    if (location.pathname === "/") {
        return null;
    }

    const visibleItems = breadcrumbs.items.filter((item) => !item.hidden);

    if (visibleItems.length === 0) {
        return null;
    }

    return (
        <Wrapper aria-label="Хлібні крихти">
            <List>
                {visibleItems.map((item, index) => {
                    const isLast = index === visibleItems.length - 1;
                    const key = `${item.label}-${item.href ?? "active"}-${index}`;

                    let content: ReactNode;

                    if (item.linkType === "external" && item.href) {
                        content = (
                            <a href={item.href} target="_blank" rel="noopener noreferrer">
                                {item.label}
                            </a>
                        );
                    } else if (item.linkType === "anchor" && item.href) {
                        content = <a href={item.href}>{item.label}</a>;
                    } else if (item.href && !item.isActive) {
                        content = <Link to={item.href}>{item.label}</Link>;
                    } else {
                        content = item.label;
                    }

                    return (
                        <Item key={key} $active={Boolean(item.isActive)}>
                            {content}
                            {!isLast && <Separator>/</Separator>}
                        </Item>
                    );
                })}
            </List>
        </Wrapper>
    );
}
