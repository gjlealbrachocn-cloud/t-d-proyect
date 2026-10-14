import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { products, publicProducts } from "./catalog.js";

const app = express();
const port = Number(process.env.PORT || 3000);
const publicUrl = process.env.PUBLIC_URL || `http://localhost:${port}`;
const here = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.get("/", (_req, res) => res.sendFile(path.join(here, "index.html")));
app.get("/styles.css", (_req, res) => res.sendFile(path.join(here, "styles.css")));
app.get("/app.js", (_req, res) => res.sendFile(path.join(here, "app.js")));

app.get("/api/products", (_req, res) => res.json(publicProducts));

app.post("/api/checkout", async (req, res) => {
  const { productId, size, quantity = 1 } = req.body ?? {};
  const product = products.find((item) => item.id === productId);
  const variant = product?.variants.find((item) => item.size === size);

  if (!product || !variant) return res.status(400).json({ error: "Producto o tamaño inválido." });
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
    return res.status(400).json({ error: "La cantidad debe ser de 1 a 10 unidades." });
  }
  if (!Number.isFinite(variant.unitPrice) || variant.unitPrice <= 0) {
    return res.status(409).json({ error: "Este decant todavía no tiene un precio configurado." });
  }
  if (!process.env.MP_ACCESS_TOKEN) {
    return res.status(503).json({ error: "Falta configurar Mercado Pago en el servidor." });
  }

  try {
    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: [{
          id: product.id,
          title: `${product.house} ${product.name} — decant ${variant.size}`,
          quantity,
          currency_id: "ARS",
          unit_price: variant.unitPrice
        }],
        back_urls: {
          success: `${publicUrl}/?pago=exitoso`,
          pending: `${publicUrl}/?pago=pendiente`,
          failure: `${publicUrl}/?pago=fallido`
        },
        auto_return: "approved",
        external_reference: `${product.id}-${Date.now()}`
      })
    });
    const preference = await response.json();
    if (!response.ok) {
      console.error("Mercado Pago preference error:", preference);
      return res.status(502).json({ error: "No se pudo iniciar el pago. Intentá de nuevo." });
    }
    res.json({ checkoutUrl: preference.init_point });
  } catch (error) {
    console.error("Checkout request failed:", error);
    res.status(502).json({ error: "No se pudo conectar con Mercado Pago." });
  }
});

app.listen(port, () => console.log(`T&D Perfums disponible en http://localhost:${port}`));