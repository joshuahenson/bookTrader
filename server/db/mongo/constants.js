export const db = process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://localhost/bookTrader';

export default {
  db
};
