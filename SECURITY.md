# Security Configuration

## Environment Variables Setup

This project uses environment variables to securely store Firebase configuration. Follow these steps to set up your environment:

### Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your actual Firebase configuration values in `.env`

3. Never commit the `.env` file to version control

### GitHub Pages Deployment

To deploy to GitHub Pages, you need to add your Firebase configuration as GitHub Secrets:

1. Go to your repository settings: `https://github.com/subham-04/gmail-threat-analyzer-site/settings`
2. Navigate to "Secrets and variables" → "Actions"
3. Add the following repository secrets:

   - `VITE_FIREBASE_API_KEY`: Your Firebase API key
   - `VITE_FIREBASE_AUTH_DOMAIN`: Your Firebase auth domain
   - `VITE_FIREBASE_PROJECT_ID`: Your Firebase project ID
   - `VITE_FIREBASE_STORAGE_BUCKET`: Your Firebase storage bucket
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase messaging sender ID
   - `VITE_FIREBASE_APP_ID`: Your Firebase app ID
   - `VITE_FIREBASE_MEASUREMENT_ID`: Your Firebase measurement ID

### Security Notes

- ✅ `.env` files are excluded from git via `.gitignore`
- ✅ Production secrets are managed via GitHub Secrets
- ✅ API keys are loaded via environment variables
- ❌ Never hardcode sensitive values in source code

## Firebase Security

Firebase API keys for web applications are designed to be public, but you should still:

1. Configure Firebase Security Rules properly
2. Use environment variables for consistency
3. Monitor usage in Firebase Console
4. Restrict API key usage if needed in Google Cloud Console

## Important

If you've accidentally committed sensitive data:
1. Change the exposed credentials immediately
2. Remove them from git history using `git filter-branch` or BFG Repo-Cleaner
3. Force push the cleaned repository
