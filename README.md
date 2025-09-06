# Collab — Real-Time Team Collaboration Platform

Collab is a platform designed for teams to collaborate efficiently on projects using a **real-time Kanban board**. From task creation to live updates, collab keeps your team in sync and productive.  


---

## 🚀 Core Features

### 1. Real-Time Kanban Board
- Visualize your team’s workflow using a drag-and-drop Kanban board.
- Move tasks across columns like *To Do*, *In Progress*, and *Done* in real time.
- All changes are instantly visible to all team members — no refresh needed.

### 2. Task Management
- **Create, update, and assign tasks** directly on the board.
- Add details like **description, priority, deadlines, and tags**.
- Assign tasks to specific team members to track accountability.

### 3. Real-Time Collaboration
- Team members see updates as they happen.
- No more version conflicts or stale task lists.
- Ideal for remote teams and fast-moving projects.

### 4. Team Organization
- Create multiple boards for different projects or teams.
- Invite team members with customizable permissions.
- Track progress across tasks and boards seamlessly.

---

## 🛠 Technology Stack
- **Frontend:** Next.js + React
- **Backend:** NestJS
- **Realtime Communication:** Socket.IO
- **Authentication:** Clerk (OAuth & JWT)
- **Database:** PostgreSQL (with Prisma ORM)
- **State Management:** React state + Context API
- **Deployment:** Docker-ready for both frontend & backend

---

## 📦 How It Works
1. **Sign Up / Sign In**
   - Users authenticate via Google using Clerk.
   - Backend verifies token and creates a user profile if new.

2. **Create a Team**
   - Start a team or join existing ones.
   - Team members can access shared boards and tasks.

3. **Create & Manage Tasks**
   - Tasks can be created in any column.
   - Tasks can be assigned, prioritized, and commented on.

4. **Real-Time Updates**
   - All task changes propagate instantly via WebSockets.
   - Drag-and-drop a task — everyone sees it move immediately.

---
