import express, { Application } from 'express';
import cors from 'cors';

import cravingRoutes from './cravings/routes/cravingRoutes';
import cravingTypeRoutes from './craving-types/routes/cravingTypesRoutes';
import sessionRoute from './session/routes/sessionroute';
import dailyCheckinRoute from './daily-checkin/routes/dailyCheckinRoute';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Route registrations
app.use('/api/craving', cravingRoutes);
app.use('/api/craving-types', cravingTypeRoutes);
app.use('/api/session-complete', sessionRoute);
app.use('/api/daily-checkin', dailyCheckinRoute);

// Server start
app.listen(3000, '0.0.0.0', () => {
  console.log(`✅ Backend running at http://0.0.0.0:3000`);

});

