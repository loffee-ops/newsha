import { Outlet } from "react-router-dom";

import { useBreadcrumbs } from "@/app/navigation/hooks";
import { JsonLd } from "@/app/seo/ui";

import { PageContainer } from "@design-system/layout";

import { Breadcrumbs } from "@/widgets/Breadcrumbs";

import { LayoutWrapper, Content } from "./AppLayout.styled";

export function AppLayout() {
    const { breadcrumbs, schema } = useBreadcrumbs();

    return (
        <LayoutWrapper>
            <JsonLd data={schema} />

            <Content>
                <PageContainer>
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                    <Outlet />
                </PageContainer>
            </Content>
        </LayoutWrapper>
    );
}
