# Sreerag Sankar PS – Developer Portfolio

An ultra-modern, high-performance, responsive personal developer portfolio website designed for **Sreerag Sankar PS** (MCA Graduate & Entry-Level Flutter Developer).

---

## 🌟 Key Highlights & Features

- **Flutter Themed Design**: Styled with modern midnight navy (`#080D1A`), Flutter cyan (`#0284C7`), and emerald green accents.
- **Interactive Leaf Lens AI Smartphone Simulator**:
  - A realistic smartphone mockup in the Hero section running a simulated mobile interface.
  - Interactive "Scan Leaf" action triggers simulated TensorFlow inference via a FastAPI backend.
  - Toggles between infected tomato foliage (*Tomato Early Blight*) and healthy foliage (*98.9% AI Match*) with real-time confidence scores and treatment advice.
- **Metrics Strip**: Showcases MCA CGPA (**8.52**), TCS iON National Qualifier Test score (**2078/3000**), 4 verified certifications, and projects.
- **Categorized Skills Matrix**: Filterable badges across Mobile, AI & Backend, Databases, Languages & Web, Tools, and Soft Skills.
- **Project Showcase & Deep-Dive Modals**: Detailed architectural breakdown and module analysis for:
  - *Leaf Lens – AI Plant Disease Detection* (Academic Project)
  - *Rural Connect Website* (Developer Mini Project)
- **Education & Credentials Timeline**:
  - Master of Computer Application (MCA) – Nehru College of Engineering & Research Centre (CGPA: 8.52)
  - Bachelor of Arts (Economics) – Najath Arts and Science College
  - TCS iON NQT, NPTEL IIT Kanpur (Cloud Computing), Avodha Edutech (Flutter), IIT Bombay SINE (Python)
- **Direct Connect Channels**:
  - Direct 1-click WhatsApp chat link with prefilled greeting
  - Direct email (`sreeragpssankar@gmail.com`)
  - Direct call (`+91 8590968986`)
  - Interactive contact form with auto-formatted mailto dispatch

---

## 🚀 How to View Locally

No installation or dependencies required!

1. Open File Explorer and navigate to `c:\Users\hp\Portfolio`.
2. Double-click **`index.html`** to open it in your default browser (Chrome, Edge, Brave, etc.).

---

## ✏️ Customization & Updates

1. **Add Your Resume PDF**:
   - Save your PDF resume into this folder as `resume.pdf`.
   - In `index.html`, update the "Request CV" link to:
     ```html
     <a href="resume.pdf" download class="btn btn-outline">
       <i class="fas fa-file-arrow-down"></i> Download Resume
     </a>
     ```
2. **Add Your Exact LinkedIn & GitHub Profiles**:
   - In `index.html`, search for `https://linkedin.com` and `https://github.com` and replace them with your personalized URLs (e.g., `https://linkedin.com/in/your-username` and `https://github.com/your-username`).
3. **Add Live Demo Links**:
   - For *Leaf Lens* or *Rural Connect*, you can add your GitHub repository URLs in the project cards.

---

## 🌐 Free 1-Click Hosting

### Option 1: GitHub Pages (Recommended)
1. Initialize git in this directory and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   ```
2. Create a new repository on GitHub named `portfolio` (or `<your-username>.github.io`).
3. Link and push:
   ```bash
   git remote add origin https://github.com/<your-username>/portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, go to **Settings > Pages** and set source branch to **main**. Your portfolio will be live at:
   `https://<your-username>.github.io/portfolio/`

### Option 2: Netlify (Drag & Drop)
1. Go to [netlify.com](https://www.netlify.com/) and log in.
2. Drag the `c:\Users\hp\Portfolio` folder directly onto the Netlify dashboard.
3. Your site is deployed instantly with a free SSL certificate!
