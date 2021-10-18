import { Pool } from 'pg';

const connectionString = 'postgres://uxqnbtlk:ZvF-Ho37qxi_hky57-VzOQ8VtIACWc64@kesavan.db.elephantsql.com/uxqnbtlk';

const db = new Pool({ connectionString });

export default db;