import BlurText from '@/components/animations/BlurText';
import Reveal from '@/components/animations/Reveal';
import ImageSlot from '@/components/ui/ImageSlot';
import { advocate } from '@/data/advocate';

/** The particulars permitted by the BCI Rule 36 Schedule, shown as a record. */
export function ParticularsList({ compact = false }: { compact?: boolean }) {
  const rows: [string, string][] = [
    ['Name', advocate.name],
    ['Enrolment number', advocate.enrolmentNumber],
    ['Date of enrolment', advocate.enrolmentDate],
    ['State Bar Council (originally enrolled)', advocate.stateBarCouncilOriginal],
    ['State Bar Council (current roll)', advocate.stateBarCouncilCurrent],
    ['Bar Association', advocate.barAssociation],
    ['Academic qualifications', advocate.education.join('; ')],
    ['Professional qualifications', advocate.professionalQualifications.join('; ')],
    ['Courts', advocate.courts]
  ];
  return (
    <dl className="divide-y divide-ivory/[0.07]">
      {rows.map(([k, v]) => (
        <div key={k} className={compact ? 'grid gap-1 py-3.5 sm:grid-cols-[14rem_1fr] sm:gap-6' : 'grid gap-1 py-4 sm:grid-cols-[16rem_1fr] sm:gap-8'}>
          <dt className="text-[0.82rem] text-stone">{k}</dt>
          <dd className="text-[0.95rem] text-ivory/90">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Particulars() {
  return (
    <section aria-labelledby="particulars-heading" className="shell py-28 md:py-36">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <BlurText as="p" text="Professional information" className="label label-rule" />
          <h2 id="particulars-heading" className="display display-lg mt-6">
            On the record.
          </h2>
          <p className="lede mt-6">
            The particulars an advocate may publish under the Bar Council of India Rules, and nothing beyond them.
          </p>
          <Reveal variant="mask" className="mt-12 hidden lg:block">
            <ImageSlot slot="courtArchitecture" shape="arch" className="aspect-[4/5] w-full max-w-[20rem]" depth="far" />
          </Reveal>
        </div>
        <Reveal className="lg:col-span-7">
          <div className="glass rounded-[22px] p-6 sm:p-9">
            <span className="glass-edge" />
            <ParticularsList />
            <p className="mt-6 text-[0.78rem] text-stone">The advocate declares that the information furnished above is true.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
