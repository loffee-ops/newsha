import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

import { asID } from "@shared/primitives";

import { JWT_SECRET, ACCESS_TOKEN_EXPIRES_IN } from "@/config";
import { UserModel } from "@/models/user.model";
import { AuthErrors } from "@/errors";
import { verifyGoogleIdToken } from "@/infrastructure/auth";

function signToken(userId: string) {
    const expiresIn: SignOptions["expiresIn"] = ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"];

    return jwt.sign({ userId }, JWT_SECRET, {
        expiresIn,
    });
}

export async function loginWithGoogle(idToken: string) {
    if (!idToken?.trim()) {
        throw AuthErrors.unauthorized("Missing Google token");
    }

    const profile = await verifyGoogleIdToken(idToken);

    if (!profile.email) {
        throw AuthErrors.unauthorized("Google email missing");
    }

    let user = await UserModel.findOne({ email: profile.email });

    if (!user) {
        user = await UserModel.create({
            name: profile.name?.trim() || profile.email,
            email: profile.email,
            avatar: profile.picture ?? undefined,
            passwordHash: "GOOGLE_AUTH",
        });
    } else if (profile.picture && user.avatar !== profile.picture) {
        user.avatar = profile.picture;
        await user.save();
    }

    const token = signToken(user._id.toString());

    return {
        user: {
            id: asID(user._id.toString()),
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
        },
        token,
    };
}
