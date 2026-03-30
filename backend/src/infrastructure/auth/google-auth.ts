import { OAuth2Client } from "google-auth-library";

import { env } from "@/config/env";

import { AuthErrors } from "@/errors";

const client = new OAuth2Client(env.GOOGLE_CLIENT_ID);

export type GoogleProfile = {
    providerId: string;
    email: string;
    name: string;
    picture?: string;
};

export async function verifyGoogleIdToken(idToken: string): Promise<GoogleProfile> {
    let ticket;

    try {
        ticket = await client.verifyIdToken({
            idToken,
            audience: env.GOOGLE_CLIENT_ID,
        });
    } catch {
        throw AuthErrors.googleTokenInvalid();
    }

    const payload = ticket.getPayload();

    if (!payload) {
        throw AuthErrors.googleTokenInvalid();
    }

    if (!payload.sub || !payload.email) {
        throw AuthErrors.googleTokenPayloadInvalid();
    }

    if (!payload.email_verified) {
        throw AuthErrors.googleEmailNotVerified();
    }

    return {
        providerId: payload.sub,
        email: payload.email,
        name: payload.name ?? payload.email,
        picture: payload.picture ?? undefined,
    };
}
