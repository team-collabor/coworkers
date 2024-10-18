import Link from 'next/link';

export default function PreviewPage() {
  return (
    <>
      <div>Preview</div>
      <div className="mb-10">page</div>
      <Link href="/preview/input" className="mt-5 text-2xl-bold text-primary">
        Input
      </Link>
      <Link href="/preview/toast" className="mt-5 text-2xl-bold text-primary">
        Toast
      </Link>
      <Link
        href="/preview/calendar"
        className="mt-5 text-2xl-bold text-primary"
      >
        Calendar
      </Link>
    </>
  );
}
