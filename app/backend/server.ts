import express from 'express';
import cors from 'cors';

import cravingRoutes from './cravings/routes/cravingRoutes';
import cravingTypeRoutes from './craving-types/routes/cravingTypesRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/craving', cravingRoutes);
app.use('/api/craving-types', cravingTypeRoutes); // <-- add craving types routes here

app.listen(3000, () => {
  console.log('✅ Backend running at http://localhost:3000');
});
