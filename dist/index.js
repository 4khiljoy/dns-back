"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("./prisma");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("This Endpoint is Working Good :)");
});
///----------------------------------------------------------
//
//
//
//-----------------------------------------------------------
///----------------ITEMS ENDPOINTS --------------------------
//-----------------------------------------------------------
app.post("/items", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { menuId } = req.body;
    const items = new Items();
    const r = yield items.getItem(menuId);
    if (!r) {
        console.log("Item not retrieved");
        res.status(500).send("Item not retrieved");
    }
    else {
        res.status(200).send(r);
    }
}));
app.post("/item-create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { menuId, name, description, price } = req.body;
    const items = new Items();
    const r = yield items.createItem(menuId, name, description, price);
    if (r) {
        console.log("Item created");
        res.status(200).send("Item created");
    }
    else {
        console.log("Item not created");
        res.status(500).send("Item not created");
    }
}));
app.post("/item-update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemId, name, description, price } = req.body;
    const items = new Items();
    const r = yield items.updateItem(itemId, name, description, price);
    if (r) {
        console.log("Item updated");
        res.status(200).send("Item updated");
    }
    else {
        console.log("Item not updated");
        res.status(500).send("Item not updated");
    }
}));
app.post("/item-delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemId } = req.body;
    const items = new Items();
    const r = yield items.deleteItem(itemId);
    if (r) {
        console.log("Item deleted");
        res.status(200).send("Item deleted");
    }
    else {
        console.log("Item not deleted");
        res.status(500).send("Item not deleted");
    }
}));
///----------------------------------------------------------
//
//
//
//-----------------------------------------------------------
///----------------MENU ENDPOINTS ---------------------------
//-----------------------------------------------------------
app.get("/menu", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const menu = new Menu();
    const r = yield menu.getMenu();
    if (!r) {
        console.log("Menu not retrieved");
        res.status(500).send("Menu not retrieved");
    }
    res.status(200).send(r);
}));
app.post("/menu-create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { name, description } = req.body;
    const menu = new Menu();
    const r = yield menu.createMenu(name, description);
    if (r) {
        console.log("Menu created");
        res.status(200).send("Menu created");
    }
    else {
        console.log("Menu not created");
        res.status(500).send("Menu not created");
    }
}));
app.post("/menu-update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, description } = req.body;
    const menu = new Menu();
    const r = yield menu.updateMenu(id, name, description);
    if (r) {
        console.log("Menu updated");
        res.status(200).send("Menu updated");
    }
    else {
        console.log("Menu not updated");
        res.status(500).send("Menu not updated");
    }
}));
app.post("/menu-delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const menu = new Menu();
    const r = yield menu.deleteMenu(id);
    if (r) {
        console.log("Menu deleted");
        res.status(200).send("Menu deleted");
    }
    else {
        console.log("Menu not deleted");
        res.status(500).send("Menu not deleted");
    }
}));
///----------------------------------------------------------
//
//
//
//-----------------------------------------------------------
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
class Menu {
    createMenu(menuName, menuDescription) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const d = yield prisma_1.prisma.menu.create({
                    data: {
                        name: menuName,
                        description: menuDescription,
                    },
                });
                console.log(d);
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    updateMenu(id, name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const d = yield prisma_1.prisma.menu.update({
                    where: {
                        id,
                    },
                    data: {
                        name,
                        description,
                    },
                });
                console.log(d);
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    deleteMenu(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const d = yield prisma_1.prisma.menu.delete({
                    where: {
                        id,
                    },
                });
                console.log(d);
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    getMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const d = yield prisma_1.prisma.menu.findMany();
                console.log(d);
                return d;
            }
            catch (error) {
                console.log(error);
                return [];
            }
        });
    }
}
class Items {
    createItem(menuId, name, description, price) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const d = yield prisma_1.prisma.item.create({
                    data: {
                        // menu_id: menuId,
                        menu: { connect: { id: menuId } },
                        name,
                        description,
                        price: parseFloat(price.toString()),
                    },
                });
                console.log(d);
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    updateItem(itemId, name, description, price) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const d = yield prisma_1.prisma.item.update({
                    where: {
                        id: itemId,
                    },
                    data: {
                        name,
                        description,
                        price,
                    },
                });
                console.log(d);
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    deleteItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const d = yield prisma_1.prisma.item.delete({
                    where: {
                        id: id,
                    },
                });
                console.log(d);
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    getItem(menuId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const d = yield prisma_1.prisma.item.findMany({
                    where: {
                        menu_id: menuId,
                    },
                });
                console.log(d);
                return d;
            }
            catch (error) {
                console.log(error);
                return [];
            }
        });
    }
}
