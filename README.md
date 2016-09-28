# WIP CMS

> A CMS that manages the content for the [API](https://github.com/samisking/samking-api)

## Installation and running

First install the dependencies.

```
npm install
```

### Build

Performs a Webpack production build.

```
npm run build
```

### Development

Start a local server at the specified ports. Runs `NODE_ENV` as `development`. This also enables hot reloading of CSS and JS for the app.

```
npm run start:dev
```

*Note:* The first time you run this, there will be no assets, so you'll first have to run the build script to copy fonts etc.

### Production

Start a local server at the specified ports. Runs `NODE_ENV` as `production`. It will also do a production Webpack build to `build/` where assets will be served, as opposed to the Webpack dev server in development. There's no hot reloading when running in production.

```
npm run start
```

## TODO

### Backend

- [x] S3/tmp dir uploading of images instead, along with random names.

### Photos

- [x] Add deleting of single photo.
- [ ] A page to remove tags.

### Design

- [x] Cover image field (can just be an ID from uploaded images).

### Auth

- [x] Redirect back to login properly when token expires.
- [x] Add Logout route.
- [x] Style Login.

### General

- [ ] Mobile styles.
- [ ] Tests.
