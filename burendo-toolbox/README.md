# Burendo Toolbox SPA

This is the central frontend shell for the **Burendo Toolbox** — a single-page application (SPA) that dynamically loads remote tools (micro frontends) at runtime via **Module Federation** using Vite.

The app supports SSO login with Azure AD, and is deployed to S3 behind CloudFront using Terraform.

---

## 🧱 Structure

The SPA is located in the `burendo-toolbox` directory and is built using:

- **React + Vite**
- **Module Federation** via [`vite-plugin-federation`](https://github.com/originjs/vite-plugin-federation)
- **Tailwind CSS** for styling
- **@azure/msal-browser / msal-react** for SSO

Remote apps (tools) are mounted under `/apps/*`, and loaded dynamically at runtime.

---

## ⚙️ Bootstrapping the Repo

To scaffold the Terraform configuration with your desired environment settings:

```bash
make bootstrap
````

This will render `.j2` Jinja templates into real Terraform files using the variables you define.

Ensure you have `python3` and `jinja2` installed (`pip install -r requirements.txt`).

## 🚀 Running Locally

```bash
cd burendo-toolbox
npm install
npm run dev
```

This will start the local dev server on `http://localhost:3000`.

Note: When using `module federation`, local testing of remote apps like `door-access` only works if they're also running locally or are hosted and available.

## 🧩 Adding a New App

Each tool is a **remote app** hosted at `/apps/[tool-name]/remoteEntry.js`.

To add a new tool:

1. Host the remote app at:
   `https://toolbox.burendo.com/apps/my-new-tool/remoteEntry.js`

2. In `burendo-toolbox/vite.config.js`, add the new app to the `remotes` block:

   ```js
   federation({
     name: 'toolbox',
     remotes: {
       doorAccess: 'https://toolbox.burendo.com/apps/door-access/remoteEntry.js',
       myNewTool: 'https://toolbox.burendo.com/apps/my-new-tool/remoteEntry.js',
     },
     shared: ['react', 'react-dom'],
   })
   ```

3. In `src/routes/ToolsIndex.jsx`, add a new link or tile for your tool.

4. Optionally, define a route in `src/routes/ToolsLayout.jsx`:

   ```jsx
   <Route path="my-new-tool/*" element={<MyNewTool />} />
   ```

## ❌ Removing a Tool

To remove a tool:

1. Delete its entry from `vite.config.js`
2. Remove any routes or UI references in `ToolsIndex.jsx` and `ToolsLayout.jsx`

## 🔐 SSO Configuration

The Azure SSO config is managed through `.env` variables:

```env
VITE_AZURE_CLIENT_ID=xxxxx
VITE_AZURE_TENANT_ID=xxxxx
VITE_AZURE_REDIRECT_URI=https://toolbox.burendo.com
```

You can confirm they're working by logging them in `main.jsx`.

## 📦 Deploying

After building:

```bash
cd burendo-toolbox
npm run build
aws s3 sync dist/ s3://toolbox.burendo.com/ \
  --exclude "apps/*" \
  --delete
```

> ⚠️ Be careful not to overwrite existing `/apps/` folders. Use `--exclude` as shown above.

Terraform handles the underlying infrastructure (S3, CloudFront, IAM, etc). To deploy:

```bash
terraform apply
```

## 🧠 Notes

* `ToolsLayout.jsx` controls the core layout and routing for all tools.
* Module Federation allows each remote tool to be developed and deployed independently.
* The SPA acts as a secure, SSO-gated shell that integrates and hosts all tools in one place.

## 📁 Files of Note

| File / Folder       | Purpose                               |
| ------------------- | ------------------------------------- |
| `burendo-toolbox/`  | Main SPA shell                        |
| `src/routes/`       | Tool routes, layout, and index UI     |
| `vite.config.js`    | Module federation config              |
| `cloudfront.tf`     | CloudFront distribution               |
| `s3.tf`             | S3 bucket and permissions             |
| `Makefile` / `*.j2` | Templates used to bootstrap Terraform |

## 👥 Contributing

If you're adding a new tool, follow the structure in `door-access` as a reference. Keep remotes lightweight and focused. All remote apps must:

* Export a React component as the default export
* Be built with module federation (`exposes: './App'`)
* Be deployed independently to `/apps/[name]/`

## 📬 Questions?

Raise a PR or contact the Engineering team.
