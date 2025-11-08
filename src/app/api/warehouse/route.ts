import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbFile = path.join(process.cwd(), "db.json");

export async function POST(req: Request) {
  try {
    const warehouse = await req.json();

    const data = fs.readFileSync(dbFile, "utf-8");
    const json = JSON.parse(data);

    if (!Array.isArray(json.Warehouses)) json.Warehouses = [];
    if (!Array.isArray(json.Products)) json.Products = [];

    json.Warehouses.push(warehouse);

    json.Products.push(...warehouse.Products);

    fs.writeFileSync(dbFile, JSON.stringify(json, null, 2));

    return NextResponse.json({ message: "✅ بار جدید با موفقیت اضافه شد" });
  } catch (err) {
    console.error("خطا در ذخیره انبار:", err);
    return NextResponse.json({ error: "خطا در ذخیره انبار" }, { status: 500 });
  }
}
