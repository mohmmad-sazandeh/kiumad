import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

const dbFile = path.join(process.cwd(), "db.json");

interface Params {
  params: { productId: string };
}

export async function DELETE(req: NextRequest) {
  try {
    const id = "1";
    console.log("req", req);

    const data = fs.readFileSync(dbFile, "utf-8");
    const json = JSON.parse(data);

    json.Products = json.Products.filter(
      (p: any) => String(p.id) !== String(id)
    );

    fs.writeFileSync(dbFile, JSON.stringify(json, null, 2));

    return NextResponse.json({ message: "✅ محصول با موفقیت حذف شد" });
  } catch (err) {
    console.error("❌ DELETE Error:", err);
    return NextResponse.json({ error: "خطا در حذف محصول" }, { status: 500 });
  }
}
