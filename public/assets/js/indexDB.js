let dbName = 'cmms_musashi'
let dbVersion = 4;
let localDB;

//*table list
var localDB_m_plant;
var localDB_menu;

loadDb();

function loadDb(){
    console.log('Open DB')
    let openRequest = indexedDB.open(dbName, dbVersion);
    openRequest.onupgradeneeded = async function(event) {
        const db = event.target.result;
        await getPlant(db);
    };

    openRequest.onerror = function() {
        console.error("IndexedDB Error", openRequest.error);
    };

    openRequest.onsuccess = async function(event) {
        localDB = openRequest.result;
        const db = event.target.result;
        // await getPlant(db);
    };
}

async function createTable(db, localDB, tblName, fileds, datas = []){
    console.log('indexedDB Create Table', tblName)
    for (let i = 0; i < fileds.length; i++) {
        const e = fileds[i];
        localDB.createIndex(e.field_name, e.field_name, { unique: e.is_unique });
    }
    if(datas){
        if(datas.length > 0){
            await insertData(db, localDB, tblName, datas);
        }
    }
}

async function insertData(db, localDB, tblName, datas){
    console.log('indexedDB Insert Data', tblName)
    localDB.transaction.oncomplete = (event) => {
        const store = db.transaction(tblName, "readwrite").objectStore(tblName);
        datas.forEach((data) => {
            store.add(data);
        });
    };
    viewData(db, tblName)
}

async function viewData(db, tblName){
    console.log('indexedDB View Data', tblName)
    var transaction = db.transaction([`${tblName}`]);
    var object_store = transaction.objectStore(`${tblName}`);
    var request = object_store.openCursor();
    request.onerror = function(event) {
        console.err("error fetching data");
     };
     request.onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {
            let key = cursor.primaryKey;
            let value = cursor.value;
            console.log(key, value);
            cursor.continue();
        }
        else {
            // no more results
        }
     };
}

async function getPlant(db){
    console.log('indexedDB getPlant', db)
    const localDB_m_plant = db.createObjectStore("m_plant", { keyPath: "m_plant_id" });
    var fileds = [{
        field_name: 'plant_name',
        is_unique: false,
    }]
    var data = [{m_plant_id : '1', m_plant_id : 'Cikarang'}, {m_plant_id : '2', m_plant_id : 'Karawang'}]
    await createTable(db, localDB_m_plant, 'm_plant', fileds, data);
}

async function viewPlantData(){
    console.log('indexedDB viewPlantData')
    transaction = this.db.transaction(["table"]);
    object_store = transaction.objectStore("table");
    request = object_store.openCursor();
}