const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/create-service', async (req, res) => {
  const { wsUrl, topic, service } = req.body;
  if (!wsUrl || !topic || !service) {
    return res.status(400).json({ error: 'wsUrl, topic, and service are required' });
  }

  try {
    // Authenticate using Application Default Credentials or service account key
    const auth = await google.auth.getClient({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });
    const project = process.env.GCP_PROJECT;
    const location = process.env.GCP_LOCATION || 'us-central1';
    const run = google.run('v1');

    const request = {
      parent: `projects/${project}/locations/${location}`,
      requestBody: {
        metadata: { name: service },
        spec: {
          template: {
            spec: {
              containers: [
                { image: `gcr.io/${project}/${service}` },
              ],
            },
          },
        },
      },
      auth,
    };

    const result = await run.projects.locations.services.create(request);
    res.json({ message: 'Service creation requested', data: result.data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
