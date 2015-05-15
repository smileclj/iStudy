/**
 * Created by chenlj on 2015/5/13.
 */
window.onload = function () {
    if (!window.indexedDB) {
        window.indexedDB = window.mozIndexedDB || window.webkitIndexedDB;
    }

    var db = null;

    var request = indexedDB.open("mydb");

    request.onupgradeneeded = function (e) {
        db = e.target.result;
        createObjectStore(db);
    }


    function createObjectStore(db) {
        if (db.objectStoreNames.contains("customer")) {
            db.deleteObjectStore("customer");
        }

        var objectStore = db.createObjectStore("customer", {keyPath: "id", autoIncrement: true});

        objectStore.createIndex("name", "name", {unique: false});

        objectStore.createIndex("email", "email", {unique: true});

        objectStore.add({name: "Tom", sex: "male", age: 34, email: "tom@facebok.org"});

        objectStore.add({name: "Jiny", sex: "female", age: 25, email: "jiny@home.org"});

        objectStore.add({name: "Liam", sex: "male", age: 23, email: "liam@163.com"});

    }

    request.onsuccess = function (e) {
        db = e.target.result;

        if (!db.version == "1.0") {
            var request = db.setVersion("1.0");

            request.onsuccess = function (e) {
                createObjectStore(db);
                showDataByCursor();
            }

            request.onerror = function (e) {
                alert(e);
            }
        } else {
            showDataByCursor();
        }

    }


    function showDataByCursor(objectStore) {
        if (!objectStore) {
            var transaction = db.transaction(["customer"]);
            objectStore = transaction.objectStore("customer");
        }


        console.log("Store-Name :" + objectStore.name);

        console.log("Store-KeyPath :" + objectStore.keyPath);

        var request = objectStore.openCursor();

        request.onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                console.log(cursor.key);
                console.log(cursor.value);
                var data = cursor.value;
                data.id = cursor.key;
                showInTable(data);
                cursor.continue();
            }
        }


        request.onerror = function (e) {
            console.log("ERROR");
        }

    }


    var table = document.getElementsByTagName("table")[0];

    function showInTable(data) {


//table.childNodes


        var tbody = table.children[1];


//tbody = document.getElementsByTagName("tbody")[0];


        var tr = document.createElement("tr");


        var td_id = createTd(data, "id")


        var checkBox = document.createElement("input");


        checkBox.setAttribute("type", "checkbox");


        checkBox.setAttribute("name", "check");


        var textNode = td_id.childNodes[0];


        checkBox.setAttribute("id", textNode.nodeValue);


//td_id.removeChild(textNode);


        td_id.appendChild(checkBox);


//td_id.appendChild(textNode);


        tr.appendChild(td_id);


        var td_name = createTd(data, "name");


        tr.appendChild(td_name);


        var td_sex = createTd(data, "sex");


        tr.appendChild(td_sex);


        var td_age = createTd(data, "age");


        tr.appendChild(td_age);


        var td_email = createTd(data, "email");


        tr.appendChild(td_email);


        tbody.appendChild(tr);

    }


    function createTd(data, key) {
        var td = document.createElement("td");
        td.contentEditable = "true";
        var namedNodeMap = td.attributes;
        var attrKey = document.createAttribute("key");
        attrKey.value = key;
        namedNodeMap.setNamedItem(attrKey);
        var attrValue = document.createAttribute("value");
        attrValue.value = data[key];
        namedNodeMap.setNamedItem(attrValue);
        var attrType = document.createAttribute("type");
        attrType.value = typeof(data[key]);
        namedNodeMap.setNamedItem(attrType);
        td.innerText = data[key];
        td.onblur = function (event) {
            console.log(this.parentNode.firstElementChild.innerText);


            console.log(this.innerText.LTrim().RTrim());


            console.log(this.attributes["value"].value);


            console.log(this.attributes["key"].value);


            console.log(this.innerText);


            if (this.attributes["value"].value != this.innerText.LTrim().RTrim()) {


                saveOrUpdate(event.target);
//或saveOrUpdate(this)


            }


        }


        return td;

    }


    function saveOrUpdate(obj) {


        var id = obj.parentNode.firstElementChild.innerText;


        var transaction = db.transaction(["customer"], "readwrite");


        var objectStore = transaction.objectStore("customer");


        var request = objectStore.get(parseInt(id));


//var range = IDBKeyRange.only("Donna");


//var request = objectStore.index("name").openCursor(range);


        request.onsuccess = function (event) {


            if (event.target.result) {




//objectStore.delete(id);


                var data = event.target.result;


                console.log("Update :" + data);


                var value = obj.attributes["type"].value == "number" ? parseInt(obj.innerText) : obj.innerText;


                data[obj.attributes["key"].value] = value;


                var updateRequest = objectStore.put(data);


                updateRequest.onsuccess = function (event) {





//console.log(event.target);


                    console.log("UPDATE SUCCESS");


                }


                updateRequest.onerror = function (event) {


                    console.log("UPDATE ERROR");


                }


            } else {


                var data = {};


                var tds = obj.parentNode.children;


                for (var i = 0; i < tds.length; i++) {


                    var td = tds[i];


                    var key = td.attributes["key"].value;


                    data[key] = td.attributes["type"].value == "number" ? parseInt(td.innerText) : td.innerText;


                }


                console.log("Add :" + data);


                var saveRequest = objectStore.add(data);


                saveRequest.onsuccess = function () {


                    console.log("SAVE SUCCESS");


                }


                saveRequest.onerror = function () {


                    console.log("SAVE ERROR");


                }


            }


        }


        request.onerror = function (event) {


            alert(event);


        }

    }


    var name = document.getElementsByName("name")[0];

    var email = document.getElementsByName("email")[0];

    var select = document.getElementsByTagName("button")[0];


    select.onclick = function (event) {


        var value_name = name.value.LTrim().RTrim();


        var value_email = email.value.LTrim().RTrim();


        var transaction = db.transaction(["customer"], "readonly");


        var objectStore = transaction.objectStore("customer");


        var tbody = table.children[1];


        var elements = tbody.children;


        var count = elements.length;


        for (var i = 0; i < elements.length;) {
//动态移除，没有i++，始终移除第一个


            tbody.removeChild(elements[i]);


        }


        if (value_name == "" && value_email == "") {


            var request = objectStore.openCursor();


            request.onsuccess = function (event) {


                var cursor = event.target.result;


                if (cursor) {


                    showInTable(cursor.value)


                    cursor.continue();


                }


                console.log("GETALL SUCCESS");


            };


            request.onerror = function (event) {


                console.log(event.target);


                console.log("GETALL ERROR");


            };


        } else {


            if (value_name != "") {


                var range = IDBKeyRange.only(value_name);


                var request = objectStore.index("name").openCursor(range);


                request.onsuccess = function (event) {


                    var cursor = event.target.result;


                    if (cursor) {


                        console.log("key :" + cursor.key);


                        console.log("value :" + cursor.value);


                        showInTable(cursor.value)


                        cursor.continue();


                    }


                    console.log("SELECT BY NAME SUCCESS");


                }


                request.onerror = function (event) {


                    console.log("SELECT BY NAME ERROR");


                }


            }


            if (value_email != "") {


                var range = IDBKeyRange.only(value_email);


                var request = objectStore.index("email").openCursor(range);


                request.onsuccess = function (event) {


                    var cursor = event.target.result;


                    if (cursor) {


                        console.log("key :" + cursor.key);


                        console.log("value :" + cursor.value);


                        showInTable(cursor.value)


                        cursor.continue();


                    }


                    console.log("SELECT BY EMIAL SUCCESS");


                }


                request.onerror = function (event) {


                    console.log("SELECT BY EMAIL ERROR");


                }


            }


        }

    }


    var checkAll = document.getElementsByName("checkAll")[0];

    var btnDelete = document.getElementsByName("delete")[0];

    var btnClear = document.getElementsByName("clear")[0];

    checkAll.onclick = function (event) {


        var checkBoxs = document.getElementsByName("check");


        console.log(checkBoxs);


        if (this.checked == true) {


            for (var i = 0; i < checkBoxs.length; i++) {


                checkBoxs[i].checked = true;


            }


        } else {


            for (var i = 0; i < checkBoxs.length; i++) {


                checkBoxs[i].checked = false;


            }


        }

    }

    btnDelete.addEventListener("click", function (event) {


        var checkBoxs = document.getElementsByName("check");


        console.log(checkBoxs);


        var transaction = null;


        var objectStore = null;


        var request = null;


        for (var i = 0; i < checkBoxs.length; i++) {


            var checkBox = checkBoxs[i];


            if (checkBox.checked == true) {


                if (request == null) {


                    transaction = db.transaction(["customer"], "readwrite");


                    objectStore = transaction.objectStore("customer");


                }


                var id = parseInt(checkBox.attributes["id"].value);


                console.log("checked :" + id);


                request = objectStore.get(id);


                request.onsuccess = function (event) {


                    if (event.target.result) {


                        var record = event.target.result;


                        objectStore.delete(record.id);


                        for (var j = 0; j < checkBoxs.length; j++) {
                            if (checkBoxs[j].attributes["id"].value - record.id == 0) {
                                var tr = checkBoxs[j].parentElement.parentElement;

                                var tbody = checkBoxs[j].parentElement.parentElement.parentElement;

                                tbody.removeChild(tr);
                                break;
                            }
                        }
                        console.log("DELETE SUCCESS");
                    }
                };

                request.onerror = function (event) {
                    console.log("DELETE ERROR");
                };
            }
        }
    });

    btnClear.addEventListener("click", function (event) {
        var objectStore = db.transaction(["customer"], "readwrite").objectStore("customer");

        var request = objectStore.clear();

        request.onsuccess = function (event) {
            console.log("CLEAR SUCCESS");

            objectStore.openCursor().onsuccess = function (event) {
                var tbody = table.children[1];

                var elements = tbody.children;

                for (var i = 0; i < elements.length;) {
//动态移除，没有i++，始终移除第一个
                    tbody.removeChild(elements[i]);
                }

                var cursor = event.target.result;

                if (cursor) {
                    var data = cursor.value;
                    data.id = cursor.key;
                    showInTable(data);
                    cursor.continue();
                }

                console.log("SHOW SUCCESS");

            }

        }

        request.onerror = function (event) {
            console.log("CLEAR ERROR");
        }
    });
};