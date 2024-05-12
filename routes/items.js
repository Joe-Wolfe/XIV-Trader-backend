import express from 'express';

import Item from '../model/item.js';

const router = new express.Router();




/** GET /  => 
 * { items: [ { id, item_name, currency, cost ,url }, ...] }
 *
 * 
 * can filter on provided search filters:
 *  - currency 
 *  - itemNameLike (will find case-insensitive, partial matches)
 *  - minCost
 *  - maxCost
 */

router.get('/', async function (req, res, next) {
    try {
        const { currency, itemNameLike, minCost, maxCost } = req.query;

        const items = await Item.findAll({ currency, itemNameLike, minCost, maxCost });

        return res.json({ items });
    }
    catch (err) {
        return next(err);
    }
});

/** GET /[id]  =>  { item }
 * 
 *  item is { id, item_name, currency, cost, url } 
 */

router.get('/:id', async function (req, res, next) {
    try {
        const item = await Item.get(req.params.id);
        return res.json({ item });
    }
    catch (err) {
        return next(err);
    }
});


export default router;