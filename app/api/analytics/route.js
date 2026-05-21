import clientPromise from "../../db/mongodb"

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("BITLINKS")
        const collection = db.collection("url")

        const docs = await collection.find({}).sort({ clicks: -1 }).toArray()

        // Normalize old documents that may not have clicks/createdAt/expiresAt
        const data = docs.map(doc => ({
            url: doc.url,
            shorturl: doc.shorturl,
            clicks: doc.clicks || 0,
            createdAt: doc.createdAt || null,
            expiresAt: doc.expiresAt || null,
        }))

        return Response.json({ success: true, data })
    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 500 })
    }
}
