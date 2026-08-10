import connectDB from "../lib/mongodb";

export default async function TestDB() {
  try {
    await connectDB();
    return <h1>MongoDB Connected Successfully </h1>;
  } catch (error) {
    return <h1>MongoDB Connection Failed ❌</h1>;
  }
}