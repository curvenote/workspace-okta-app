# Workspace OKTA Prorotype

A minimal remix app with `remix-auth` and strategies including `OKTA` and `Form`

## OKTA

For this to work, you'll need to check out and build the [curvenote fork of remix-auth-okta](https://github.com/curvenote/remix-auth-okta) and `npm link` it:

```
git clone git@github.com:curvenote/remix-auth-okta.git
cd remix-auth-okta
npm i
npm build
npm link

cd ../workspace-okta
npm install
npm link remix-auth-okta
npm run dev
```

You'll also need to create a `.env` file from `.env.sample` and fill in the correct credentials.
