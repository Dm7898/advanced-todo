import React from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@mui/material";
import {
  Notifications,
  Refresh,
  CalendarToday,
  StarBorder,
  Star,
} from "@mui/icons-material";

const tasks = [
  { id: 1, text: "Buy groceries", completed: false, important: false },
  { id: 2, text: "Finish project report", completed: false, important: true },
  { id: 3, text: "Call the bank", completed: false, important: false },
  {
    id: 4,
    text: "Schedule dentist appointment",
    completed: false,
    important: false,
  },
  { id: 5, text: "Plan weekend trip", completed: false, important: false },
];

const completedTasks = [
  { id: 6, text: "Read a book", completed: true },
  { id: 7, text: "Clean the house", completed: true },
  { id: 8, text: "Prepare presentation", completed: true },
  { id: 9, text: "Update blog", completed: true },
];

const TodoApp = () => {
  return (
    <Container maxWidth="sm">
      {/* Header */}
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(to bottom, #f0f8e2, #ffffff)",
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#333" }}>
            To Do
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Task Input */}
      <Toolbar sx={{ justifyContent: "space-between", mt: 2 }}>
        <Typography variant="h6">Add A Task</Typography>
        <Button variant="contained" color="success">
          ADD TASK
        </Button>
      </Toolbar>

      {/* Icons */}
      <Toolbar sx={{ justifyContent: "space-around" }}>
        <IconButton>
          <Notifications />
        </IconButton>
        <IconButton>
          <Refresh />
        </IconButton>
        <IconButton>
          <CalendarToday />
        </IconButton>
      </Toolbar>

      {/* Task List */}
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} sx={{ borderBottom: "1px solid #ddd" }}>
            <ListItemIcon>
              <Checkbox />
            </ListItemIcon>
            <ListItemText primary={task.text} />
            <IconButton>
              {task.important ? (
                <Star sx={{ color: "black" }} />
              ) : (
                <StarBorder />
              )}
            </IconButton>
          </ListItem>
        ))}
      </List>

      {/* Completed Section */}
      <Typography variant="h6" sx={{ mt: 2 }}>
        Completed
      </Typography>
      <List>
        {completedTasks.map((task) => (
          <ListItem key={task.id} sx={{ borderBottom: "1px solid #ddd" }}>
            <ListItemIcon>
              <Checkbox checked sx={{ color: "green" }} />
            </ListItemIcon>
            <ListItemText
              primary={task.text}
              sx={{ textDecoration: "line-through", fontWeight: "bold" }}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TodoApp;
