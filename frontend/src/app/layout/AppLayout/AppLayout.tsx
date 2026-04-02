import { Outlet } from "react-router-dom";
import { MobileActionDock } from "@/widgets/MobileActionDock";

import { useBreadcrumbs } from "@/app/navigation/hooks";
import { JsonLd } from "@/app/seo/ui";

import { PageContainer } from "@design-system/layout";
import { Header } from "@/widgets/Header";

import { Breadcrumbs } from "@/widgets/Breadcrumbs";

import { LayoutWrapper, Content } from "./AppLayout.styled";

export function AppLayout() {
    const { breadcrumbs, schema } = useBreadcrumbs();

    return (
        <LayoutWrapper>
            <JsonLd data={schema} />

            <Content>
                <Header />
                <PageContainer>
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                    <Outlet />
                </PageContainer>
                <MobileActionDock
                    onMenuClick={() => console.log("menu")}
                    onUserClick={() => console.log("user")}
                    onWishlistClick={() => console.log("wishlist")}
                />
            </Content>
        </LayoutWrapper>
    );
}
