# Vercel deployment checklist

- Push the repository to GitHub.
- In Vercel, import the repository and keep the project root at the repository root.
- Add `MONGO_URI`, `JWT_SECRET`, and `CLIENT_URL`.
- Deploy.
- Open `/api/health` on the deployed domain to verify the serverless API.
- Run the seed locally against the same MongoDB Atlas database before using the store:
  `npm run seed`
