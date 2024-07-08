import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express"
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;

const prisma = new PrismaClient()


app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "hello backend" });
})

app.get("/get_products", async (req: Request, res: Response) => {

  try {
    const products = await prisma.product.findMany()
    res.send({
      message: "products retrieved succesfully",
      products: products,
    });
  } catch (error: any) {
      console.error("Erro ao listar produtos", error);
      res.send({
        message: "error when getting product list",
      });
  }
})

app.get("/filter_products", async (req: Request, res: Response) => {

  const name:any = req.query.name
  const tags:any = req.query.tags
  try {
    
  const products = await prisma.product.findMany({
        where: {
          AND: [
            {
              name: {
                contains: name,
              },
            },
            {
              tags: {
                contains: tags,
              },
            },
          ],
        },
      });

    res.send({
      message: "products retrieved succesfully",
      products: products,
    });
  } catch (error: any) {
      console.error("Erro ao listar produtos", error);
      res.send({
        message: "error when getting product list",
      });
  }
})

app.get("/get_product/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  try {
    const product = await prisma.product.findUnique({
      where: {
        id:id
      }
    })
    res.send({
      message: "product retrieved succesfully",
      product: product
    });
  } catch (error: any) {
      console.error("Erro ao listar o produto", error);
      res.send({
        message: "error when getting product",
      });
  }
})

app.post("/create_product", async (req: Request, res: Response) => {
  const { name, brand, price, description, tags, image_source, color } = req.body
  try {
    const product = await prisma.product.create({
      data: {
        name: name,
        brand: brand,
        price: parseFloat(price),
        description: description,
        tags: tags,
        image_source: image_source,
        color: color
      }
    })
    res.send({
      message: "product added succesfully",
      product: product
    });
  } catch (error: any) {
      console.error("Erro ao criar produto:", error);
      res.send({
        message: "error when creating product",
      });
  }

})

app.put("/edit_product", async (req: Request, res: Response) => {
  const { name, brand, price, description, tags, image_source, color, id } = req.body
  try {
    const product = await prisma.product.update({
      where: {
        id:id
      },
      data: {
        name: name,
        brand: brand,
        price: parseFloat(price),
        description: description,
        tags: tags,
        image_source: image_source,
        color: color
      }
    })
    res.send({
      message: "product edited succesfully",
      product: product,
    });
  } catch (error: any) {
      console.error("Erro ao editar produto:", error);
      res.send({
        message: "error when editing product",
      });
  }

})

app.delete("/delete_product/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  try {
    const product = await prisma.product.delete({
      where: {
        id:id
      },
    })
    res.send({
      message: "product deleted succesfully",
      product: product,
    });
  } catch (error: any) {
      console.error("Erro ao deleter produto:", error);
      res.send({
        message: "error when deleting product",
      });
  }

})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})