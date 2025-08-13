import { redirect } from "next/navigation";
import clientPromise from "../db/mongodb";

export default async function Page({ params }) {
    const shorturl = params.shorturl; // no await
    // console.log("shorturl param:", shorturl);

    const client = await clientPromise;
    const db = client.db("BITLINKS"); // case sensitive
    const collection = db.collection("url");

    const doc = await collection.findOne({ shorturl: shorturl });
    // console.log("doc found:", doc);

    if (doc) {
        redirect(doc.url);
    } else {
        redirect(process.env.NEXT_PUBLIC_URL);
    }
}
