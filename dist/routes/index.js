"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerApi = void 0;
const express_1 = __importDefault(require("express"));
const routerScrapping = require('./scrapping-routes');
function routerApi(app) {
    const router = express_1.default.Router();
    app.use('/api/v1', router);
    router.use('/scrapping', routerScrapping);
}
exports.routerApi = routerApi;
