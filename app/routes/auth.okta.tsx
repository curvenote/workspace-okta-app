import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { authenticator } from '../backend/auth.server';

export function loader() {
  return redirect('/login');
}

export async function action({ request }: ActionFunctionArgs) {
  return authenticator.authenticate('okta', request);
}
