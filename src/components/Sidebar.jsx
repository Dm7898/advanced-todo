import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  Paper,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import MapIcon from "@mui/icons-material/Map";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { useSelector } from "react-redux";

const Sidebar = ({ sidebarOpen }) => {
  const theme = useTheme();
  const tasks = useSelector((state) => state.tasks.tasks);
  const completedTasks = useSelector((state) => state.tasks.completedTasks);
  // Transform tasks into chart data
  const taskData = [
    {
      name: "Pending",
      value: tasks?.length,
      color: theme.palette.chart.primary,
    },
    {
      name: "Done",
      value: completedTasks?.length,
      color: theme.palette.chart.secondary,
    },
  ];
  if (!sidebarOpen) return null;

  return (
    <Box>
      <Paper
        sx={{
          width: "100%",
          maxWidth: 280,
          p: 2,
          borderRadius: 2,
          mt: 3,
          mr: 0,
        }}
      >
        {/* Profile Section */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Avatar
            src="/profile.png"
            sx={{ width: 100, height: 100, margin: "-60px auto 0" }}
          />
          <Typography variant="h6" sx={{ mt: 1 }}>
            Hey, ABCD
          </Typography>
        </Box>

        {/* Navigation List */}
        <List>
          {[
            { text: "All Tasks", icon: <FormatListBulletedIcon /> },
            { text: "Today", icon: <CalendarTodayIcon /> },
            { text: "Important", icon: <StarBorderIcon /> },
            { text: "Planned", icon: <MapIcon /> },
            { text: "Assigned to me", icon: <AssignmentIndIcon /> },
          ].map((item, index) => (
            <ListItem
              key={index}
              sx={{
                backgroundColor: item.active ? "#D5E8D4" : "transparent",
                borderRadius: 2,
                mb: 1,
              }}
            >
              <ListItemIcon sx={{ color: "#2E7D32" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>

        {/* Add List Button */}
        <ListItem button sx={{ mt: 2 }}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add list" />
        </ListItem>

        {/* Task Stats */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Today Tasks
          </Typography>
          <Typography variant="h4" sx={{ color: "#2E7D32" }}>
            {tasks?.length || 0}
          </Typography>
          <IconButton>
            <InfoIcon sx={{ fontSize: 18, color: "#777" }} />
          </IconButton>
        </Box>

        {/* Pie Chart */}
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <PieChart width={200} height={200}>
            <Pie
              data={taskData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              dataKey="value"
            >
              {taskData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </Box>
      </Paper>
    </Box>
  );
};

export default Sidebar;
