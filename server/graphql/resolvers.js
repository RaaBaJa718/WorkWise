const users = [];
const jobs = [];
const applications = [];

const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find(user => user.id === id),
    jobs: () => jobs,
    job: (_, { id }) => jobs.find(job => job.id === id),
    applications: () => applications,
    application: (_, { id }) => applications.find(app => app.id === id),
  },
  Mutation: {
    createUser: (_, { name, email }) => {
      const user = { id: users.length + 1, name, email };
      users.push(user);
      return user;
    },
    createJob: (_, { title, company }) => {
      const job = { id: jobs.length + 1, title, company };
      jobs.push(job);
      return job;
    },
    applyForJob: (_, { userId, jobId }) => {
      const application = { id: applications.length + 1, user: userId, job: jobId, status: "Pending" };
      applications.push(application);
      return application;
    },
    updateApplicationStatus: (_, { id, status }) => {
      const application = applications.find(app => app.id === id);
      if (application) application.status = status;
      return application;
    },
  },
};

module.exports = resolvers;