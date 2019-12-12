import Datastore from 'nedb'
import path from 'path'

const db = {};
// db.test = new Datastore(path.join(remote.app.getPath('userData'), '/test.db'));
db.test = new Datastore(path.join("./db", '/test.db'));
db.test.loadDatabase();

// db.user = new Datastore(path.join(remote.app.getPath('userData'), '/user.db'));
db.user = new Datastore(path.join("./db", '/user.db'));
db.user.loadDatabase();
//
// db.item = new Datastore(path.join(remote.app.getPath('userData'), '/item.db'));
db.item = new Datastore(path.join("./db", '/item.db'));
db.item.loadDatabase();
//
// db.itemCat = new Datastore(path.join(remote.app.getPath('userData'), '/itemCat.db'));
// db.itemCat.loadDatabase();
//
// db.order = new Datastore(path.join(remote.app.getPath('userData'), '/order.db'));
db.order = new Datastore(path.join("./db", '/order.db'));
db.order.loadDatabase();
//
// db.payment = new Datastore(path.join(remote.app.getPath('userData'), '/payment.db'));
// db.payment.loadDatabase();
//
// db.stockLog = new Datastore(path.join(remote.app.getPath('userData'), '/stockLog.db'));
// db.stockLog.loadDatabase();
//
// db.cart = new Datastore(path.join(remote.app.getPath('userData'), '/cart.db'));
// db.cart.loadDatabase();

export default db;
