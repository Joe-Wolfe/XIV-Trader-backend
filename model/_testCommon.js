import db from "../db";

async function commonBeforeAll() {

    await db.query("DELETE FROM items");

    await db.query(`INSERT INTO items
                    (id, item_name, currency, cost, url)
                    VALUES
                    (1, 'item1', '1', 100, 'www.item1.com'),
                    (2, 'item2', '2', 200, 'www.item2.com'),
                    (3, 'item3', '1', 300, 'www.item3.com'),
                    (4, 'item4', '1', 400, 'www.item4.com'),
                    (5, 'item5', '1', 500, 'www.item5.com'),
                    (6, 'item6', '1', 600, 'www.item6.com')`);
}

async function commonBeforeEach() {
    await db.query("BEGIN");
}

async function commonAfterEach() {
    await db.query("ROLLBACK");
}

async function commonAfterAll() {
    await db.end();
}

module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
};