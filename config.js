"use strict";

import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "arandomstringoflettersandnumbers";
const PORT = process.env.PORT || 3001;

function getDatabaseUri() {
    return (process.env.NODE_ENV === "test")
        ? "postgresql:///xivtrader_test"
        : process.env.DATABASE_URL || "postgresql:///xivtrader";
}


export {
    SECRET_KEY,
    PORT,
    getDatabaseUri
};