import db from '../db';

class Query {
    constructor() {
        this.query = '';
    }
    static createTable(data) {
        this.query = 'CREATE TABLE IF NOT EXISTS';
        let p;
        if (Object.prototype.toString.call(data) === '[object Array]') {
            (function loop(i) {
                const promise = new Promise((resolve, reject) => {
                     db.query(`${Query.query} ${data[i].tableName} (${data[i].column});`,
                (err, res) => {
                    if (err) {
                        console.log(`${err.detail} when create table ${data.tableName}`);
                        reject();
                    } 
                    if (res) {
                        console.log(`${res.command} table ${data[i].tableName} !`);
                        resolve();
                    }
                });
                    
                    }).then( () => i === data.length -1 || loop(i+1) );
                })(0);
        } else {
            db.query(`${this.query} ${data.tableName} (${data.column});`,
                (err, res) => {
                    if (err) {
                        console.log(`${err.detail} when create table ${data.tableName}`);
                    } 
                    if (res) {
                        console.log(`${res.command} table ${data.tableName} !`);
                        
                    }
                });
        }
    }
    static insert(data) {
        this.query = 'INSERT';
        if (Object.prototype.toString.call(data.values) === '[object Array]') {
            (function loop(i) {
                const promise = new Promise((resolve, reject) => {
                    db.query(`${Query.query} INTO ${data.table} (${data.fields}) VALUES (${data.values[i]});`,
                    (err, res) => {
                        if (err) {
                            console.log(err);
                            resolve();
                        }
                        if (res) {
                            console.log(res.command);
                            resolve();
                        }
                    });
                    }).then( () => i === data.values.length -1 || loop(i+1) );
                })(0);
        } else {
            return db.query(`${this.query} INTO ${data.table} (${data.fields}) VALUES (${data.values});`,
                (err, res) => {
                    if (err) console.log(err.detail);
                    else console.log(res);
                });
        }
    }
}
export default Query;
