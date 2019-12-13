import Datastore from 'nedb'
import path from 'path'

const db = {};
// db.test = new Datastore(path.join(remote.app.getPath('userData'), '/test.db'));
db.test = new Datastore(path.join("./db", '/test.db'));
db.test.loadDatabase();
db.test.timestampData = true;

// db.user = new Datastore(path.join("./db", '/user.db'));
// db.user.loadDatabase();
// db.user.timestampData = true;

db.item = new Datastore(path.join("./db", '/item.db'));
db.item.loadDatabase();
db.item.timestampData = true;

db.goods = new Datastore(path.join("./db", '/goods.db'));
db.goods.loadDatabase();
db.goods.timestampData = true;

db.order = new Datastore(path.join("./db", '/order.db'));
db.order.loadDatabase();
db.order.timestampData = true;

export default db;
