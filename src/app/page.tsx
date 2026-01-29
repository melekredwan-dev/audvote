import { auth, signOut } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl">audvote</h1>
      <p className="mt-4 text-lg text-gray-600">A music review and rating platform</p>

      <div className="mt-4">
        {session?.user ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg">
              Welcome, <span className="font-semibold">{session.user.name}</span>
            </p>
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <Button variant="outline" type="submit">
                Sign out
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Create account</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
