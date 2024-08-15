import { useActionData, Form } from '@remix-run/react';
import { authenticator } from '../backend/auth.server';
import { LoaderFunctionArgs } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  });
}

export default function Login() {
  const data = useActionData<{ error?: string }>();
  return (
    <div className="flex justify-center py-16">
      <div className="space-y-6">
        <div className="text-center text-xl">LOGIN</div>
        <Form className="flex flex-col gap-1" method="post" action="/auth/okta">
          <div className="flex justify-center">
            <button className="rounded border border-black py-1 px-2" type="submit">
              Login with OKTA
            </button>
          </div>
        </Form>
        <Form className="flex flex-col gap-1" method="post" action="/auth/form">
          <legend>Login with Username & Password</legend>
          <input
            className="rounded border border-black p-1"
            type="text"
            name="username"
            placeholder="Username"
          />
          <input
            className="rounded border border-black p-1"
            type="password"
            name="password"
            placeholder="Password"
          />
          <div className="flex justify-center">
            <button className="rounded border border-black py-1 px-2" type="submit">
              Login
            </button>
          </div>
        </Form>
        {data?.error && <div className="text-red-600 font-mono">{data.error}</div>}
      </div>
    </div>
  );
}
