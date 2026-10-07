const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const mongoose = require('mongoose');
const SOSMessage = require('./models/SOSMessage');

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Connect to MongoDB Atlas and setup Change Stream
if (!MONGODB_URI) {
  console.error('[Backend Error] MONGODB_URI is not defined in environment variables.');
} else {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log('[MongoDB] Connected successfully to MongoDB Atlas.');
      setupChangeStream();
    })
    .catch((err) => {
      console.error('[MongoDB Error] Database connection failed:', err);
    });
}

// Broadcast helper for real-time WebSocket clients
function broadcast(event) {
  const payload = JSON.stringify(event);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

// Watch MongoDB Atlas for direct writes from Android devices
function setupChangeStream() {
  try {
    const changeStream = SOSMessage.watch([], { fullDocument: 'updateLookup' });
    
    changeStream.on('change', (change) => {
      console.log(`[MongoDB ChangeStream] Operation detected: ${change.operationType}`);
      
      if (change.operationType === 'insert') {
        const doc = change.fullDocument;
        console.log(`[MongoDB ChangeStream] REAL-TIME NEW SOS: ${doc.messageId} - ${doc.emergencyType}`);
        broadcast({
          type: 'NEW_SOS',
          data: doc
        });
      } else if (change.operationType === 'update' || change.operationType === 'replace') {
        const doc = change.fullDocument;
        console.log(`[MongoDB ChangeStream] REAL-TIME STATUS UPDATE: ${doc.messageId} -> ${doc.status}`);
        broadcast({
          type: 'STATUS_UPDATE',
          data: doc
        });
      }
    });

    changeStream.on('error', (err) => {
      console.error('[MongoDB ChangeStream Error]:', err);
    });
    
    console.log('[MongoDB ChangeStream] Listening for direct Mongo Atlas writes from Android phones...');
  } catch (err) {
    console.error('[MongoDB ChangeStream Setup Failed]:', err);
  }
}

wss.on('connection', (ws) => {
  console.log('[WebSocket] Client connected to real-time feed.');
  ws.send(
    JSON.stringify({
      type: 'CONNECTED',
      message: 'Connected to ResQMesh Realtime Emergency Feed (Direct Mongo Atlas ChangeStream)'
    })
  );

  ws.on('close', () => {
    console.log('[WebSocket] Client disconnected.');
  });
});

// Root API status endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ResQMesh Central Server API',
    endpoints: {
      health: '/api/health',
      sos: '/api/sos'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Get all SOS messages from MongoDB
app.get('/api/sos', async (req, res) => {
  try {
    const messages = await SOSMessage.find().sort({ timestamp: -1 });
    return res.json({
      status: 'success',
      count: messages.length,
      messages: messages
    });
  } catch (err) {
    console.error('[Backend] Error fetching SOS messages from MongoDB:', err);
    return res.status(500).json({ status: 'error', message: 'Failed to retrieve SOS messages' });
  }
});

// Enforce Direct Database Write architecture for Android phones
app.post('/api/sos', (req, res) => {
  return res.status(405).json({
    status: 'error',
    message: 'Android devices write directly to MongoDB Atlas. Express API does not accept POST /api/sos uploads.'
  });
});

// Update SOS status (ACKNOWLEDGED / RESOLVED) from Dashboard
app.patch('/api/sos/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedDoc = await SOSMessage.findOneAndUpdate(
      { messageId: id },
      { status: status },
      { new: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({ status: 'error', message: 'SOS message not found' });
    }

    broadcast({
      type: 'STATUS_UPDATE',
      data: updatedDoc
    });

    return res.json({ status: 'success', data: updatedDoc });
  } catch (err) {
    console.error('[Backend] Error updating status in MongoDB:', err);
    return res.status(500).json({ status: 'error', message: 'Database error updating status' });
  }
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`ResQMesh Central Server running on http://localhost:${PORT}`);
  console.log(`MongoDB Atlas Connected: ${MONGODB_URI ? 'Configured' : 'Missing'}`);
  console.log(`React Web Dashboard API ready on /api/sos & WebSocket`);
  console.log(`====================================================`);
});
