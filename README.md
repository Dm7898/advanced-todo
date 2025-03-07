_#To-Do Application_

Overview

This To-Do application is built using React (Vite) and Material-UI, with Redux Toolkit for state management. The app allows users to manage tasks efficiently with features like task listing, marking tasks as completed, favoriting tasks, sidebar and navigation navbar with darkmode functionality.

Features

Add, view, and delete tasks

Mark tasks as completed

Favorite important tasks

Sidebar navigation for task categories

Responsive UI using Material-UI(not completley finshied)

State management with Redux Toolkit

Light & Dark mode

Component Breakdown

1. TaskList Component

📌 Purpose:

The TaskList component displays all tasks in a list format. It retrieves tasks from the Redux store and provides interactive actions like marking tasks as completed and favoriting them.

⚙️ Implementation:

Uses Redux State: Fetches tasks from the store.

Checkbox for Completion: Users can toggle task completion using a checkbox.

Favorite Icon Toggle: Clicking the star icon marks/unmarks tasks as favorites.

List Rendering: Maps over tasks and displays them dynamically.

🛠 Code Snippet:

<ListItem>
  <ListItemIcon>
    <Checkbox checked={task.completed} onChange={() => dispatch(toggleComplete(task.id))} />
  </ListItemIcon>
  <ListItemText primary={task.text} sx={{ fontSize: "1.2rem" }} />
  <IconButton onClick={() => dispatch(toggleFavorite(task.id))}>
    {task.isFavorite ? <StarIcon /> : <StarBorderIcon />}
  </IconButton>
</ListItem>

2. TaskDetail Component

📌 Purpose:

Displays detailed information about a selected task, including description, due date, and priority.

⚙️ Implementation:

Fetches Task Details: Uses Redux to get a task by ID.

Editable Fields: Allows modifying task details.

Save & Delete Options: Users can update or remove tasks.

🛠 Code Snippet:

<Box>
  <Typography variant="h6">{task.title}</Typography>
  <Typography>{task.description}</Typography>
  <Button onClick={() => dispatch(deleteTask(task.id))}>Delete</Button>
</Box>

3. Sidebar Component

📌 Purpose:

The Sidebar provides navigation options for filtering tasks by categories (e.g., All Tasks, Today, Important, etc.).

⚙️ Implementation:

Collapsible Sidebar: Can be toggled open/close.

Navigation List: Displays different task categories.

Task Statistics: Uses a Pie Chart to show task completion status.

🛠 Code Snippet:

<Box sx={{
    transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 0.3s ease-in-out",
    position: "fixed",
    left: 0,
    width: "250px",
    backgroundColor: "#fff",
}}>
<List>
<ListItem button>
<ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
<ListItemText primary="All Tasks" />
</ListItem>
</List>
</Box>

How We Built This Application

🔹 Step 1: Setting Up the Project

Initialized a Vite React project.

Installed Material-UI and Redux Toolkit.

🔹 Step 2: Implementing Redux for State Management

Created Redux slices for managing tasks.

Defined actions for adding, completing, and favoriting tasks.

🔹 Step 3: Creating Components

Built TaskList for listing tasks.

Built TaskDetail for viewing/editing task details.

Built Sidebar for navigation and filtering tasks.

🔹 Step 4: Adding Interactions

Integrated onClick handlers for task actions.

Implemented smooth sidebar transitions.

🔹 Step 5: Enhancing UI with Material-UI

Used Material-UI components like List, Checkbox, IconButton, and Typography.

Future Improvements

Implement Drag & Drop for task reordering.

Add Dark Mode support.

Integrate User Authentication.

Allow Task Reminders & Notifications.

Setup & Installation

1️⃣ Clone the repository

git clone https://github.com/your-repo/todo-app.git
cd todo-app

2️⃣ Install dependencies

npm install

3️⃣ Start the application

npm run dev

Conclusion

This To-Do app demonstrates how to efficiently manage tasks using React, Redux Toolkit, and Material-UI, following a structured approach for building modular components.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
