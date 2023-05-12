import express from 'express';
import { router } from './router';
import { con } from './database';
import path from 'node:path';

const app = express();
const port = 3000;
app.use(express.json());
app.use(router);

con.connect(function(err) {
  if (err) {
    // throw err;
    console.log('Erro ao conectar com o MySql: ', err.message);
  } else {
    const app = express();
    const port = 3000;

    //CORS
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    app.listen(port, () => console.log(`🔥 Server started at http://localhost/${port}`));

    console.log('Conectado ao MySql');
  }
});
