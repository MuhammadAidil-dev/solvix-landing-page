import { ProductList } from "../features/product/components/table/ProductList";

export default function HomePage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Solvix Frontend</h1>
        <p className="text-sm text-zinc-600">
          Contoh public list (tanpa token) + auth flow via Zustand memory.
        </p>
      </header>
      <ProductList />
    </section>
  );
}