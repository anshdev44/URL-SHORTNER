import clientPromise from "../../db/mongodb"

export const dynamic = 'force-dynamic'

export async function POST(request) {
    try {
        const body = await request.json() 

        const client = await clientPromise;
    const db = client.db("BITLINKS")
    const collection = db.collection("url")

    
    if (!body.url) {
        return Response.json({ success: false, error: true, message: 'Please provide a URL' })
    }

   
    let shorturl = body.shorturl
    if (!shorturl || shorturl.trim() === '') {
        shorturl = generateAlias()
        // Make sure the generated alias doesn't already exist
        let exists = await collection.findOne({ shorturl })
        let attempts = 0
        while (exists && attempts < 5) {
            shorturl = generateAlias()
            exists = await collection.findOne({ shorturl })
            attempts++
        }
        if (exists) {
            return Response.json({ success: false, error: true, message: 'Could not generate a unique alias. Please try again.' })
        }
    } else {
       
        const aliasRegex = /^[a-zA-Z0-9_-]+$/
        if (!aliasRegex.test(shorturl)) {
            return Response.json({ success: false, error: true, message: 'Alias can only contain letters, numbers, hyphens, and underscores.' })
        }
        if (shorturl.length < 2 || shorturl.length > 50) {
            return Response.json({ success: false, error: true, message: 'Alias must be between 2 and 50 characters.' })
        }

        const doc = await collection.findOne({ shorturl })
        if (doc) {
            return Response.json({ success: false, error: true, message: 'URL already exists!' })
        }
    }

  
    let expiresAt = null
    if (body.expiresAt) {
        const expDate = new Date(body.expiresAt)
        if (isNaN(expDate.getTime())) {
            return Response.json({ success: false, error: true, message: 'Invalid expiration date.' })
        }
        if (expDate <= new Date()) {
            return Response.json({ success: false, error: true, message: 'Expiration date must be in the future.' })
        }
        expiresAt = expDate
    }

    await collection.insertOne({
        url: body.url,
        shorturl: shorturl,
        clicks: 0,
        createdAt: new Date(),
        expiresAt: expiresAt,
        creatorId: body.creatorId || null
    })

        return Response.json({ success: true, error: false, message: 'URL Generated Successfully', shorturl: shorturl })
    } catch (error) {
        console.error("API Error:", error);
        return Response.json({ success: false, error: true, message: 'Server Error: ' + error.message }, { status: 500 })
    }
}

function generateAlias() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}
