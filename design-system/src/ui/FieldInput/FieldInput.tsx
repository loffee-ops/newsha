import { useField } from "formik";

import { Input } from "@ds/ui/Input";
import type { InputProps } from "@ds/ui/Input/types";

type FieldInputProps = InputProps & {
    name: string;
};

export function FieldInput({ name, label, ...props }: FieldInputProps) {
    const [field, meta] = useField(name);

    const error = meta.touched ? meta.error : undefined;

    return (
        <Input
            {...field}
            {...props}
            {...(label !== undefined ? { label } : {})}
            {...(error !== undefined ? { error } : {})}
        />
    );
}
