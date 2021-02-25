const surname = document.querySelector('#surname'),
    numbe = document.querySelector('#number'),
    contract = document.querySelector('#contract'),
    address = document.querySelector('#address');

const addUser = document.querySelector('#addUser'),
    removeUser = document.querySelector('#removeUser'),
    showUser = document.querySelector('#showUser'),
    getUser = document.querySelector('#getUser'),
    addProp = document.querySelector('#addProp'),
    updateDataBtn = document.querySelector('#updateDataBtn');

const userID = document.getElementsByName('userID')[0],
    tbody = document.querySelector('tbody'),
    getContract = document.querySelector('#getContract');

const newPropName = document.querySelector('#newPropName'),
    newPropValue = document.querySelector('#newPropValue');

const thead = document.querySelector('thead');
console.log(thead);

let db = openDatabase('mydb', '0.1', 'laba_5', 2 * 1024 * 1024);
let users = new Set(),
    tableRenderInfo = [];

function renderTable(str) {
    let columns = Object.keys(tableRenderInfo[0]);
    let row = "";
    for (let i = 0; i < columns.length; i++) {
        row += `<td>${columns[i]}</td>`;
    }
    thead.innerHTML = `<tr>${row}</tr>`;
    tbody.innerHTML = "";
    for (let i = 0; i < tableRenderInfo.length; i++) {
        let rows = Object.values(tableRenderInfo[i]);
        row = "";
        for (let j = 0; j < rows.length; j++) {
            row += `<td>${rows[j]}</td>`;
        }
        tbody.insertAdjacentHTML("beforeend", `<tr>${row}</tr>`);
    }
}


function createTable() {
    db.transaction(
        (trans) => {
            trans.executeSql(
                `create table if not exists user(
                id INTEGER PRIMARY KEY, 
                surname varchar(60) not null, 
                number varchar(60) not null,
                contract varchar(60) not null,
                address varchar(30) not null)`,
                []
            );
        },
        (err) => console.error("Не могу создать таблицу!", err),
        () => console.log("Успешно создана таблица!")
    );
}

function add() {
    db.transaction(
        (tx) => {
            tx.executeSql(
                `insert into user (surname, number, contract, address) values (?, ?, ?, ?);`,
                [
                    `${surname.value}`,
                    `${number.value}`,
                    `${contract.value}`,
                    `${address.value}`,
                ]
            );
        },
        (err) => console.error("Не могу создать запись!", err),
        () => {
            console.log("Запись добавлена в Базу Данных!");
            show();
        }
    );
}

function remove() {
    db.transaction(
        (tx) => {
            tx.executeSql(`DELETE FROM user WHERE id=?`, [
                userID.options[userID.selectedIndex].text,
            ]);
        },
        (err) => console.error("Не могу удалить запись!", err),
        () => {
            console.log("Запись успешно удалена!");
            show();
        }
    );
}

function addNewColumn(column) {
    db.transaction(
        (tx) => {
            tx.executeSql(
                `ALTER TABLE user ADD ${column} VARCHAR NOT NULL DEFAULT ''`,
                []
            );
        },
        (err) => console.error("Не могу создать новый столбец запись!", err),
        () => {
            console.log("Новый столбец успешно добавлен!");
            show();
        }
    );
}

function updateData(prop, value, id) {
    db.transaction(
        (tx) => {
            tx.executeSql(
                `UPDATE user SET ${prop} = '${value}' where id=${id}`,
                []
            );
        },
        (err) => console.error("Не могу обновить данные!", err),
        () => {
            console.log("Данные успешно обновлены!");
            show();
        }
    );
}

function show() {
    db.transaction(function (trans) {
        trans.executeSql(
            "SELECT * FROM user",
            [],
            function (trans, result) {
                users = new Set();
                tableRenderInfo = [];
                tbody.innerHTML = "";
                userID.innerHTML = "";
                let len = result.rows.length;
                for (let i = 0; i < len; i++) {
                    let buffObj = result.rows.item(i);
                    users.add(
                        new User(
                            buffObj.id,
                            buffObj.surname,
                            buffObj.number,
                            buffObj.contract,
                            buffObj.address
                        )
                    );
                    tableRenderInfo.push(buffObj);
                }
                for (let elem of users) {
                    userID.insertAdjacentHTML(
                        "beforeend",
                        `<option value="${elem.getId()}">${elem.getId()}</option>`
                    );
                }
                renderTable('');
            },
            function (trans, e) {
                console.log(e);
            }
        );
    });
}

function getByContract() {
    let columns = Object.keys(tableRenderInfo[0]);
    let row = "";
    for (let i = 0; i < columns.length; i++) {
        row += `<td>${columns[i]}</td>`;
    }
    thead.innerHTML = `<tr>${row}</tr>`;
    tbody.innerHTML = "";
    for (let i = 0; i < tableRenderInfo.length; i++) {
        if (Object.values(tableRenderInfo[i])[3] === getContract.value.trim()) {

            let rows = Object.values(tableRenderInfo[i]);
            row = "";
            for (let j = 0; j < rows.length; j++) {
                row += `<td>${rows[j]}</td>`;
            }
            tbody.insertAdjacentHTML("beforeend", `<tr>${row}</tr>`);
        }
    }
}

function setNewProp() {
    for (let elem of users) {
        if (elem.id == userID.options[userID.selectedIndex].text) {
            elem[`${newPropName.value}`] = newPropValue.value;
            console.log(elem);
            addNewColumn(newPropName.value);
            updateData(
                newPropName.value,
                newPropValue.value,
                userID.options[userID.selectedIndex].text
            );
            show();
        }
    }
}


document.addEventListener("DOMContentLoaded", () => {
    createTable();
    show();
});
addUser.addEventListener("click", () => {
    add();
});
removeUser.addEventListener("click", remove);
showUser.addEventListener("click", show);
getUser.addEventListener("click", getByContract);
addProp.addEventListener("click", setNewProp);
updateDataBtn.addEventListener("click", () => {
    updateData(
        String(newPropName.value),
        String(newPropValue.value),
        Number(userID.options[userID.selectedIndex].text)
    );
    show();
});
