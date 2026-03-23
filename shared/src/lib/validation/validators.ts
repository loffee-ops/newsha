import { emailRegex, phoneRegex, nameRegex } from "./regex";
import { PASSWORD_ERROR_CODES, type PasswordErrorCode } from "@shared/errors";

export function isValidEmail(value: string): boolean {
    return emailRegex.test(value.trim());
}

export function isValidPhone(value: string): boolean {
    return phoneRegex.test(value.trim());
}

export function isValidName(value: string): boolean {
    return nameRegex.test(value.trim());
}

export function getPasswordValidationError(value: string): PasswordErrorCode | null {
    const password = value.trim();

    if (!password) {
        return PASSWORD_ERROR_CODES.PASSWORD_REQUIRED;
    }

    if (password.length < 8) {
        return PASSWORD_ERROR_CODES.PASSWORD_TOO_SHORT;
    }

    if (!/[A-Za-z]/.test(password)) {
        return PASSWORD_ERROR_CODES.PASSWORD_LETTER_REQUIRED;
    }

    if (!/\d/.test(password)) {
        return PASSWORD_ERROR_CODES.PASSWORD_DIGIT_REQUIRED;
    }

    return null;
}

export function isValidPassword(value: string): boolean {
    return getPasswordValidationError(value) === null;
}
