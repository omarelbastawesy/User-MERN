import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BASE_URL;

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/user`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return NextResponse.json(
        { message: data?.message || "Failed to get user" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API /users GET error", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await fetch(`${BACKEND_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return NextResponse.json(
        { message: data?.message || "Failed to add user" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API /users POST error", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
