# Service NoSQL

Self-service NoSQL databases: lets users create their own MongoDB users and databases.

## Environment variables

- `MONGODB_CONNECTION_STRING`: Connection string of the MongoDB instance, with administrator credentials
- `SESSION_SECRET`: Secret used to sign the session cookie
- `SESSION_COOKIE_NAME`: Name of the session cookie (default `self-service-nosql-session`)
- `NEXT_PUBLIC_MONGODB_HOST`: MongoDB host as displayed to users
- `NEXT_PUBLIC_LOGIN_HINT`: Optional hint shown on the login page
- `NEXT_PUBLIC_HELP_URL`: Optional help link shown in the header
- `NEXT_PUBLIC_APPS_URL`: Optional link to the apps portal shown in the header

## Development

```bash
npm install
npm run dev
```

## Deployment

A release is a `vX.Y.Z` tag on `master`. GitLab CI (`.gitlab-ci.yml`) builds the Docker image, pushes it to public ECR as [`public.ecr.aws/jtekt-corporation/self-service-nosql`](https://gallery.ecr.aws/jtekt-corporation/self-service-nosql) (`:<tag>` and `:latest`), and applies `kubernetes_manifest.yml` to the cluster, where the Deployment is named `self-service-mongodb`. Pushing `master` without a tag deploys nothing.
