import express, { Request, Response } from "express";
import { prisma } from "./prisma";
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("This Endpoint is Working Good :)");
});

///----------------------------------------------------------
//
//
//
//-----------------------------------------------------------
///----------------ITEMS ENDPOINTS --------------------------
//-----------------------------------------------------------

app.post("/items", async (req: Request, res: Response) => {
    const { id } = req.body;
    console.log(req.body, id);
    const items = new Items();

    const r = await items.getItem(id);
    if (!r) {
        console.log("Item not retrieved");
        res.status(500).send("Item not retrieved");
    } else {
        res.status(200).send(r);
    }
});

app.post("/item-create", async (req: Request, res: Response) => {
    const { menuId, name, description, price } = req.body;
    const items = new Items();
    const r = await items.createItem(menuId, name, description, price);
    if (r) {
        console.log("Item created");
        res.status(200).send("Item created");
    } else {
        console.log("Item not created");
        res.status(500).send("Item not created");
    }
});

app.post("/item-update", async (req: Request, res: Response) => {
    const { itemId, name, description, price } = req.body;
    const items = new Items();
    const r = await items.updateItem(itemId, name, description, price);
    if (r) {
        console.log("Item updated");
        res.status(200).send("Item updated");
    } else {
        console.log("Item not updated");
        res.status(500).send("Item not updated");
    }
});

app.post("/item-delete", async (req: Request, res: Response) => {
    const { itemId } = req.body;
    const items = new Items();
    const r = await items.deleteItem(itemId);
    if (r) {
        console.log("Item deleted");
        res.status(200).send("Item deleted");
    } else {
        console.log("Item not deleted");
        res.status(500).send("Item not deleted");
    }
});

///----------------------------------------------------------
//
//
//
//-----------------------------------------------------------
///----------------MENU ENDPOINTS ---------------------------
//-----------------------------------------------------------

app.get("/menu", async (req: Request, res: Response) => {
    const menu = new Menu();

    const r = await menu.getMenu();
    if (!r) {
        console.log("Menu not retrieved");
        res.status(500).send("Menu not retrieved");
    }
    res.status(200).send(r);
});

app.post("/menu-create", async (req: Request, res: Response) => {
    console.log(req.body);
    const { name, description } = req.body;
    const menu = new Menu();
    const r = await menu.createMenu(name, description);
    if (r) {
        console.log("Menu created");
        res.status(200).send("Menu created");
    } else {
        console.log("Menu not created");
        res.status(500).send("Menu not created");
    }
});

app.post("/menu-update", async (req: Request, res: Response) => {
    const { id, name, description } = req.body;
    const menu = new Menu();
    const r = await menu.updateMenu(id, name, description);
    if (r) {
        console.log("Menu updated");
        res.status(200).send("Menu updated");
    } else {
        console.log("Menu not updated");
        res.status(500).send("Menu not updated");
    }
});

app.post("/menu-delete", async (req: Request, res: Response) => {
    const { id } = req.body;
    const menu = new Menu();
    const r = await menu.deleteMenu(id);
    if (r) {
        console.log("Menu deleted");
        res.status(200).send("Menu deleted");
    } else {
        console.log("Menu not deleted");
        res.status(500).send("Menu not deleted");
    }
});

///----------------------------------------------------------
//
//
//
//-----------------------------------------------------------

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

class Menu {
    async createMenu(menuName: string, menuDescription: string) {
        try {
            const d = await prisma.menu.create({
                data: {
                    name: menuName,
                    description: menuDescription,
                },
            });
            console.log(d);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateMenu(id: string, name: string, description: string) {
        try {
            const d = await prisma.menu.update({
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
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteMenu(id: string) {
        try {
            const d = await prisma.menu.delete({
                where: {
                    id,
                },
            });
            console.log(d);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getMenu() {
        try {
            const d = await prisma.menu.findMany();
            console.log(d);
            return d;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

class Items {
    async createItem(
        menuId: string,
        name: string,
        description: string,
        price: number
    ) {
        try {
            const d = await prisma.item.create({
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
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateItem(
        itemId: string,
        name: string,
        description: string,
        price: number
    ) {
        try {
            const d = await prisma.item.update({
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
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteItem(id: string) {
        try {
            const d = await prisma.item.delete({
                where: {
                    id: id,
                },
            });
            console.log(d);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getItem(menuId: string) {
        console.log(menuId);
        try {
            const d = await prisma.item.findMany({
                where: {
                    menu_id: menuId,
                },
            });
            console.log(d);
            return d;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}
