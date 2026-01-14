import { NextRequest, NextResponse } from "next/server";

interface Comment {
  id: string;
  postSlug: string;
  author: string;
  content: string;
  date: string;
}

// In a real app, you'd use a database. For now, we'll use in-memory storage.
// In production, replace this with a proper database (e.g., Supabase, MongoDB, etc.)
let comments: Comment[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postSlug, author, content } = body;

    if (!postSlug || !author || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const comment: Comment = {
      id: Date.now().toString(),
      postSlug,
      author: author.trim(),
      content: content.trim(),
      date: new Date().toISOString(),
    };

    comments.push(comment);

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postSlug = searchParams.get("postSlug");

    let filteredComments = comments;
    if (postSlug) {
      filteredComments = comments.filter((c) => c.postSlug === postSlug);
    }

    // Sort by date (newest first)
    filteredComments.sort((a, b) => b.date.localeCompare(a.date));

    return NextResponse.json(filteredComments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
