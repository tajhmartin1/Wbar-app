## Getting Started
This repository contains **only the frontend for** [wbar.org](https://wbar.org).

First, clone the repo:
```bash
git clone https://github.com/wbar-radio/wbar-app.git
```
Then, make sure all dependencies are installed by running `npm install` in the root directory.
```bash
cd wbar-app
npm i
```
This should create a `node_modules` folder which the development server uses to use imported libraries. 

## Project Structure

```
﻿﻿wbar-app/                 
├── public/               # static files/assets go here! React looks here first for src tags
│   ├── index.html
│   └── ...
├── src/                
│   ├── components/
│   │   └── ...
│   ├── App.jsx           # React app starts here
│   ├── index.js          # entrypoint for the React app (imported into index.html)
│   └── ...        
├── .gitignore
├── package.json          # configuration for package dependencies
├── package-lock.json     # do not change manually
└── README.md
```

## Development: `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in your IDE's console.

## Deployment: `npm run build`
Builds the app for production in the `build` folder.\
**This is the folder we upload to DreamHost.**

It correctly bundles React in production mode and optimizes the build for the best performance.\
The build is minified and the filenames include the hashes.\

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).
