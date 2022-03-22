import app from './app';
import database from './database';

database.connect().then(() => {
  const port = process.env.PORT || 3333;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
