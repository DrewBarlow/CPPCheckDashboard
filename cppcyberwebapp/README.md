This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Directions to run application:

```bash
first clone my branches repo

- git clone <repo>

install node module packages

- npm install

#command used to run application on localhost port 3000 as a developement server

npm run dev
# or
yarn dev
# or
pnpm dev

#export the file to run the application as a stand alone

#NOTE: there is an issue with the pathing of the files in the /out/index.html you must add a dot (.) infront of each href and src path in the index.html file (this will add the CSS and Javascript)

	#this occurs for each run of the npm run export

	#upon successful completion of the command the output will be placed into the out folder and the website can be accessed through clicking the index.html page

npm run export
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

