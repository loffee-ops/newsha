import { ErrorMessage } from "formik";
import * as S from "./FieldError.styled";

type FieldErrorProps = {
    name: string;
};

export function FieldError({ name }: FieldErrorProps) {
    return (
        <ErrorMessage name={name}>
            {(msg) => (msg ? <S.ErrorText>{msg}</S.ErrorText> : null)}
        </ErrorMessage>
    );
}
