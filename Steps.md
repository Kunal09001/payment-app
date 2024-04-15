# Commands which we was done to bootstrap the app (for reference in future)

1. npx create-turbo@latest
2. renamed the apps in (paytm-project/apps) to merchant-app and user-app

## Installing Tailwind in both the apps

1.  cd user-app
2.  npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p

3.  Added the contents in tailwin.config.js for both
    content: [
    "./app/**/\*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/_.{js,ts,jsx,tsx,mdx}",
    "./components/\*\*/_.{js,ts,jsx,tsx,mdx}",

         // Or if using `src` directory:
         "./src/**/*.{js,ts,jsx,tsx,mdx}",

    ],

4.  Add the @tailwind base;
    @tailwind components;
    @tailwind utilities;
    in globals.css in user-app/app

5.  Add this line in config file as well in contents (because we would create tailwind code in ui folder)
    "../../packages/ui/src/\*_/_.{js,ts,jsx,tsx,mdx}"

6.  Do same steps for merchant-app

7.  Test Tailwind by adding some tailwind code

## Installing Prisma for db

1. Create db folder in packages (paytm-project/packages)

2. npm init -y (After doing cd in db folder)

3. npx tsc --init

4. Rename name in package.json to @repo/db

5. Add this in tsconfing.json
   {
   "extends": "@repo/typescript-config/base.json",
   "compilerOptions": {
   "outDir": "dist"
   },
   "include": ["src"],
   "exclude": ["node_modules", "dist"]
   }

6. Run npx prisma init

### Now getting local Postgres DB started,

1. Create a Postgres Db (or use an existing one which i have)

2. Then start the container docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres

3. Replace .env file in prisma DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"

4. Create model User in schema.prisma

5. npx prisma migrate dev --name init (To generate Tables)

6. npx prisma generate (To generate models in prisma client)

7. Add exports in packages.json in db ("./client": "./src/index.ts")

8. Add src folder and add index.ts in it and export Prisma Client

9. Add @repo/db in apps now (user-app and merchant-app) in dependency

10. run npm install
