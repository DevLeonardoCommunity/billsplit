# Contributing to the project

Thanks for sharing your interesting in contributing to the project! 🎉

You can find here all the information you need. If somehting is missing please report it in the [issues](https://github.com/Balastrong/billsplit/issues/new) or join the [Discord server](https://discord.gg/98RebCvcwA).

## Getting Started

This project is built with [Qwik](https://qwik.dev/) so all the instructions to run it locally are the same as the [Qwik documentation](https://qwik.dev/docs/getting-started.html).

### Environment Variables

Create a file named `.env.local` in the root directory of the project. This file should contain the following environment variables:

```
PUBLIC_SUPABASE_URL=https://mnubpkhtexuyixzyxtwx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1udWJwa2h0ZXh1eWl4enl4dHd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM5NTI5NTIsImV4cCI6MjAxOTUyODk1Mn0.LxAIFHyiEXD-6mVJkwMNxo5I9ifk1KdvlPM4rsglDyQ
```

### Project Structure

This project is using Qwik with [QwikCity](https://qwik.builder.io/qwikcity/overview/). QwikCity is just an extra set of tools on top of Qwik to make it easier to build a full site, including directory-based routing, layouts, and more.

Inside your project, you'll see the following directory structure:

```
├── public/
│   └── ...
└── src/
    ├── components/
    │   └── ...
    └── routes/
        └── ...
```

- `src/routes`: Provides the directory-based routing, which can include a hierarchy of `layout.tsx` layout files, and an `index.tsx` file as the page. Additionally, `index.ts` files are endpoints. Please see the [routing docs](https://qwik.builder.io/qwikcity/routing/overview/) for more info.

- `src/components`: Recommended directory for components.

- `public`: Any static assets, like images, can be placed in the public directory. Please see the [Vite public directory](https://vitejs.dev/guide/assets.html#the-public-directory) for more info.

### Qwik useful links

- [Qwik Docs](https://qwik.builder.io/)
- [Discord](https://qwik.builder.io/chat)
- [Qwik GitHub](https://github.com/BuilderIO/qwik)
- [@QwikDev](https://twitter.com/QwikDev)
- [Vite](https://vitejs.dev/)

## Development

Development mode uses [Vite's development server](https://vitejs.dev/). The `dev` command will server-side render (SSR) the output during development.

```shell
npm start
```

## How to Contribute

1. Fork the repository
2. Clone the repository to your local machine
3. Create a new branch

```
 git checkout -b <branch-name>
```

4. Make your changes
5. Commit and push your changes

```
 git add .
 git commit -m "commit message"
 git push origin <branch-name>
```

6. Create a pull request
7. Wait for the pull request to be reviewed and merged
