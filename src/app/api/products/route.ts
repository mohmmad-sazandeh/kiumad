import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

const dbFile = path.join(process.cwd(), "db.json");

const readDB = () => JSON.parse(fs.readFileSync(dbFile, "utf-8"));
const writeDB = (data: any) =>
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));

export async function GET() {
  try {
    const json = readDB();
    return NextResponse.json(json);
  } catch (err) {
    return NextResponse.json({ error: "خطا در خواندن انبارها" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const newProduct = await req.json();
    const json = readDB();

    const warehouseId = newProduct.warehouseId;
    if (!warehouseId)
      return NextResponse.json({ error: "warehouseId لازم است" }, { status: 400 });

    const warehouse = json.Warehouses.find((w: any) => w.id == warehouseId);
    if (!warehouse)
      return NextResponse.json({ error: "انبار پیدا نشد" }, { status: 404 });

    warehouse.Products.push(newProduct);
    writeDB(json);

    return NextResponse.json(newProduct);
  } catch {
    return NextResponse.json({ error: "خطا در ذخیره" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const { warehouseId, id } = body;

    if (!warehouseId || !id) {
      return NextResponse.json(
        { error: "warehouseId و id لازم است" },
        { status: 400 }
      );
    }

    const json = readDB();
    const warehouse = json.Warehouses.find((w: any) => w.id == warehouseId);

    if (!warehouse)
      return NextResponse.json({ error: "انبار یافت نشد" }, { status: 404 });

    const productIndex = warehouse.Products.findIndex((p: any) => p.id == id);

    if (productIndex === -1)
      return NextResponse.json({ error: "محصول یافت نشد" }, { status: 404 });

    body.date = warehouse.Products[productIndex].date;

    warehouse.Products[productIndex] = body;

    writeDB(json);

    return NextResponse.json({ message: "ویرایش موفق", product: body });
  } catch (err) {
    console.error("PUT ERR:", err);
    return NextResponse.json({ error: "خطا در ویرایش" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const warehouseId = req.nextUrl.searchParams.get("warehouseId");

    if (!id || !warehouseId)
      return NextResponse.json({ error: "مقادیر ناقص است" }, { status: 400 });

    const json = readDB();

    const warehouse = json.Warehouses.find((w: any) => w.id == warehouseId);
    if (!warehouse)
      return NextResponse.json({ error: "انبار یافت نشد" }, { status: 404 });

    warehouse.Products = warehouse.Products.filter((p: any) => p.id != id);

    writeDB(json);

    return NextResponse.json({ message: "حذف موفق" });
  } catch {
    return NextResponse.json({ error: "خطا در حذف" }, { status: 500 });
  }
}
