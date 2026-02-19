# Stop Running Servers

If you see file lock errors when running Prisma commands, the servers are still running.

## To Stop Servers:

1. **Find the terminal windows** where you started `npm run dev`
2. Press `Ctrl+C` in each terminal to stop the servers
3. Or close the terminal windows

## Then Run Setup Again:

```bash
cd backend
npx prisma generate
npx prisma db push
```

## Alternative - Kill Node Processes:

```powershell
# Kill all Node processes (WARNING: Closes all Node apps)
Get-Process node | Stop-Process -Force
```
