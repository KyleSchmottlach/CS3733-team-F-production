import { Box, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";

interface AboutCardProps {
  role: string;
  name: string;
  bio: string;
  email: string;
  imagePath: string;
  quote: string;
}

export function AboutCardLeft(props: AboutCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Box
        sx={{
          my: "2.5em",
          mx: 'auto',
          backgroundImage: "linear-gradient(to right, lightgray, #2874C0)",
          maxWidth: "70%",
          position: 'relative',
          borderRadius: "2em",
          minWidth: "70%", // forces all cards to be the same width
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Stack padding={2}>
          <Box>
            <Typography variant="h4" component="div" sx={{ textAlign: "left" }}>
              <b>{props.role}</b>
            </Typography>
            <Typography variant="h4" component="div" sx={{ textAlign: "left" }}>
              {props.name}
            </Typography>
          </Box>
          <Box sx={{ paddingTop: 3 }}>
            <Grid container spacing={2} xs={12} direction="row" justifyContent="flex-start" alignItems="center">
              <Grid item xs={8}>
                <Stack>
                  <Typography variant="h5" component="div" sx={{ textAlign: "left" }}>
                    {props.bio}
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ paddingTop: 3, textAlign: "left" }}>
                    Email: {props.email}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={4} container justifyContent="flex-end">
                <Box position="relative" sx={{ width: '100%' }}>
                  <img
                    src={props.imagePath}
                    alt={"Picture of " + props.name}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: "20%"
                    }}
                  />
                  {isHovered && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '20%',
                      }}
                    >
                      <Typography variant="h6" sx={{ textAlign: 'center', color: 'white' }}>
                        {props.quote}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
