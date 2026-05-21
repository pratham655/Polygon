import { NextRequest, NextResponse } from "next/server";
import pdfParse from "pdf-parse";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    const data = await pdfParse(buffer);

    return NextResponse.json({
      text: data.text,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to extract PDF" },
      { status: 500 }
    );
  }
}