import React from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Typography } from '@mui/material';
import DialogComment from './DialogComment';
import { commentType } from './Comment';

interface Props {
   
    user: commentType
}
const MenuComment = ({user} : Props) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openDialog , setOpenDialog] = React.useState(false)
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
     
    console.log(openDialog)
  return (
    <>
    {openDialog && <DialogComment openDialog={openDialog} setOpenDialog={setOpenDialog} user={user}/>}
    
     <IconButton  onClick={handleClick} aria-label="settings">
                    <MoreVertIcon  />
                  </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
        <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <Typography onClick={() => setOpenDialog(!openDialog)} >Delete</Typography>
        </MenuItem>
       
        
      </Menu>
      </>
  ) 
}

export default MenuComment