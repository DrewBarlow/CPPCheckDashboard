This is a [Next.js](https://nextjs.org/) Application

Front End Design of the Web Application

## Getting Started

```bash
#first clone my branches repo

git clone <repo>

#install node module packages

npm install

#command used to run application on localhost port 3000 as a developement server

npm run dev
# or
yarn dev
# or
pnpm dev

#export the file to run the application as a stand alone

#NOTE: there is an issue with the pathing of the files in the /out/index.html you must add a dot (.) infront of each href and src path in the index.html file (this will add the CSS and Javascript)

	#this occurs for each run of the npm run export command
	
	#upon successful completion of the command the output will be placed into the out folder and the website can be accessed through clicking the index.html page

npm run export
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
