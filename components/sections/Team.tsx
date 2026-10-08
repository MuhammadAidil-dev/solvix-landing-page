import { Section } from "../ui/Section";

// PLACEHOLDER — ganti nama dan initials dengan data asli (spec §5.1).
// Kalau foto tim tersedia, `div.av` diganti `next/image` dengan avatar lingkaran.
const TEAM = [
  { initials: "AR", name: "Nama Pendiri", role: "Founder & Lead Engineer" },
  { initials: "BS", name: "Nama Developer", role: "Backend Engineer" },
  { initials: "CP", name: "Nama Developer", role: "Frontend Engineer" },
  { initials: "DT", name: "Nama Tester", role: "QA & DevOps" },
];

export function Team() {
  return (
    <Section
      id="tim"
      eyebrow="Tim"
      heading={
        <>
          Orang-orang di <em>balik</em> Solvix.
        </>
      }
      subheading="Tim kecil yang fokus, dengan tanggung jawab yang jelas."
    >
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {TEAM.map((member) => (
          <div key={member.name} className="text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#E6EEF9] to-[#CFDEF2] text-[26px] font-light text-navy md:h-28 md:w-28">
              {member.initials}
            </div>
            <h3 className="text-[17px] font-medium">{member.name}</h3>
            <p className="mt-1 text-[14px] font-light text-muted">{member.role}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
