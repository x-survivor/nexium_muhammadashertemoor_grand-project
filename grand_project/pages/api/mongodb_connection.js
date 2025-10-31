import { MongoClient, ServerApiVersion } from "mongodb";
import { NextAPiRequest, NextApiResponse } from "next";

if (!process.env.MONGODB_URI) {
  throw new Error("Mongo URI not found!");
}

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function getDB(dbName) {
  try {
    await client.connect();
    return client.db(dbName);
  } catch (err) {
    console.log(err);
  }
}

async function getText(fullText) {
  const db = await getDB("Blogs");
  if (db) return db.collection(fullText);

  return null;
}

export async function storeData(data) {
  const text = await getText("full_Text");
  const findExisting = await text.findOne({
    content: data.content,
  });
  if (!findExisting) {
    const result = await text.insertOne({
      content: data.content,
    });
    return {
      success: result.acknowledged,
      _id: result.insertedId,
    };
  }
  return findExisting;
}
