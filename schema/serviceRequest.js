const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true,
    enum: ['CFO', 'Accounting', 'Consulting'] // Assuming these are the options
  },
  dateRequested: {
    type: Date,
    default: Date.now
  }
});

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);

module.exports = ServiceRequest;
