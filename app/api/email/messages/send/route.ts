import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { sendEmail } from "@/lib/services/gmail/messages/service";

export async function POST(req: NextRequest, res: NextResponse) {
  try { 

      const session = await auth();

      if(!session?.user?.id) {
         return NextResponse.json(
             { error: "Unauthorized" },
             { status: 401 }
         );
     }  

     const tenantId = `user_${session?.user.id}`

    const body = await req.json();

    const { to, subject, body: messageBody } = body;

    if (!to || !subject || !messageBody) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const data = await sendEmail({ to, subject, body: messageBody }, tenantId);

    return NextResponse.json(
      {
        message: "Email sent successfully",
        data: data,
      },
      { status: 200 },
    );
  } catch (error: Error | any) {
    return NextResponse.json(
      { error: "Failed to send email", details: error?.message },
      { status: 500 },
    );
  }
}
