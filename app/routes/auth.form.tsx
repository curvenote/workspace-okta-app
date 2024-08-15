import { ActionFunctionArgs } from '@remix-run/node';
import { authenticator } from '../backend/auth.server';

export async function action({ context, request }: ActionFunctionArgs) {
  return await authenticator.authenticate('form', request, {
    successRedirect: '/', // https://remix.run/resources/remix-auth#custom-redirect-url-based-on-the-user
    failureRedirect: '/login',
    context,
  });
}
