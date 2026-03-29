export type SegmentedOption = {
    value: string;
    label: string;
    disabled?: boolean;
};

export type SegmentedControlProps = {
    name: string;
    value: string;
    options: readonly SegmentedOption[];
    onChange: (value: string) => void;
    className?: string;
};
