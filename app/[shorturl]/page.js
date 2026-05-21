import { redirect } from "next/navigation";
import clientPromise from "../db/mongodb";

export default async function Page({ params }) {
    const shorturl = params.shorturl;

    const client = await clientPromise;
    const db = client.db("BITLINKS");
    const collection = db.collection("url");

    const doc = await collection.findOne({ shorturl: shorturl });

    if (doc) {
        // Check if link has expired
        if (doc.expiresAt && new Date(doc.expiresAt) < new Date()) {
            // Link has expired — redirect to expired page
            redirect(`/expired?alias=${encodeURIComponent(shorturl)}`);
        }

        await collection.updateOne(
            { shorturl: shorturl },
            { $inc: { clicks: 1 } }
        );
        redirect(doc.url);
    } else {
        redirect(process.env.NEXT_PUBLIC_URL);
    }
}
