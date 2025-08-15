// admin/admin.js
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const { buildAuthenticatedRouter } = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const { User, Match, Subscription, Report } = require('../backend/src/prisma/client');

AdminJS.registerAdapter(AdminJSSequelize);

const adminJs = new AdminJS({
  resources: [
    {
      resource: User,
      options: {
        properties: {
          password: { isVisible: false },
          fcmToken: { isVisible: false },
        },
        listProperties: ['name', 'email', 'isVerified', 'createdAt'],
      },
    },
    Match,
    Subscription,
    Report,
  ],
  rootPath: '/admin',
  dashboard: {
    component: AdminJS.bundle('./components/Dashboard'),
  },
});

// Custom dashboard with charts
const dashboardComponent = `
<div>
  <h1>Sparkr Admin Dashboard</h1>
  <div>Users: {{ users }}</div>
  <div>Matches: {{ matches }}</div>
  <div>Revenue: ${{ revenue }}</div>
</div>
`;

const buildDashboard = (req, res) => {
  res.send(dashboardComponent.replace('{{ users }}', 1250)
    .replace('{{ matches }}', 3200)
    .replace('{{ revenue }}', 8900));
};

const router = buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    if (email === 'admin@sparkr.com' && password === 'securePass123') {
      return { email: 'admin@sparkr.com' };
    }
    return null;
  },
}, null, {
  dashboard: {
    handler: async (req, res) => buildDashboard(req, res),
    component: false,
  },
});

module.exports = router;