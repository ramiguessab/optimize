import { NextResponse, NextRequest } from "next/server";

// import { Resend } from "resend";

// const API_KEY = "re_2a5SWiGR_6de25CXUGo97r37wYZhEctPq";

// const resend = new Resend(API_KEY);

export async function GET(request: NextRequest) {
    return NextResponse.json("hello");
}
