import type { AnyObject, ObjectSchema } from "yup";

export type FormFieldType =
    | "text"
    | "email"
    | "password"
    | "textarea"
    | "number"
    | "checkbox"
    | "radio"
    | "select"
    | "search"
    | "phone"
    | "file";

export type FormFieldOption = {
    value: string | number;
    label: string;
};

export type FieldCondition<TValues extends AnyObject> = {
    field: keyof TValues & string;
    equals: unknown;
};

export type FormField<TValues extends AnyObject = AnyObject> = {
    name: keyof TValues & string;
    label?: string;
    type: FormFieldType;
    placeholder?: string;
    options?: ReadonlyArray<FormFieldOption>;
    readonly?: boolean;
    multiple?: boolean;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: {
        value: RegExp;
        message: string;
    };
    visibleWhen?: FieldCondition<TValues>;
    requiredWhen?: FieldCondition<TValues>;
};

export type FormSchema<TValues extends AnyObject = AnyObject> = {
    title?: string;
    submitLabel: string;
    method?: "POST" | "PUT" | "PATCH";
    validateBeforeSubmit?: boolean;
    initialValues: TValues;
    validationSchema?: ObjectSchema<TValues>;
    fields: ReadonlyArray<FormField<TValues>>;
};
