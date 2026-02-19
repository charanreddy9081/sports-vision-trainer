# MongoDB Replica Set Setup

Prisma needs MongoDB to run as a **replica set** for transactions. Use one of these methods:

---

## Method 1: Automated Script (Windows)

**Run PowerShell as Administrator**, then:

```powershell
cd "C:\Users\chara\Downloads\website 2"
.\setup-mongodb-replicaset.ps1
```

---

## Method 2: Manual Steps (Windows)

### 1. Find MongoDB config

Check: `C:\Program Files\MongoDB\Server\<version>\bin\mongod.cfg`

### 2. Edit config

Add this section to `mongod.cfg`:

```yaml
replication:
  replSetName: rs0
```

### 3. Restart MongoDB

```powershell
net stop MongoDB
net start MongoDB
```

### 4. Initialize replica set

```powershell
mongosh --eval "rs.initiate()"
```

### 5. Update backend .env

```
DATABASE_URL="mongodb://localhost:27017/sports_vision_trainer?replicaSet=rs0"
```

### 6. Restart backend

```powershell
cd backend
npm run dev
```

---

## Method 3: MongoDB Atlas (Cloud)

Atlas runs as a replica set by default. No setup needed.

1. Create free cluster at https://mongodb.com/cloud/atlas
2. Get connection string
3. Set in `backend/.env`:

   ```
   DATABASE_URL="mongodb+srv://user:pass@cluster.xxx.mongodb.net/sports_vision_trainer?retryWrites=true&w=majority"
   ```

---

## Verify

```powershell
mongosh
rs.status()
```

You should see `"stateStr": "PRIMARY"` when it's ready.
