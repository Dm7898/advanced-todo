import { useContext } from "react";
import { AppBar, Toolbar, IconButton, Button, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ViewListIcon from "@mui/icons-material/ViewList";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import GridViewIcon from "@mui/icons-material/GridView";
import { ThemeContext } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

const Navbar = ({ toggleSideBar, togglelistView, listView }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <AppBar position="static" sx={{ boxShadow: 0 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left-side Hamburger Menu */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton edge="start" color="inherit" onClick={toggleSideBar}>
              <MenuIcon />
            </IconButton>

            <Box
              component="img"
              src="/logo.png"
              alt="logo"
              sx={{
                width: { sm: "100px" },
                height: "auto",
              }}
            />
          </Box>

          {/* Right-side Icons */}
          <div>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit">
              {listView ? (
                <ViewListIcon onClick={togglelistView} />
              ) : (
                <GridViewIcon onClick={togglelistView} />
              )}
            </IconButton>
            {isAuthenticated && (
              <Button color="inherit" onClick={() => dispatch(logout())}>
                Logout
              </Button>
            )}
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
