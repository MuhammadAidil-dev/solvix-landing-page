import { Container } from "../ui/Section";

/**
 * Satu-satunya blok solid di tengah halaman (DESIGN.md §5, §9.14).
 * Jangan ditambah blok kedua tanpa persetujuan ulang DESIGN.md.
 */
export function PullQuote() {
  return (
    <section className="bg-navy py-20">
      <Container>
        <p className="mx-auto max-w-[760px] text-center font-serif text-[22px] font-light italic leading-[1.4] tracking-[-0.01em] text-paper md:text-[32px]">
          &ldquo;Kami tidak menjual perangkat lunak. Kami menyelesaikan masalah operasional yang
          menghambat bisnis Anda.&rdquo;
        </p>
      </Container>
    </section>
  );
}
