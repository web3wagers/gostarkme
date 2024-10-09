


### Pre-requisites

- Install Node.js (v20.15.1) using Node Version Manager (NVM)

    We recommend using  [Node Version Manager (NVM) ](https://github.com/nvm-sh/nvm) to easily manage different versions of Node.js on your system.

### Local configurations


- Rename the  `frontend/gostarkme-web/.env.example`  file to: `frontend/gostarkme-web/.env`.



- Comment the content of the file `frontend/gostarkme-web/next.config.mjs`.


## Local Deployment

### Installing Dependencies

First,  install the required packages:

```bash
cd gostarkme/frontend/gostarkme-web

npm install
```
### Running the Application


Once the dependencies are installed, start the development server:


```bash
npm run dev
```




Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Production Deployment


### Installing Dependencies

First,  install the required packages:

```bash
cd gostarkme/frontend/gostarkme-web

npm install
```


### Build the Application
To create an optimized production build, run:



```bash
npm run build
```


### Serve the build
Start the production server:
```bash
npm run start
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
