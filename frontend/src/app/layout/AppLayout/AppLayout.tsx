import { Outlet } from "react-router-dom";

import { useBreadcrumbs } from "@/app/navigation/hooks";
import { JsonLd } from "@/app/seo/ui";
import { PageContainer } from "@design-system/layout";
import { Header } from "@/widgets/Header/Header";

import { LayoutWrapper, Content } from "./AppLayout.styled";

export function AppLayout() {
    const { schema } = useBreadcrumbs();

    return (
        <LayoutWrapper>
            <JsonLd data={schema} />
            <Header />

            <Content>
                <PageContainer>
                    <Outlet />
                </PageContainer>
            </Content>
        </LayoutWrapper>
    );
}
