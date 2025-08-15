// load-test.js
module.exports = {
  config: {
    target: 'http://localhost:3000',
    phases: [{ duration: 60, arrivalRate: 10 }],
  },
  scenarios: [
    {
      flow: [
        { post: { url: '/api/auth/login', json: { email: 'alice@example.com', password: 'pass' } } },
        { get: { url: '/api/user/profile' } },
      ],
    },
  ],
};