import db from "../db.js";
import { BadRequestError, NotFoundError } from "../expressErrors.js";


/** Related functions for items. */

class Item {
    /** Find all items.
     * 
     * returns [{ id, item_name, currency, cost, url }, ...]
     * 
     * searchFilters object s with optional keys:
     * - currency
     * - itemNameLike
     * - minCost
     * - maxCost
     *  
    **/

    static async findAll(searchFilters = {}) {
        let query = `SELECT id,
                            item_name AS "itemName",
                            currency,
                            cost,
                            url
                     FROM items`;

        let whereExpressions = [];
        let queryValues = [];

        //search filters 

        if (searchFilters.minCost > searchFilters.maxCost) {
            throw new BadRequestError("Min cost cannot be greater than max cost");
        }

        if (searchFilters.minCost !== undefined) {
            queryValues.push(searchFilters.minCost);
            whereExpressions.push(`cost >= $${queryValues.length}`);
        }

        if (searchFilters.maxCost !== undefined) {
            queryValues.push(searchFilters.maxCost);
            whereExpressions.push(`cost <= $${queryValues.length}`);
        }

        if (searchFilters.itemNameLike !== undefined) {
            queryValues.push(`%${searchFilters.itemNameLike}%`);
            whereExpressions.push(`item_name ILIKE $${queryValues.length}`);
        }

        if (searchFilters.currency !== undefined) {
            queryValues.push(searchFilters.currency);
            whereExpressions.push(`currency = $${queryValues.length}`);
        }

        if (whereExpressions.length > 0) {
            query += " WHERE " + whereExpressions.join(" AND ");
        }

        const itemsRes = await db.query(query, queryValues);

        // if no items found, throw NotFoundError
        if (itemsRes.rows.length === 0) {
            throw new NotFoundError("No items found");
        }

        return itemsRes.rows;
    }

    /** Given an item id, return data about item.
     * 
     * Returns { id, item_name, currency, cost, url }
     * 
     * Throws NotFoundError if not found.
     **/

    static async get(id) {
        const itemRes = await db.query(
            `SELECT id,
                    item_name AS "itemName",
                    currency,
                    cost,
                    url
             FROM items
             WHERE id = $1`,
            [id]);

        const item = itemRes.rows[0];

        if (!item) throw new NotFoundError(`No item: ${id}`);

        return item;


    }
}

export default Item;