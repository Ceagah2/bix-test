"use client";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as S from "./styles";

export default function SideBar() {
  const [isLoading, setIsLoading] = useState(false); 
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const userAccount = JSON.parse(localStorage.getItem("userAccount") || "{}");
    setUserName(userAccount?.name || "Usuário");

    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => {
        const avatarUrl = data.results[0]?.picture?.thumbnail;
        setUserAvatar(avatarUrl);
      });
  }, []);

  const handleLogout = () => {
    setIsLoading(true); 
    setTimeout(() => {
      localStorage.removeItem("userAccount");
      router.push("/");
    }, 1000);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Toolbar style={{ position: "absolute", top: 0, left: 0 }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <S.ProfileContainer>
          <Avatar alt="User Avatar" src={userAvatar} />
          <S.UserName>{`Olá, ${userName}`}</S.UserName>
        </S.ProfileContainer>

        <List>
          <ListItem
            onClick={() => router.push("/dashboard")}
            sx={{ cursor: "pointer" }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem onClick={handleLogout} sx={{ cursor: "pointer" }}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItem>
        </List>
      </Drawer>

      {isLoading && (
        <S.LoaderContainer>
          <CircularProgress color="secondary" />
          <S.LoaderText>Saindo...</S.LoaderText>
        </S.LoaderContainer>
      )}
    </>
  );
}
