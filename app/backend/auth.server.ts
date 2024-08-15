// app/services/auth.server.ts
import { Authenticator } from 'remix-auth';
import { sessionStorage } from './session.server';
import { FormStrategy } from 'remix-auth-form';
import { OktaProfile, OktaStrategy } from 'remix-auth-okta';

type User = {
  userId: string;
  token: string;
};

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User | OktaProfile>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form, context }) => {
    // Here you can use `form` to access and input values from the form.
    // and also use `context` to access more things from the server
    const username = form.get('username'); // or email... etc
    const password = form.get('password');

    // You can validate the inputs however you want
    if (typeof username !== 'string') throw new Error('username must be a string');
    if (username.length === 0) throw new Error('username must not be empty');

    if (typeof password !== 'string') throw new Error('password must be a string');
    if (password.length === 0) throw new Error('password must not be empty');

    // And if you have a password you should hash it
    // let hashedPassword = await hash(password);
    if (username !== 'steve') throw new Error('Invalid username');
    if (password !== 'curvenote') throw new Error('Invalid password');

    // And finally, you can find, or create, the user
    const user = {
      provider: 'form',
      userId: '1',
      token: '123',
      username,
      displayName: 'Plain Text Steve',
      email: 'steve@curvenote.com',
    };

    // And return the user as the Authenticator expects it
    return user;
  })
);

const oktaStrategy = new OktaStrategy(
  {
    oktaDomain: process.env.OKTA_DOMAIN ?? 'INVALID',
    clientID: process.env.OKTA_CLIENT_ID ?? 'INVALID',
    clientSecret: process.env.OKTA_CLIENT_SECRET ?? 'INVALID',
    callbackURL: `${process.env.APP_URL}/auth/okta/callback` ?? 'INVALID',
  },
  async (user) => {
    return user.profile;
  }
);

authenticator.use(oktaStrategy);
