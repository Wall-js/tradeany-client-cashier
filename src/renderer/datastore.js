import Datastore from 'nedb'
import path from 'path'
import {remote} from 'electron'

const db = {};
db.test = new Datastore(path.join(remote.app.getPath('userData'), '/test.db'));
db.test.loadDatabase();

db.user = new Datastore(path.join(remote.app.getPath('userData'), '/user.db'));
db.user.loadDatabase();

db.item = new Datastore(path.join(remote.app.getPath('userData'), '/item.db'));
db.item.loadDatabase();

db.itemCat = new Datastore(path.join(remote.app.getPath('userData'), '/itemCat.db'));
db.itemCat.loadDatabase();

db.order = new Datastore(path.join(remote.app.getPath('userData'), '/order.db'));
db.order.loadDatabase();

db.payment = new Datastore(path.join(remote.app.getPath('userData'), '/payment.db'));
db.payment.loadDatabase();

db.stock = new Datastore(path.join(remote.app.getPath('userData'), '/stock.db'));
db.stock.loadDatabase();

export default db;
