import LinkButton from '@/components/ui/LinkButton';

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col justify-center pt-32">
      <p className="label label-rule">Page not found</p>
      <h1 className="display display-xl mt-6 max-w-[14ch]">This page is not on the record.</h1>
      <p className="lede mt-6">The address may have changed, or the page may have been removed.</p>
      <div className="mt-10 flex flex-wrap gap-4">
        <LinkButton href="/">Return home</LinkButton>
        <LinkButton href="/practice" variant="ghost">
          Practice areas
        </LinkButton>
      </div>
    </section>
  );
}
