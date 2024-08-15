import { ActionFunctionArgs } from '@remix-run/node';
import { authenticator } from '../backend/auth.server';

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.logout(request, { redirectTo: '/login' });
}
