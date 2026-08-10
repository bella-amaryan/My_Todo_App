<<<<<<< HEAD
# Todo App

Todo App is a personal productivity web application built with Next.js. It helps you manage tasks, plan your week, track progress, and stay focused with a simple dashboard experience.

## What the app does

This app includes:

- User registration and login
- Task management with create, complete, delete, and search features
- A dashboard for daily focus and progress tracking
- A calendar view for scheduling events and plans
- Statistics and achievements for productivity insights
- Notification and settings management
- Language and theme customization
- Optional Google integration support

## Tech stack

- Next.js 16
- React 19
- MongoDB with Mongoose
- Tailwind CSS
- Framer Motion
- next-intl for multilingual support

## Prerequisites

Before running the project, make sure you have:

- Node.js 18 or newer
- npm
- A MongoDB database

## Installation

1. Clone the project
2. Install dependencies:

```bash
npm install
```

## Environment variables

Create a `.env.local` file in the project root and add the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Optional variables for Google integration:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Running the app locally

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## How to use the app

### 1. Create an account

- Open the app in your browser
- Click Register
- Fill in your details and create an account
- Log in with your new credentials

### 2. Manage your tasks

After login, you can:

- Add new tasks from the dashboard or tasks page
- Mark tasks as completed
- Delete tasks you no longer need
- Search and filter tasks by status, priority, or category

### 3. Use the dashboard

The dashboard gives you a quick overview of:

- Today’s date
- Your current task progress
- Upcoming and overdue tasks
- A simple productivity overview for the week

### 4. Plan with the calendar

Use the calendar page to:

- View days and events in a calendar layout
- Add events for important dates
- Review upcoming plans and reminders

### 5. Track progress

The statistics section helps you monitor:

- Task completion trends
- Focus activity
- Productivity insights

### 6. Personalize your experience

From the settings page you can:

- Change your account details
- Adjust notifications
- Change theme and appearance
- Switch language between supported options
- Configure integrations

## Project structure overview

- app/dashboard - main dashboard experience
- app/tasks - task-related screens and components
- app/calendar - calendar and event management
- app/statistics - productivity statistics and insights
- app/settings - user preferences and account settings
- app/api - backend routes for authentication, tasks, events, notifications, and integrations

## Build for production

```bash
npm run build
```

## Start the production build

```bash
npm run start
```

## Notes

- The app requires authentication for most features.
- Some features such as Google integration depend on additional credentials.
- If you are deploying to production, make sure your environment variables are configured securely.
=======
# My_Todo_App
>>>>>>> fa37f003bde408d347c41100623efa9fe59d84c3
