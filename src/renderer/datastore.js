import Datastore from 'nedb'
import path from 'path'

const db = {};
// db.test = new Datastore(path.join(remote.app.getPath('userData'), '/test.db'));
db.test = new Datastore(path.join("./db", '/test.db'));
db.test.loadDatabase();

db.user = new Datastore(path.join("./db", '/user.db'));
db.user.loadDatabase();

db.item = new Datastore(path.join("./db", '/item.db'));
db.item.loadDatabase();

db.goods = new Datastore(path.join("./db", '/goods.db'));
db.goods.loadDatabase();

db.order = new Datastore(path.join("./db", '/order.db'));
db.order.loadDatabase();

db.outbound = new Datastore(path.join("./db", '/outbound_detail.db'));
db.outbound.loadDatabase();

export default db;
