import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Paper,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EventIcon from "@mui/icons-material/Event";
import { useDispatch } from "react-redux";
import { addTask } from "../store/taskSlice";

const TaskInput = () => {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (!taskText) return alert("Please enter task!");
    if (taskText.trim() !== "") {
      console.log(taskText, priority);
      dispatch(addTask({ id: Date.now(), text: taskText, priority: priority }));
      setTaskText("");
    }
  };

  return (
    <Box>
      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: 2,
          maxWidth: "100%",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            fontSize: "16px",
          }}
        >
          Todo
          <Box component="span" sx={{ display: "flex", alignItems: "center" }}>
            <ArrowDropDownIcon />
          </Box>
        </Typography>
        <TextField
          label="Add A Task"
          variant="standard"
          fullWidth
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          sx={{ color: "#000" }}
        />
        <FormControl sx={{ minWidth: "100%" }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            label="Priority"
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <IconButton>
            <AutorenewIcon />
          </IconButton>
          <IconButton>
            <EventIcon />
          </IconButton>
        </Box>

        <Button
          variant="contained"
          sx={{
            bgcolor: "rgba(53, 121, 55, 0.16)",
            color: "rgba(53, 121, 55, 1)",
            "&:hover": { bgcolor: "rgba(53, 122, 55, 0.45)" },
            //   boxShadow: 0,
          }}
          disabled={!taskText}
          onClick={handleAddTask}
        >
          ADD TASK
        </Button>
      </Paper>
    </Box>
  );
};

export default TaskInput;
