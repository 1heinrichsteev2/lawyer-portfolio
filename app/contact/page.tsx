import type { Metadata } from 'next';
import BlurText from '@/components/animations/BlurText';
import LegalNote from '@/components/legal/LegalNote';
import ContactForm from '@/components/sections/ContactForm';
import ContactIcons from '@/components/sections/ContactIcons';
import PageIntro from '@/components/sections/PageIntro';
import BorderGlow from '@/components/ui/BorderGlow';
import ImageSlot from '@/components/ui/ImageSlot';
import { advocate } from '@/data/advocate';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact details and office information for ${advocate.name}, ${advocate.designation}.`,
  alternates: { canonical: '/contact' }
};

export default function ContactPage() {
  return (
    <>
      <PageIntro kicker="Contact" heading="Get in touch" intro="Office address, phone, email and hours. For anything specific to your situation, please arrange to speak with the advocate directly." />
      <section className="shell pb-16">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-5">
            <BorderGlow>
              <div className="p-7 sm:p-9">
                <BlurText as="h2" text="Contact details" className="label label-rule" />
                <ContactIcons className="mt-10 flex-col gap-y-9" />
                <dl className="mt-10 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-ivory/[0.08] pt-6 text-[0.88rem]">
                  <dt className="text-stone">Office hours</dt>
                  <dd className="text-ivory/85">{advocate.officeHours}</dd>
                  <dt className="text-stone">Courts / city</dt>
                  <dd className="text-ivory/85">{advocate.courts}</dd>
                </dl>
              </div>
            </BorderGlow>
            <ImageSlot slot="contactOffice" shape="slab" className="hidden aspect-[16/10] w-full lg:block" depth="far" />
          </div>
          <div className="lg:col-span-7">
            <div className="glass rounded-[22px] p-6 sm:p-10">
              <span className="glass-edge" />
              <h2 className="display display-sm">Request information</h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="shell">
        <LegalNote />
      </div>
    </>
  );
}
