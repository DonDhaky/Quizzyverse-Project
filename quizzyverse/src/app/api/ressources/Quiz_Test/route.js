import {NextResponse} from "next/server"
import quizSettings from "./settings.json"

export async function GET(request, context){
    return NextResponse.json({
        quizSettings,
    });
}
