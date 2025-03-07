import { useSelector, useDispatch } from "react-redux";
import { toggleComplete, toggleFavorite } from "../store/taskSlice";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import TaskDetail from "./TaskDetail";
import TaskInput from "./TaskInput";

const TaskList = ({ listView }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const completedTasks = useSelector((state) => state.tasks.completedTasks);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  // Sort tasks based on priority (High → Medium → Low)
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
  const handleTaskClick = (task) => {
    setSelectedTaskId(selectedTaskId?.id === task.id ? null : task);
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", minHeight: "100vh" }}>
      <Box
        sx={{
          width: { xs: "100%", sm: selectedTaskId ? "70%" : "100%" },
        }}
      >
        <TaskInput />
        <Box
          sx={{
            mt: 2,
            color: "rgba(27, 40, 27, 1)",
            borderRadius: 2,
          }}
        >
          {listView ? (
            <List
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              {sortedTasks.map((task) => (
                <Box
                  key={task.id}
                  sx={{
                    border: "1px solid rgba(73, 110, 75, 0.2)",
                    borderRadius: "8px",
                    px: 1,
                    py: 3,
                    mb: 1,
                    width: { xs: "100%", sm: "30%" },
                    cursor: "pointer",
                    color: theme.palette.text.primary,
                    "&:hover": { bgcolor: "rgba(238, 246, 239, 0.3)" },
                  }}
                  onClick={() => handleTaskClick(task)}
                >
                  <ListItem disableGutters>
                    {/* Checkbox */}

                    <Checkbox
                      checked={task.completed}
                      onChange={(e) => {
                        e.stopPropagation();
                        dispatch(toggleComplete(task.id));
                      }}
                    />

                    {/* Task Name */}
                    <ListItemText primary={task.text} />

                    {/* Favorite Icon (Right Side) */}
                    <Checkbox
                      icon={<StarBorderIcon />}
                      checkedIcon={<StarIcon />}
                      checked={task.isFavorite}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleFavorite(task.id);
                      }}
                    />
                  </ListItem>
                </Box>
              ))}
            </List>
          ) : (
            <List>
              {sortedTasks.map((task) => (
                <ListItem
                  key={task.id}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    borderBottom: "1px solid rgba(27, 40, 27, 1)",
                    mb: 1,
                    px: 0,
                    cursor: "pointer",
                    color: theme.palette.text.primary,
                  }}
                  onClick={() => handleTaskClick(task)}
                >
                  {/* Checkbox (Move to Completed) */}
                  <Checkbox
                    onChange={(e) => {
                      e.stopPropagation();
                      dispatch(toggleComplete(task.id));
                    }}
                  />

                  {/* Task Name & Priority */}
                  <ListItemText
                    primary={task.text}
                    secondary={`Priority: ${task.priority}`}
                    sx={{ flexGrow: 1 }}
                  />

                  {/* Favorite Toggle Button (Right Side) */}
                  <Checkbox
                    icon={<StarBorderIcon />}
                    checkedIcon={<StarIcon />}
                    checked={task.isFavorite}
                    onChange={(e) => {
                      e.stopPropagation();
                      dispatch(toggleFavorite(task.id));
                    }}
                    sx={{ color: theme.palette.text.primary }}
                  />
                </ListItem>
              ))}
            </List>
          )}
          {/* Divider */}
          <Divider sx={{ my: 2, bgcolor: "white" }} />

          {/* completed tasks */}

          <List>
            {completedTasks.map((task) => (
              <Box key={task.id}>
                <ListItem
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: 1,
                    color: "rgba(27, 40, 27, 1)",
                    mb: 1,
                    px: 0,
                    textDecoration: "line-through",
                    cursor: "pointer",
                  }}
                >
                  {/* Checkbox (Restore to Active Tasks) */}
                  <Checkbox
                    sx={{ color: "rgba(63, 145, 66, 1)" }}
                    checked
                    onChange={(e) => {
                      e.stopPropagation();
                      dispatch(toggleComplete(task.id));
                    }}
                  />

                  <ListItemText
                    primary={task.text}
                    secondary={`Priority: ${task.priority}`}
                  />
                </ListItem>
              </Box>
            ))}
          </List>
        </Box>
      </Box>
      {selectedTaskId && (
        <Box sx={{ width: { xs: "100%", sm: "30%" }, px: { xs: 0, sm: 2 } }}>
          <TaskDetail task={selectedTaskId} />
        </Box>
      )}
    </Box>
  );
};

export default TaskList;
