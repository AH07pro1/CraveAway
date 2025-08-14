import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';

import cravingRoutes from './cravings/routes/cravingRoutes';
import cravingTypeRoutes from './craving-types/routes/cravingTypesRoutes';
import sessionRoute from './session/routes/sessionroute';
import dailyCheckinRoute from './daily-checkin/routes/dailyCheckinRoute';
import onboardingRoute from './onboarding/routes/onboardingRoutes';
const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url} received`);
  next();
});

console.log('CLERK_SECRET_KEY =', process.env.CLERK_SECRET_KEY);


// Route registrations
app.use('/api/craving', cravingRoutes);
app.use('/api/craving-types', cravingTypeRoutes);
app.use('/api/session-complete', sessionRoute);
app.use('/api/daily-checkin', dailyCheckinRoute);
app.use('/api/onboarding', onboardingRoute);

// Server start
app.listen(3000, '0.0.0.0', () => {
  console.log(`✅ Backend running at http://0.0.0.0:3000`);

});

