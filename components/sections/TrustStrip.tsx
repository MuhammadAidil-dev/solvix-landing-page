import { IconCheck } from "../ui/Icon";
import { FACTS } from "./data";

export function TrustStrip() {
  return (
    <section className="border-y border-hairline bg-cream py-8">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center justify-center gap-4 px-6 text-center lg:flex-row lg:gap-10">
        <p className="text-[15px] font-medium text-muted">Berbadan hukum dan terdaftar</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {FACTS.map((fact) => (
            <li key={fact} className="flex items-center gap-2 text-[15px] font-medium text-navy">
              <IconCheck className="h-4 w-4 text-accent" />
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
