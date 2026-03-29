export type TabSize = "sm" | "md" | "lg";
export type TabVariant = "underline" | "outline" | "solid" | "ghost";
export type TabOrientation = "horizontal" | "vertical";
export type TabAnimation = "fade" | "slide" | "none";

export type TabItem = {
    id: string;
    label: string;
    value: string;
    icon?: string;
    disabled?: boolean;
    hidden?: boolean;
    countBadge?: number;
    meta?: Record<string, unknown>;
};

export type TabsProps = {
    tabs: TabItem[];
    active: string;
    size?: TabSize;
    variant?: TabVariant;
    orientation?: TabOrientation;
    animation?: TabAnimation;
    fullWidth?: boolean;
    disableInactive?: boolean;
    keepMounted?: boolean;
    onChange?: (value: string) => void;
};

export type TabContent = {
    value: string;
    content: React.ReactNode;
    lazy?: boolean;
};
