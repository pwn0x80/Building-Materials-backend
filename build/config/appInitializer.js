"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.initializeDatabase = void 0;
const database_1 = require("./database");
function initializeDatabase() {
    (0, database_1.connectMongoDB)();
}
exports.initializeDatabase = initializeDatabase;
function startServer(app, port) {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
exports.startServer = startServer;
//# sourceMappingURL=appInitializer.js.map