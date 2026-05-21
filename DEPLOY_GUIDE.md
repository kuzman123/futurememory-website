# Deploy Guide: GitHub → Vercel

## Step 1: Prepare Local Repo

You already have `.git/` initialized. Clean up before pushing:

```powershell
cd C:\projects\futurememory_website

# Remove tracked files that should be ignored
git rm --cached .claude -r
git rm --cached .private -r
git rm --cached figma-make-output -r

# Commit the cleanup
git add .
git commit -m "Remove private and build files"
```

## Step 2: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. **Repository name:** `futurememory-website`
3. **Description:** `Design and strategy studio website. Vanilla HTML, CSS, JavaScript.`
4. **Visibility:** Public (you want it visible)
5. **Don't** initialize with README (you already have one)
6. Click **Create repository**

GitHub will show you the push commands. Copy them or follow below.

## Step 3: Push to GitHub

```powershell
# Set remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/futurememory-website.git

# Rename branch to main (if it's still master)
git branch -M main

# Push everything
git push -u origin main
```

**First time?** GitHub will ask for login:
- Use your GitHub username
- For password, use a **Personal Access Token** (not your actual password):
  1. GitHub → Settings → Developer settings → **Personal access tokens** → **Tokens (classic)**
  2. Click **Generate new token (classic)**
  3. Name: `Vercel Deploy`
  4. Check: `repo` (full control of private repositories)
  5. Expiration: 90 days (or longer)
  6. Generate → Copy token → Paste into PowerShell when asked

## Step 4: Verify GitHub Repo

1. Go to `https://github.com/YOUR-USERNAME/futurememory-website`
2. Verify you see:
   - ✅ `index.html`
   - ✅ `styles/`, `scripts/`, `assets/` folders
   - ✅ `README.md`
   - ✅ `.gitignore` (hides `.private`, `.claude`, etc.)
   - ❌ No `.private/` folder visible
   - ❌ No `figma-make-output/` visible

## Step 5: Deploy to Vercel

### 5a. Connect Vercel to GitHub

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in
3. Click **Continue with GitHub**
4. Authorize Vercel to access your repos

### 5b. Import the Project

1. After auth, you're on Vercel Dashboard
2. Click **Add New** → **Project**
3. Find `futurememory-website` in the list
4. Click **Import**

### 5c. Configure Build Settings

On the import screen:

- **Framework Preset:** `Other` (it's a static site)
- **Build Command:** Leave blank
- **Output Directory:** Leave blank
- **Environment Variables:** Leave blank (no .env needed)

Click **Deploy**.

### 5d. Wait for Deployment

- Green checkmark appears in ~30 seconds
- You get a URL: `futurememory-website-xxx.vercel.app`
- Click it → Your site is live! 🎉

## Step 6: Connect Custom Domain (futurememory.studio)

### 6a. Add Domain in Vercel

1. In Vercel project dashboard → **Settings** → **Domains**
2. Input: `futurememory.studio`
3. Click **Add**

Vercel shows you the DNS records you need:
```
Type A    @ → 76.76.21.21
Type CNAME www → cname.vercel-dns.com.
```

### 6b. Update DNS at Your Registrar

(Wherever you bought futurememory.studio — GoDaddy, Namecheap, etc.)

1. Log in to your registrar's DNS/domain settings
2. Find the DNS records section
3. Add/update these records:
   ```
   A record     @    76.76.21.21
   CNAME record www  cname.vercel-dns.com
   ```
4. Save

### 6c. Wait for SSL

- DNS propagation: 5 minutes to 24 hours (usually ~10 min)
- Once DNS resolves, Vercel auto-generates SSL certificate
- Test: Open `https://futurememory.studio` in browser
- If not working yet, wait and refresh (Vercel → Settings → Domains → check status)

## Step 7: Future Updates (Easy)

After your site is deployed, editing is simple:

```powershell
# 1. Edit index.html in VS Code
# 2. Save the file
# 3. In PowerShell:

git add .
git commit -m "Updated contact email"
git push
```

**That's it.** Vercel auto-detects the push and redeploys in ~30 seconds. No manual steps.

### Rollback (if you break something)

1. Go to Vercel dashboard → **Deployments**
2. Find the previous working deployment
3. Click **...** → **Promote to Production**
4. Instant rollback ✅

## Checklist Before First Deploy

- [ ] `.gitignore` created (hiding `.private/`, `.claude/`, etc.)
- [ ] All content in `index.html` ✅
- [ ] Modals working locally (click cards → modal opens/closes)
- [ ] Mobile layout tested (Chrome DevTools → Device Toggle → iPhone)
- [ ] All images either:
     - [ ] Dropped in `assets/cards/` (card-01.jpg … card-08.jpg), OR
     - [ ] CSS gradient placeholders are OK for first deploy
- [ ] `assets/og-image.png` exists (can be placeholder 1200×630)
- [ ] Email in contact form: `hello@futurememory.studio` (or your actual email)
- [ ] Favicon loads (should be `assets/favicon.svg`)
- [ ] No console errors (F12 → Console)

## Troubleshooting

### "fatal: No such file or directory"
You're not in the right folder. Do:
```powershell
cd C:\projects\futurememory_website
```

### "fatal: remote origin already exists"
You have a remote set. Remove and re-add:
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/futurememory-website.git
```

### Vercel shows blank page
1. Check **Deployments** tab for errors
2. Make sure `index.html` is in the root folder (not in a subfolder)
3. Check that CSS/JS paths are relative (`./styles/`, not `/styles/`)

### DNS not resolving
1. Wait 10–15 minutes
2. Use `nslookup futurememory.studio` in PowerShell to check DNS
3. If still stuck after 1 hour, verify records in registrar (typos?)

---

**You're ready.** Start with Step 1, go in order. Takes ~5 minutes total. 🚀
