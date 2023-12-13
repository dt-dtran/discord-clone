This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Technology Used

- Next.js
- TailwindCss

Take a look at the following resources:

- [Styling](https://ui.shadcn.com/) - to build your component library.
- [Clerk](https://clerk.com/docs) - to build Auth component
- [Primsa](https://www.prisma.io/) - to define db schema
- [PlanetScale](https://planetscale.com/) - to build SQL DB hosted on AWS RDS
  - npx prisma generate || npx prisma db push | npm i @prisma/client | npx prisma studio
- [UploadThing](https://uploadthing.com/) - File upload functionality on AWS S3
- [SocketIO](https://socket.io/) - to setup webSocket connections

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
