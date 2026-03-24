import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BASE_URL;

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const res = await fetch(`${BACKEND_URL}/api/user/${id}`, {
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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const res = await fetch(`${BACKEND_URL}/api/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return NextResponse.json(
        { message: data?.message || "Failed to update user" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API /users PUT error", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const res = await fetch(`${BACKEND_URL}/api/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return NextResponse.json(
        { message: data?.message || "Failed to delete user" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API /users DELETE error", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
