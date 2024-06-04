import {NextResponse} from "next/server"

import fs from 'fs';
import path from 'path';

export async function POST(request, res) {
    //console.log(req);
    try {

        const data  = await request.json()
        console.log("data:", data);
        
        const fileDirectory = data.quizFolder
        const fileName = data.fileName
        const content = data.content
        console.log("\n\n\n\n\n");
        console.log(fileDirectory);
        console.log(fileName);
        console.log(content);
        console.log("\n\n\n\n\n");

        // Define the file path
        const filePath = path.join(process.cwd(), 'src', 'app', 'api', 'ressources', fileDirectory, fileName);
        fs.mkdirSync(path.dirname(filePath), { recursive: true })
        console.log(filePath, fileName);

        // Write the file
        fs.writeFileSync(filePath, content, 'utf8');

    } catch (error) {
        console.error('Error writing file:', error);
        return new NextResponse(error, {
          statut : 500,
        });
    }

    return NextResponse.json({
      message: "File written successfully",
    });

}
