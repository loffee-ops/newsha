import { asID } from "@shared/primitives";
import type { User } from "@shared/domain/user";

import type { UserDoc } from "@/models";

export function toUser(doc: UserDoc): User {
    return {
        id: asID(doc._id.toString()),
        name: doc.name,
        email: doc.email ?? undefined,
        avatar: doc.avatar ?? undefined,
        role: doc.role,
    };
}

export function toUsers(docs: readonly UserDoc[]): User[] {
    return docs.map(toUser);
}
