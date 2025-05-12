const { ObjectId } = require("mongoose").Types;
const User = require("../models/User");
const Job = require("../models/Jobs");
const Application = require("../models/Applications");
const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {
    Query: {
        users: async () => await User.find(),
        user: async (_, { id }) => {
            if (!ObjectId.isValid(id)) throw new Error("Invalid User ID format.");
            return await User.findById(new ObjectId(id));
        },
        jobs: async () => await Job.find(),
        job: async (_, { id }) => {
            if (!ObjectId.isValid(id)) throw new Error("Invalid Job ID format.");
            return await Job.findById(new ObjectId(id));
        },
        applications: async () => await Application.find().populate("user").populate("job"),
        application: async (_, { id }) => {
            if (!ObjectId.isValid(id)) throw new Error("Invalid Application ID format.");
            return await Application.findById(new ObjectId(id)).populate("user").populate("job");
        },
    },

    Mutation: {
        createUser: async (_, { name, email, password }) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) throw new Error("User with this email already exists");

            console.log("🔐 Hashing password before storing...");
            const hashedPassword = await bcrypt.hash(password, 10); // ✅ Always hash before storing
            console.log("🔐 Hashed Password:", hashedPassword);

            const user = await User.create({ name, email, password: hashedPassword });
            const token = signToken(user);
            return { token, user };
        },

        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                console.error("❌ User not found for email:", email);
                throw new Error("Invalid credentials");
            }

            console.log("🔎 Stored Hashed Password:", user.password);
            console.log("🔍 Attempting bcrypt.compare() with input password:", password);

            // Extra validation to ensure password hashing is correct
            const isValid = await bcrypt.compare(password, user.password);
            console.log("🛠 Bcrypt comparison result:", isValid);

            if (!isValid) {
                console.error("❌ Password mismatch for user:", user.email);
                throw new Error("Invalid credentials");
            }

            const token = signToken(user);
            console.log("✅ Login successful for:", user.email);
            return { token, user };
        },

        createJob: async (_, { title, company, description }) => {
            return await Job.create({ title, company, description });
        },

        applyForJob: async (_, { userId, jobId }) => {
            if (!ObjectId.isValid(userId) || !ObjectId.isValid(jobId)) throw new Error("Invalid User ID or Job ID format.");
            return await Application.create({
                user: new ObjectId(userId),
                job: new ObjectId(jobId),
                status: "Pending",
            });
        },

        updateApplicationStatus: async (_, { id, status }) => {
            if (!ObjectId.isValid(id)) throw new Error("Invalid Application ID format.");
            return await Application.findByIdAndUpdate(new ObjectId(id), { status }, { new: true });
        },
    },
};

module.exports = resolvers;