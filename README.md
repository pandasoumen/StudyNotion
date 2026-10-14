# StudyNotion

StudyNotion is a React frontend with an Express/MongoDB API.

## Deploy

Deploy the frontend and API as separate services from this repository:

### Render API

Create a Render Blueprint from `render.yaml`, or create a Node web service with `SERVER` as its root directory, `npm ci` as its build command, and `npm start` as its start command. Set the backend environment variables in Render (never commit their values):

- `MONGODB_URL`, `JWT_SECRET`
- `MAIL_HOST`, `MAIL_USER`, `MAIL_PASS`
- `CLOUD_NAME`, `API_KEY`, `API_SECRET`, `FOLDER_NAME`
- `RAZORPAY_KEY`, `RAZORPAY_SECRET`
- `FRONTEND_URL` (the deployed Vercel origin, without a trailing slash)

Render provides `PORT` automatically. The API health endpoint is `/`.

### Vercel frontend

Import the repository into Vercel with the repository root as the project root. The existing `vercel.json` builds the React app and rewrites client-side routes to `index.html`. Set these frontend build environment variables in Vercel:

- `REACT_APP_BASE_URL` (the Render API URL ending in `/api/v1`)
- `REACT_APP_RAZORPAY_KEY` (the public Razorpay key ID)

After the first Vercel deployment, set Render's `FRONTEND_URL` to that Vercel origin and redeploy the API so CORS and password-reset links use the right domain. For a custom frontend domain, update `FRONTEND_URL` to that origin as well.

Do not commit `.env` files; configure secrets in the hosting providers' environment-variable settings.