const mongoose = require('mongoose');

const SOSMessageSchema = new mongoose.Schema(
  {
    messageId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    priority: {
      type: String,
      enum: ['CRITICAL', 'HIGH', 'NORMAL'],
      default: 'CRITICAL'
    },
    emergencyType: {
      type: String,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    peopleCount: {
      type: Number,
      default: 1
    },
    medicalRequired: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      default: ''
    },
    timestamp: {
      type: Number,
      default: Date.now
    },
    hopCount: {
      type: Number,
      default: 0
    },
    ttl: {
      type: Number,
      default: 10
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'ACKNOWLEDGED', 'RESOLVED'],
      default: 'ACTIVE'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('SOSMessage', SOSMessageSchema);
