import { Response } from 'express';
import mysql, { Query } from 'mysql';

export const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'appLocal'
});

export const execQuery = (query: any, values: any) => {
  return new Promise((resolve, reject) => {
    con.query(query, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  }).then((result) => {
    // console.log('Response: '+JSON.stringify(result));
    return JSON.parse(JSON.stringify(result));
  }).catch((err) => {
    // console.log('Error: '+err.message)
    return 'Error: '+err.message;
  });
  ;
};
