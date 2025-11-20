# Telemetry Setup Instructions

## Environment Variables Setup

1. **Copy the environment template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Get your Azure Application Insights connection string:**
   - Go to Azure Portal → Your Application Insights resource
   - Copy the "Connection String" from the overview page

3. **Update `.env.local` with your actual values:**
   ```env
   VITE_AZURE_APPLICATION_INSIGHTS_CONNECTION_STRING=InstrumentationKey=your-actual-key...
   VITE_ENABLE_TELEMETRY=true
   ```

4. **Important: Never commit `.env.local`** - it's already in `.gitignore`

## Environment Variable Naming

- **VITE_ prefix is required** for client-side environment variables
- Variables without VITE_ prefix are only available server-side
- VITE_ variables are injected at build time and visible in browser

## Testing

1. Start the application: `npm run dev`
2. Check browser console for telemetry status messages
3. Add `<TelemetryStatus />` component to see current configuration
4. Verify no "process is not defined" errors