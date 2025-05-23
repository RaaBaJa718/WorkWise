const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: true },
    postedDate: { type: Date, default: Date.now },
    location: { type: String },
    salary: { type: String },
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;