import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full">
      <header className="w-full p-4 bg-slate-400 flex gap-4">
        <Link href="#1">1</Link>
        <Link href="#2">2</Link>
      </header>
    </div>
  );
}
