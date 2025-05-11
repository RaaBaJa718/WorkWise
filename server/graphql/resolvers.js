const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcrypt');

const resolvers = {
    Query: {
        users: async () => await User.find(),
        user: async (_, { id }) => await User.findById(id),
        jobs: async () => await Job.find(),
        job: async (_, { id }) => await Job.findById(id),
        applications: async () => await Application.find(),
        application: async (_, { id }) => await Application.findById(id),
    },
    
    Mutation: {
        createUser: async (_, { name, email, password }) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('User with this email already exists');
            }

            const user = await User.create({ name, email, password });
            const token = signToken(user);
            return { token, user };
        },

        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new Error('Invalid credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        createJob: async (_, { title, company }) => {
            const job = await Job.create({ title, company });
            return job;
        },

        applyForJob: async (_, { userId, jobId }) => {
            const application = await Application.create({ user: userId, job: jobId, status: "Pending" });
            return application;
        },

        updateApplicationStatus: async (_, { id, status }) => {
            return await Application.findByIdAndUpdate(id, { status }, { new: true });
        },
    },
};

module.exports = resolvers;