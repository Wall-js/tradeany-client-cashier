import db from '../datastore'

function get(list){

}

let itemCat = {
    get: function () {
        db.itemCat.find({}, (err, docs) => {
            itemCats = docs
        });
        return itemCats
    },
    save: function (docs) {
        let itemCats = {};
        db.itemCat.insert(docs, (err, newDocs) => {
            itemCats = newDocs
        });
        return itemCats;
    },
    del: function () {
        db.itemCat.remove({}, {multi: true}, (err, numRemoved) => {
            console.log(numRemoved);
        })
    },
};

export default itemCat
