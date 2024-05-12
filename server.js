"use strict"

import app from './app.js';
import { PORT } from './config.js';

app.listen(PORT, function () {
    console.log(`Server starting on http://localhost:${PORT}`);
});