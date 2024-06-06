import {NextResponse} from "next/server"

import fs from 'fs';
import path from 'path';

export async function POST(request, context) {
    console.log("IN TEMPLATE_COPY");
  const data  = await request.json()
  console.log(data);
  /*
  if (!destination) {
    res.status(400).json({ message: 'Source and destination are required' });
    return;
  }*/

  const sourcePath = path.join(process.cwd(), 'src', 'app', 'api', 'template_copy', 'presets', 'route.js');
  const destinationPath = path.join(process.cwd(), 'src', 'app', 'api', 'ressources', data.destination, 'route.js');
  console.log(sourcePath);
  console.log(destinationPath);

  
    fs.copyFile(sourcePath, destinationPath, (err) => {
        if (err) {
            console.error(err);
            return new NextResponse(err, {
                statut : 500,
            });
        }
        
        //res.status(200).json({ message: 'File copied successfully' });
        return NextResponse.json({
            status: 200,
            message: "File copied",
        });
    })
}

