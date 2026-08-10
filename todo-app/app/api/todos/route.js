import {NextResponse} from "next/server";

import connectDB from "../../lib/mongodb"
import Todo from "../../models/Todo"
import { getAuthenticatedUserId } from "../../lib/auth.js";


//POST
export async function POST(req) {
  try {
    await connectDB();
    const userId =  await getAuthenticatedUserId(req);

     if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

// 📥 body
    const body = await req.json();
    const title = body?.title;
    const dueDate = body?.dueDate;
    const priority = body?.priority || "Low";
    const category = body?.category || "General";

    // 🧠 validation
    if (!title || !title.trim()) {
      return NextResponse.json(
        { message: "Task title is required" },
        { status: 400 }
      );
    }

    // 📦 create todo
    const todo = await Todo.create({
      title: title.trim(),
      dueDate: dueDate ? new Date(dueDate) : null,
      priority,
      category,
      userId
    });

    return NextResponse.json(todo, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

//Get 
export async function GET(req) {
  try {
    await connectDB();
    const userId =  await getAuthenticatedUserId(req);


   if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    
const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const priority = searchParams.get("priority");
    const category = searchParams.get("category");
    const sort = searchParams.get("sort") || "newest";
    const status = searchParams.get("status") || "all";


    // 📦 pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // 🧠 QUERY BUILDER (no if-else mess)
    const query = {
       userId,
      ...(priority && priority !== "All" && { priority }),
      ...(category && category !== "All" && { category }),
    };
    

    // 🔍 SEARCH (text index OR fallback regex)
    if (search) {
       query.title = { $regex: search, $options: "i" };
    }

    
    if (status === "completed") {
  query.completed = true;
}

if (status === "all") {
  // no filter
}

if (status === "overdue") {
  query.completed = false;
  query.dueDate = { $lt: new Date() }; // if you have dueDate
}

if (status === "today") {
  const start = new Date();
  start.setHours(0,0,0,0);

  const end = new Date();
  end.setHours(23,59,59,999);

  query.dueDate = { $gte: start, $lte: end };
}

    // ⬆ SORTING
    const sortMap = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      priority: { priority: -1 },
      dueDate: { dueDate: 1 },
    };

    const sortOption = sortMap[sort] || sortMap.newest;

    // 📦 FETCH
    const todos = await Todo.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await Todo.countDocuments(query);

    return NextResponse.json({
      data: todos,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}