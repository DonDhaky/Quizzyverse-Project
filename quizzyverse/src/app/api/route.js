import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(req) {
  try {
    const directoryPath = path.join(process.cwd(), 'src', 'app', 'api', 'ressources');
    console.log("\nDIRECTORY PATH:");
    console.log("===>", directoryPath, "\n");

    const files = await fs.readdir(directoryPath);

    // Filter to keep only directories
    const directories = [];
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) {
        directories.push(file);
      }
    }
    console.log("\n", directories, "\n");

    return NextResponse.json({ directories });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify({ error: 'Failed to read directory' }), {
      status: 500,
    });
  }
}
