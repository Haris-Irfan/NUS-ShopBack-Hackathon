"use client"

import React, { useEffect, useState } from "react";
import { getUserData } from "../../firebaseConfig";
import { Box, FormControlLabel, Checkbox, Container, Button, IconButton, Typography, List, ListItem, Drawer, Grid, Grid2 } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {auth} from '../../firebaseConfig'
import { onAuthStateChanged } from "firebase/auth";
import router from "next/router";
import Router from "next/router";
import { useAuth } from "../../AuthProvider";

export default function Streak() {
    const { user } = useAuth();
    const [streak, setStreak] = useState<number[]>([])
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [popup, setPopup] = useState<string | null>(null);


    const setUp = async () => {
        console.log(auth.currentUser)
        if (auth.currentUser) {
            const data = await getUserData()
            if (data) {
                setStreak(data["streak"])
            }
        }
    }

    const handlePurchaseStreak = () => {
        window.location.href = '/streak';
    };

    const handleWeeklyQuest = () => {
        setPopup('weeklyQuest');
    };

    const toggleDrawer = (open: boolean) => {
        return (event: React.MouseEvent | React.KeyboardEvent) => {
          if (event.type === "keydown" && (event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift") {
            return;
          }
          setDrawerOpen(open);
        };
    };

    const shopTypeButtons = [
    { label: "Weekly Quests", action: handleWeeklyQuest },
    { label: "Purchase Streak", action: handlePurchaseStreak },
    // { label: "Redeem Rewards", action: handleRedeemRewards },
    { label: "Vouchers", action: () => console.log() },
    { label: "Sign Out", action: () => console.log("Sign Out clicked") },
    ];

    const drawerContent = (
        <Box role="presentation" sx={{ width: 250, padding: 2 }}>
          <List sx={{ mt: 1 }}>
            {shopTypeButtons.map((button) => (
              <ListItem key={button.label} disablePadding>
                <Button
                  variant="text"
                  onClick={button.action}
                  sx={{
                    width: '100%',
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    color: 'primary.main',
                    '&:hover': { backgroundColor: 'primary.light' },
                  }}
                >
                  {button.label}
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      );


    setUp()

    return (
      <Container sx={{ backgroundColor: 'white', height: '100vh', width: '100vw', p: 2 }}>
        {/* Header */}
        <Box
          component="header"
          sx={{
            backgroundColor: 'red',
            color: 'white',
            py: 4,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 10,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton color="inherit" onClick={() => toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Streak Tracker
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Calendar-like Streak Tracker */}
        <Box
          sx={{
            pt: 12, 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'white',
          }}
        >
          <Typography variant="h6" sx={{ color: 'black', mb: 2 }}>
            Your Streak Calendar
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)', 
              gap: 2,
              maxWidth: '90%', 
            }}
          >
            {[...Array(30)].map((_, index) => (
              <Box
                key={index}
                sx={{
                  aspectRatio: '1', 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: streak.length > index ? 'green' : 'gray',
                  borderRadius: 1,
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  cursor: 'default',
                }}
              >
                Day {index + 1}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Return Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button variant="contained" color="primary" onClick={() => (window.location.href = '../')}>
            Return
          </Button>
        </Box>

        {/* Drawer */}
        <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
          {drawerContent}
        </Drawer>
      </Container>
    )
}

