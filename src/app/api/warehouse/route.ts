// app/api/warehouses/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbFile = path.join(process.cwd(), "db.json");

export async function GET() {
  try {
    const data = fs.readFileSync(dbFile, "utf-8");
    const json = JSON.parse(data);

    if (!Array.isArray(json.Warehouses)) json.Warehouses = [];

    const warehousesWithId = json.Warehouses.map((w: any, idx: number) => ({
      id: w.id || `${w.name}-${idx}`,
      name: w.name,
      dateTime: w.dateTime,
      Products: w.Products || [],
    }));

    return NextResponse.json({ Warehouses: warehousesWithId });
  } catch (err) {
    console.error("خطا در خواندن انبارها:", err);
    return NextResponse.json({ error: "خطا در خواندن انبارها" }, { status: 500 });
  }
}


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

export async function DELETE(req: any) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID محصول مشخص نشده" }, { status: 400 });

    const data = fs.readFileSync(dbFile, "utf-8");
    let json = JSON.parse(data);

    json.Warehouses = json.Warehouses
      .map((w: any) => ({
        ...w,
        Products: w.Products.filter((p: any) => String(p.id) !== String(id)),
      }))
      .filter((w: any) => w.Products.length > 0); // حذف انبارهای خالی

    fs.writeFileSync(dbFile, JSON.stringify(json, null, 2));

    return NextResponse.json({ message: "✅ محصول و انبار خالی حذف شدند" });
  } catch (err) {
    console.error("❌ DELETE Error:", err);
    return NextResponse.json({ error: "خطا در حذف محصول و انبار" }, { status: 500 });
  }
}


