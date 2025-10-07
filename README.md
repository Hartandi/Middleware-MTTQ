# Middleware-MTTQ

This repository contains a simple Pub/Sub UI implemented with HTML and JavaScript. Open `index.html` in your browser to configure WebSocket subscriptions, connect to topics, and view incoming messages.

## Backend service

A small Node.js service (`server.js`) exposes a `/create-service` endpoint that authenticates with Google Cloud and creates a Cloud Run service for each saved subscription. Credentials should be provided via Application Default Credentials or by setting `GOOGLE_APPLICATION_CREDENTIALS`.

Install dependencies and run the backend locally with:

```bash
npm install
npm start
```

Environment variables `GCP_PROJECT` and `GCP_LOCATION` must be set so the service knows where to create Cloud Run services.

