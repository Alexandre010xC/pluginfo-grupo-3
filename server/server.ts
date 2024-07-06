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
      products: products
    });
  } catch (error: any) {
      console.error("Erro ao listar produtos", error);
      res.send({
        message: "error when getting product list",
      });
  }
})

app.post("/create_product", async (req: Request, res: Response) => {
  const { name, brand, price, desc, tags, img_src, color } = req.body
  try {
    const product = await prisma.product.create({
      data: {
        name: name,
        brand: brand,
        price: parseFloat(price),
        description: desc,
        tags: tags,
        image_source: img_src,
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

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})