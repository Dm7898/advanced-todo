import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import Login from "./components/Login";
import Sidebar from "./components/SideBar";
import Grid from "@mui/material/Grid2";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [listView, setListView] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const toggleSideBar = () => {
    setSidebarOpen((prev) => !prev);
  };
  const togglelistView = () => {
    setListView((prev) => !prev);
  };
  return (
    <>
      <Navbar
        toggleSideBar={toggleSideBar}
        togglelistView={togglelistView}
        listView={listView}
      />
      <Container maxWidth="xl">
        <Box
          sx={{
            p: { xs: 1, sm: 3 },
          }}
        >
          {isAuthenticated ? (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Sidebar sidebarOpen={sidebarOpen} />
              </Grid>
              <Grid size={sidebarOpen ? 9 : 12}>
                <TaskList listView={listView} />
              </Grid>
            </Grid>
          ) : (
            <Login />
          )}
        </Box>
      </Container>
    </>
  );
};

export default App;
