# 🧠 Multi-Tool Todo App Template (Next.js + TypeScript)

A professional starter template built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

This template is designed for productivity-focused apps with:

- ✅ Task management (with priority & deadline)
- 🌍 World clock (timezone-aware, multi-city)
- 📝 Notes with search
- 🔔 Notification reminders
- ⚙️ Developer debug dashboard
- 💾 LocalStorage persistence

---

## 🚀 Getting Started

1. Clone this template:

```bash
git clone git@github.com:imaki/template.next.js.git my-todo-app
cd my-todo-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📁 Folder Structure

```
src/
├── app/
│   ├── layout.tsx          // Root layout
│   ├── page.tsx            // Main SPA layout
│   └── admin/debug/page.tsx // Debug dashboard
├── components/             // UI components
├── lib/
│   └── fonts.ts            // Google Fonts setup
public/                     // Static assets
```

---

## 🧪 Debug Dashboard

URL: [http://localhost:3000/admin/debug](http://localhost:3000/admin/debug)

Features:

- ✅ Notification API test
- ✅ localStorage test
- ✅ Zustand & dark mode test (upcoming)
- ✅ Designed for `/admin/debug` use only

---

## ⚙️ Technology Stack

- [Next.js (App Router)](https://nextjs.org/docs/app)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
- [date-fns + date-fns-tz](https://date-fns.org/)
- [Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
- LocalStorage

---

## 🔮 Planned Features

- 📝 Notes editor with title & body
- 🌍 Max 3 cities timezone selector
- 🔔 Reminder time per task (notify via browser)
- 📱 PWA support
- 🗺️ Interactive map clock view
- ☁️ Firebase Auth & Firestore sync

---

## 📜 License

MIT © imaki
