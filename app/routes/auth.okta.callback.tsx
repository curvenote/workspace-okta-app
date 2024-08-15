import { LoaderFunctionArgs } from '@remix-run/node';
import { authenticator } from '../backend/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.authenticate('okta', request, {
    successRedirect: '/',
    failureRedirect: '/login',
  });
}
