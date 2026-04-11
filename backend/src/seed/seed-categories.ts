import "dotenv/config";
import mongoose from "mongoose";
import { CategoryModel } from "@/models";
import { ROOT_CATEGORIES, CHILD_CATEGORIES } from "@/seed/category.seed-data";

async function seedCategories(): Promise<void> {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(mongoUri);
    console.log("Mongo connected");

    try {
        const rootIdBySlug = new Map<string, string>();

        for (const rootCategory of ROOT_CATEGORIES) {
            const doc = await CategoryModel.findOneAndUpdate(
                { slug: rootCategory.slug },
                { $set: rootCategory },
                {
                    upsert: true,
                    returnDocument: "after",
                    setDefaultsOnInsert: true,
                },
            );

            rootIdBySlug.set(rootCategory.slug, String(doc._id));
            console.log(`Upserted root category: ${rootCategory.slug}`);
        }

        for (const childCategory of CHILD_CATEGORIES) {
            const parentId = rootIdBySlug.get(childCategory.parentSlug);

            if (!parentId) {
                throw new Error(
                    `Parent category not found for child slug "${childCategory.slug}" with parent "${childCategory.parentSlug}"`,
                );
            }

            const { parentSlug, ...rest } = childCategory;

            await CategoryModel.findOneAndUpdate(
                { slug: childCategory.slug },
                {
                    $set: {
                        ...rest,
                        parentId,
                    },
                },
                {
                    upsert: true,
                    returnDocument: "after",
                    setDefaultsOnInsert: true,
                },
            );

            console.log(`Upserted child category: ${childCategory.slug}`);
        }

        console.log("Categories seed completed");
    } finally {
        await mongoose.disconnect();
        console.log("Mongo disconnected");
    }
}

void seedCategories();
