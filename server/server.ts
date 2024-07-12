import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;

const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "hello backend" });
});

app.get("/get_products", async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.send({
      message: "products retrieved succesfully",
      products: products,
    });
  } catch (error: any) {
    console.error("Erro ao listar produtos", error);
    return res.status(500).send({
      message: "error when getting product list",
    });
  }
});

app.get("/filter_products", async (req: Request, res: Response) => {
  const name: string | undefined = req.query.name as string | undefined;
  const tags: string | undefined = req.query.tags as string | undefined;
//<<<<<<< Igor-Spínola
  //const quantity: number | undefined = req.query.quantity
    //? parseInt(req.query.quantity as string, 10)
    //: undefined;
//=======
  const quantity: number | undefined = req.query.quantity ? parseInt(req.query.quantity as string, 10) : undefined;
//>>>>>>> tests

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
// <<<<<<< Igor-Spínola
//           },
//         ],
//       },
//       take: quantity || undefined,
//     });
// =======
          ],
        },
        take: quantity || undefined,
      });
// >>>>>>> tests

    res.send({
      message: "products retrieved succesfully",
      products: products,
    });
  } catch (error: any) {
    console.error("Erro ao listar produtos", error);
    return res.status(400).send({
      message: "error when getting product list",
    });
  }
});

app.get("/get_product/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product)
      return res.status(404).send({
        message: "product not found",
      });

    return res.status(200).send({
      message: "product retrieved succesfully",
      product: product,
    });
  } catch (error: any) {
    console.error("Erro ao listar o produto", error);
    return res.status(500).send({
      message: "error when getting product",
    });
  }
});

app.post("/create_product", async (req: Request, res: Response) => {
  const { name, brand, price, description, tags, image_source, color } =
    req.body;
  try {
    const product = await prisma.product.create({
      data: {
        name: name,
        brand: brand,
        price: parseFloat(price),
        description: description,
        tags: tags,
        image_source: image_source,
        color: color,
      },
    });
    res.send({
      message: "product added succesfully",
      product: product,
    });
  } catch (error: any) {
    console.error("Erro ao criar produto:", error);
    return res.status(400).send({
      message: "error when creating product",
    });
  }
});

app.put("/edit_product", async (req: Request, res: Response) => {
  const { name, brand, price, description, tags, image_source, color, id } =
    req.body;
  try {
    const product = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        brand: brand,
        price: parseFloat(price),
        description: description,
        tags: tags,
        image_source: image_source,
        color: color,
      },
    });
    res.send({
      message: "product edited succesfully",
      product: product,
    });
  } catch (error: any) {
    console.error("Erro ao editar produto:", error);
    return res.status(400).send({
      message: "error when editing product",
    });
  }
});

app.delete("/delete_product/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const product = await prisma.product.delete({
      where: {
        id: id,
      },
    });
    res.send({
      message: "product deleted succesfully",
      product: product,
    });
  } catch (error: any) {
    console.error("Erro ao deleter produto:", error);
    return res.status(400).send({
      message: "error when deleting product",
    });
  }
});

app.put("/add_to_cart/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const product = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        in_cart: true,
      },
    });
    res.status(200).send({
      message: "product added to cart succesfully",
      product: product,
    });
  } catch (error: any) {
    console.error("Erro ao adicionar produto ao carrinho:", error);
    return res.status(400).send({
      message: "error when adding to cart",
    });
  }
});

app.put("/remove_from_cart/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const product = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        in_cart: false,
      },
    });
    res.send({
      message: "product removed from cart succesfully",
      product: product,
    });
  } catch (error: any) {
    console.error("Erro ao remover produto do carrinho:", error);
    return res.status(400).send({
      message: "error when removing from cart",
    });
  }
});

app.put("/add_to_favorites/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const product = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        in_favorites: true,
      },
    });
    res.send({
      message: "product added to favorites succesfully",
      product: product,
    });
  } catch (error: any) {
    console.error("Erro ao adicionar produto aos favoritos:", error);
    return res.status(400).send({
      message: "error when adding to favorites",
    });
  }
});

app.put("/remove_from_favorites/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const product = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        in_favorites: false,
      },
    });
    res.send({
      message: "product removed from favorites succesfully",
      product: product,
    });
  } catch (error: any) {
    console.error("Erro ao remover produto dos favoritos:", error);
    return res.status(400).send({
      message: "error when removing from favorites",
    });
  }
});

app.get("/get_cart", async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        in_cart: true,
      },
    });
    return res.send({
      message: "cart retrieved succesfully",
      products: products,
    });
  } catch (error: any) {
    console.error("Erro ao listar carrinho", error);
    return res.status(500).send({
      message: "error when getting cart",
    });
  }
});
app.get("/get_favorites", async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        in_favorites: true,
      },
    });
    res.send({
      message: "favorite products retrieved succesfully",
      products: products,
    });
  } catch (error: any) {
    console.error("Erro ao listar favoritos", error);
    return res.status(500).send({
      message: "error when getting favorites",
    });
  }
});

app.put("/add_to_cart/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  try {
    const product = await prisma.product.update({
      where: {
        id:id
      },
      data: {
        in_cart: true
      }
    })
    res.send({
      message: "product added to cart succesfully",
      product: product,
    });
  } catch (error: any) {
      console.error("Erro ao adicionar produto ao carrinho:", error);
      res.send({
        message: "error when adding to cart",
      });
  }

})

app.put("/remove_from_cart/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  try {
    const product = await prisma.product.update({
      where: {
        id:id
      },
      data: {
        in_cart: false
      }
    })
    res.send({
      message: "product removed from cart succesfully",
      product: product,
    });
  } catch (error: any) {
      console.error("Erro ao remover produto do carrinho:", error);
      res.send({
        message: "error when removing from cart",
      });
  }

})

app.put("/add_to_favorites/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  try {
    const product = await prisma.product.update({
      where: {
        id:id
      },
      data: {
        in_favorites: true
      }
    })
    res.send({
      message: "product added to favorites succesfully",
      product: product,
    });
  } catch (error: any) {
      console.error("Erro ao adicionar produto aos favoritos:", error);
      res.send({
        message: "error when adding to favorites",
      });
  }

})

app.put("/remove_from_favorites/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  try {
    const product = await prisma.product.update({
      where: {
        id:id
      },
      data: {
        in_favorites: false
      }
    })
    res.send({
      message: "product removed from favorites succesfully",
      product: product,
    });
  } catch (error: any) {
      console.error("Erro ao remover produto dos favoritos:", error);
      res.send({
        message: "error when removing from favorites",
      });
  }

})

app.get("/get_cart", async (req: Request, res: Response) => {

  try {
    const products = await prisma.product.findMany({
      where:{
        in_cart: true
      }
    })
    res.send({
      message: "cart retrieved succesfully",
      products: products,
    });
  } catch (error: any) {
      console.error("Erro ao listar carrinho", error);
      res.send({
        message: "error when getting cart",
      });
  }
})
app.get("/get_favorites", async (req: Request, res: Response) => {

  try {
    const products = await prisma.product.findMany({
      where: {
        in_favorites: true
      }
    })
    res.send({
      message: "favorite products retrieved succesfully",
      products: products,
    });
  } catch (error: any) {
      console.error("Erro ao listar favoritos", error);
      res.send({
        message: "error when getting favorites",
      });
  }
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
