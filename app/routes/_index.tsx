import { json, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';
import { authenticator } from '../backend/auth.server';
import { useLoaderData } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const data = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  return data ? json(data) : null;
}

export default function Index() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = useLoaderData() as { displayName: string; email: string; provider: string };
  const { displayName, email, provider } = data;
  return (
    <div className="font-sans p-16 flex justify-center w-full">
      <div className="w-10/12 space-y-6">
        <h1 className="text-3xl">
          Welcome <span className="text-green-700 font-semibold">{displayName}</span>!
        </h1>
        <div>Your Stuff</div>
        <p>
          You logged in using <code className="font-semibold text-red-700">{provider}</code> and
          your account email is <code className="font-semibold text-red-700">{email}</code>.
        </p>
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
        <div>
          <form method="post" action="/logout">
            <button className="py-1 px-2 rounded border border-black" type="submit">
              logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
