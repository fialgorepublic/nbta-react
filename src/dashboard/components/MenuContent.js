import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, url: '/', item_index: 0},
  { text: 'Investors', icon: <PeopleRoundedIcon />, url: 'investors', item_index: 1 },
  { text: 'Investments', icon: <AssignmentRoundedIcon />, url: 'investments', item_index: 2 },
  { text: 'Manage Earnings', icon: <AssignmentRoundedIcon />, url: 'earnings', item_index: 3}
];

export default function MenuContent() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={index === 0}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              
              <Link to={item.url}><ListItemText primary={item.text} /></Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    </Stack>
  );
}
