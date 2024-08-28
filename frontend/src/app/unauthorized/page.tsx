import Link from 'next/link';

export default function Unauthorized() {
  return (
    <main className="items-center flex flex-col my-16">
      <h1 className="text-3xl">Unauthorized Access</h1>
      <h1>
        {' '}
        You must{' '}
        <Link href="/auth" className="text-blue-600">
          <u>sign in</u>
        </Link>{' '}
        first{' '}
      </h1>
    </main>
  );
}
