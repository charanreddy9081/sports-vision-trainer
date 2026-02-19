import { MongoClient, ObjectId } from 'mongodb';

const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/sports_vision_trainer';

let client: MongoClient | null = null;

export async function getMongoDb() {
  if (!client) {
    client = new MongoClient(url);
    await client.connect();
  }
  const match = url.match(/\/([^/?]+)(\?|$)/);
  const dbName = (match && match[1]) || 'sports_vision_trainer';
  const db = client.db(dbName);
  return db;
}

export { ObjectId };

/** Creates user and leaderboard via native driver (no Prisma transaction/replica set needed). Returns user info. */
export async function createUserAndLeaderboard(user: {
  name: string;
  email: string;
  password: string;
}, totalScore = 0) {
  const db = await getMongoDb();
  const userId = new ObjectId();
  const now = new Date();

  const userDoc = {
    _id: userId,
    name: user.name,
    email: user.email,
    password: user.password,
    role: 'USER',
    subscription: 'FREE',
    createdAt: now,
    updatedAt: now,
  };

  const leaderboardDoc = {
    _id: new ObjectId(),
    userId,
    totalScore,
    updatedAt: now,
  };

  await db.collection('User').insertOne(userDoc);
  await db.collection('Leaderboard').insertOne(leaderboardDoc);

  return {
    id: userId.toString(),
    name: userDoc.name,
    email: userDoc.email,
    role: userDoc.role as string,
    subscription: userDoc.subscription as string,
  };
}

/** Insert a session document (for signup). */
export async function insertSession(userId: string, token: string, expiresAt: Date) {
  const db = await getMongoDb();
  await db.collection('Session').insertOne({
    _id: new ObjectId(),
    userId: new ObjectId(userId),
    token,
    expiresAt,
    createdAt: new Date(),
  });
}

const MODULE_TYPES = ['REACTION', 'TRACKING', 'COLOR_MATCH', 'TARGET_HIT'] as const;

/** Create a training session via native driver (avoids Prisma transaction requirement). */
export async function createTrainingSession(doc: {
  userId: string;
  moduleType: typeof MODULE_TYPES[number];
  score: number;
  accuracy: number;
  reactionTime?: number | null;
  duration: number;
}) {
  const db = await getMongoDb();
  const now = new Date();
  const sessionDoc = {
    _id: new ObjectId(),
    userId: new ObjectId(doc.userId),
    moduleType: doc.moduleType,
    score: doc.score,
    accuracy: doc.accuracy,
    reactionTime: doc.reactionTime ?? null,
    duration: doc.duration,
    createdAt: now,
  };
  await db.collection('TrainingSession').insertOne(sessionDoc);
  return { ...sessionDoc, id: sessionDoc._id.toString() };
}

/** Update leaderboard totalScore for a user (upsert). */
export async function updateLeaderboardScore(userId: string, addScore: number) {
  const db = await getMongoDb();
  const uid = new ObjectId(userId);
  const existing = await db.collection('Leaderboard').findOne({ userId: uid });
  const now = new Date();
  if (existing) {
    await db.collection('Leaderboard').updateOne(
      { userId: uid },
      { $set: { totalScore: (existing.totalScore as number) + addScore, updatedAt: now } }
    );
  } else {
    await db.collection('Leaderboard').insertOne({
      _id: new ObjectId(),
      userId: uid,
      totalScore: addScore,
      updatedAt: now,
    });
  }
}

/** Delete a session by userId and token (for logout). */
export async function deleteSession(userId: string, token: string) {
  const db = await getMongoDb();
  await db.collection('Session').deleteMany({
    userId: new ObjectId(userId),
    token,
  });
}
