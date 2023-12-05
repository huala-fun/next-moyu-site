import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2>页面未找到</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="text-blue-500">返回首页</Link>
    </div>
  );
}
