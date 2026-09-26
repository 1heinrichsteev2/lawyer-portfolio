import BlurText from '@/components/animations/BlurText';
import LinkButton from '@/components/ui/LinkButton';
import ContactIcons from './ContactIcons';

export default function ContactBand() {
  return (
    <section aria-labelledby="contact-band-heading" className="shell py-24">
      <div className="glass relative overflow-hidden rounded-[28px] px-6 py-14 sm:px-12 md:py-20">
        <span className="glass-edge" />
        <div aria-hidden="true" className="arch pointer-events-none absolute -right-24 -bottom-40 h-[28rem] w-[20rem] border border-champagne/20" />
        <div className="relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <BlurText as="p" text="Contact" className="label label-rule" />
            <h2 id="contact-band-heading" className="display display-lg mt-6">
              Get in touch.
            </h2>
            <p className="lede mt-5">Office details and contact information. Please do not send confidential details through this website.</p>
            <div className="mt-8">
              <LinkButton href="/contact">View contact details</LinkButton>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
            <ContactIcons className="flex-col gap-y-9" />
          </div>
        </div>
      </div>
    </section>
  );
}
