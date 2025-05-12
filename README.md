# Multi-Tool Todo App Template (Next.js + TypeScript)

A professional starter template built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

This template is designed for productivity-focused apps including:

- Task management with priority, deadline, and Firestore sync
- World clock with timezone-aware multi-city support
- Note taking with title & content
- Reminder notifications with custom timing
- Developer debug dashboard
- Dark mode toggle
- LocalStorage persistence
- Firebase Auth (email/password & Google login)
- Firestore structure with user-based data isolation


## Getting Started

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


## Folder Structure

```
src/
├── app/
│   ├── layout.tsx            // Root layout
│   ├── page.tsx              // Main SPA layout (task, memo, clock, etc.)
│   └── admin/debug/page.tsx  // Debug dashboard
├── components/               // UI components grouped by feature
├── hooks/                    // Custom hooks (e.g., useTodos)
├── lib/                      // Firebase config, notifications, utilities
├── store/                    // Zustand state stores
├── types/                    // Type definitions
public/                       // Static assets and PWA icons
```


## Debug Dashboard

URL: [http://localhost:3000/admin/debug](http://localhost:3000/admin/debug)

Includes:

- Notification API test
- localStorage test
- Zustand state viewer
- Dark mode toggle


## Technology Stack

- [Next.js (App Router)](https://nextjs.org/docs/app)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Firebase Auth & Firestore](https://firebase.google.com/)
- [date-fns + date-fns-tz](https://date-fns.org/)
- [Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
- LocalStorage


## Security and Data Structure

Tasks are stored in Firestore using a secure user-based path:

```
users/{uid}/todos/{todoId}
```

Access is restricted using Firebase rules:

```js
match /users/{userId}/todos/{todoId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```

Authentication is handled via Firebase Auth (email/password and Google login).


## Planned Features

- Improved notification scheduler (e.g., daily/weekly reminders)
- Note sharing & cloud sync
- Enhanced PWA features
- Firestore integration for memos and settings


## License

MIT © imaki


ヽ(•‿•)ノ Thanks for reading!
 
(◕‿◕✿) Feel free to fork & contribute!