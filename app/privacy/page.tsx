import type { Metadata } from 'next';
import PageIntro from '@/components/sections/PageIntro';
import { advocate } from '@/data/advocate';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'What information this website collects, why, and how it is handled.',
  alternates: { canonical: '/privacy' }
};

export default function PrivacyPage() {
  const formLive = Boolean(site.contactEndpoint);
  const blocks: { id: string; title: string; paras: string[] }[] = [
    {
      id: 'summary',
      title: 'Summary',
      paras: [
        'This website does not use analytics, advertising or tracking cookies, and does not load fonts or scripts from third-party services. It collects personal information only if you choose to send a message through the contact form.'
      ]
    },
    {
      id: 'form',
      title: 'The contact form',
      paras: formLive
        ? [
            'If you submit the contact form, the details you enter (name, email address, optional phone number, topic and message) are sent to the advocate so that your enquiry can be answered. They are used for that purpose only and are not sold or shared for marketing.',
            'Please do not include confidential or sensitive information in the form.'
          ]
        : [
            'Online submission is currently switched off. Details typed into the form are not transmitted or stored anywhere. When online submission is enabled, this section will describe how the information is handled.'
          ]
    },
    {
      id: 'device',
      title: 'Information stored on your device',
      paras: [
        'The website stores two small values in your browser: one in local storage recording that you have acknowledged the disclaimer, and one in session storage so the opening animation plays only once per visit. They are not sent to any server and you can clear them at any time through your browser settings.'
      ]
    },
    {
      id: 'hosting',
      title: 'Hosting',
      paras: [
        'Like any website, the server that hosts this site may keep standard technical logs (such as IP address, browser type and time of request) for security and operation. [HOSTING PROVIDER] — add the name of the hosting provider and a link to its privacy policy.'
      ]
    },
    {
      id: 'rights',
      title: 'Your choices',
      paras: [
        `You may ask what personal information has been received through this website, and ask for it to be corrected or deleted, by writing to ${advocate.email}. Information is handled in accordance with applicable Indian law, including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 as its provisions apply.`
      ]
    },
    {
      id: 'changes',
      title: 'Changes',
      paras: ['This policy will be updated if the website starts collecting information in a different way. Last updated: [DATE].']
    }
  ];
  return (
    <>
      <PageIntro kicker="Privacy policy" heading="What this website collects" />
      <div className="shell">
        <div className="mx-auto max-w-3xl">
          {blocks.map(b => (
            <section key={b.id} id={b.id} className="border-t border-ivory/[0.08] py-12">
              <h2 className="display display-sm">{b.title}</h2>
              <div className="prose-legal mt-6">
                {b.paras.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
