import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-[40px] font-semibold text-ink-900">404</p>
      <p className="mt-1 text-[13.5px] text-ink-500">This page doesn&rsquo;t exist.</p>
      <Link to="/" className="btn-primary mt-4">
        Back to Dashboard
      </Link>
    </div>
  );
}
