import {
  Box,
  Typography,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import RepeatIcon from "@mui/icons-material/Repeat";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { toggleComplete, toggleFavorite } from "../store/taskSlice";
import { useState } from "react";

const TaskDetail = ({ task }) => {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState(task.notes || "");
  console.log(notes);
  return (
    <Box>
      <Paper
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: { xs: 1, sm: 2 },
        }}
      >
        {/* Task Title with Checkbox & Star Icon */}
        <ListItem>
          <ListItemIcon>
            <Checkbox
              checked={task.completed}
              onChange={() => dispatch(toggleComplete(task.id))}
            />
          </ListItemIcon>
          <ListItemText primary={task.text} sx={{ fontSize: "1.2rem" }} />
          <IconButton onClick={() => dispatch(toggleFavorite(task.id))}>
            {task.isFavorite ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        </ListItem>

        {/* Task Options */}
        <List>
          {[
            { text: "Add Step", icon: <AddIcon /> },
            { text: "Set Reminder", icon: <NotificationsNoneIcon /> },
            { text: "Add Due Date", icon: <CalendarTodayIcon /> },
            { text: "Repeat", icon: <RepeatIcon /> },
          ].map(({ text, icon }) => (
            <ListItem
              key={text}
              sx={{ borderBottom: "1px solid rgba(27, 40, 27, 0.2)" }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        {/* Add Notes */}
        <TextField
          label="Add Notes"
          variant="outlined"
          multiline
          rows={4} // Set the number of rows
          fullWidth
          onChange={(e) => setNotes(e.target.value)}
        />

        {/* Bottom Actions */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 2 }}
        >
          <IconButton>
            <CloseIcon />
          </IconButton>
          <Typography>Created Today</Typography>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default TaskDetail;
