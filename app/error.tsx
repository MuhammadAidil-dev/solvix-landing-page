"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="space-y-3 rounded border border-red-200 bg-red-50 p-4">
      <h2 className="font-semibold text-red-800">Terjadi kesalahan</h2>
      <p className="text-sm text-red-700">{error.message}</p>
      <button
        onClick={reset}
        className="rounded bg-red-700 px-3 py-1.5 text-sm text-white hover:bg-red-800"
      >
        Coba lagi
      </button>
    </div>
  );
}
