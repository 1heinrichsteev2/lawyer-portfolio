import BlurText from '@/components/animations/BlurText';
import Reveal from '@/components/animations/Reveal';
import ImageSlot from '@/components/ui/ImageSlot';
import LinkButton from '@/components/ui/LinkButton';

export default function HomeIntro() {
  return (
    <section aria-labelledby="intro-heading" className="shell relative py-28 md:py-40">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative order-2 lg:order-1 lg:col-span-4">
          <Reveal variant="mask">
            <ImageSlot slot="chambers" shape="column" className="aspect-[3/4] w-full max-w-[22rem]" depth="near" />
          </Reveal>
          <div aria-hidden="true" className="glass absolute -right-2 bottom-10 hidden h-40 w-24 rounded-[999px_999px_10px_10px] lg:block" />
        </div>
        <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-6">
          <BlurText as="p" text="Introduction" className="label label-rule" />
          <h2 id="intro-heading" className="display display-lg mt-6 max-w-[16ch]">
            Criminal proceedings follow a procedure. Understanding it is the first step.
          </h2>
          <div className="prose-legal mt-10 grid gap-6 md:grid-cols-2">
            <p>
              A criminal matter can begin with a phone call, a notice or an arrest, and each stage has its own rules, time limits
              and safeguards. This website sets out, in plain language, how those stages work under the laws in force since
              1 July 2024.
            </p>
            <p>
              It also lists the advocate&apos;s professional particulars and the areas of practice, as the Bar Council of India
              Rules permit. It does not rank, compare or promise, because no honest account of litigation can.
            </p>
          </div>
          <div className="mt-10">
            <LinkButton href="/about" variant="ghost">
              About the advocate
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
