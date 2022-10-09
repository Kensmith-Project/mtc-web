import { PersonAdd, Settings, Logout } from '@mui/icons-material';
import { Menu, MenuItem, ListItemIcon, Tooltip, Avatar, IconButton } from '@mui/material';
import React from 'react';
import avatarImage from '../../assets/avatar.png';
import styles from './profile.module.css';
import { useHistory } from 'react-router';
import { User } from '../../types/User';
import { UserRole } from '../../types/enums';


export interface ProfileMenuProps{
    user?: User;
    onLogOut?: () => void;
}

interface CustomMenuItemProps{
    children: React.ReactNode[] | React.ReactNode;
    [index: string]: any;
}

function CustomMenuItem({children, ...props}: CustomMenuItemProps){

    return(
        <MenuItem
            sx={{
                fontFamily: "Poppins"
            }}
            {...props}
        >
            {children}
        </MenuItem>
    )
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ user, onLogOut }) =>{


    // Hooks
    const history = useHistory(); 

    // State
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // Function for setting anchor element of the menu
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Function for closing menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Function for navigating to settings
    const gotoSettings = ()=>{
        history.push("/settings");
    }

    return(
        <>
        <div className={styles.profile}>
            <p>
                {`Welcome ${user?.fullName}`}
            </p>
            <Tooltip title="Account settings">
                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                    <Avatar src={user?.image ? user.image : avatarImage} />
                </IconButton>
            </Tooltip>
        </div>
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
                
            
            {
                // user?.role === UserRole.ADMIN && 
                // <CustomMenuItem onClick={gotoSettings}>
                //     <ListItemIcon>
                //         <Settings fontSize="small" />
                //     </ListItemIcon>
                //     Settings
                // </CustomMenuItem>
            }

            <CustomMenuItem onClick={onLogOut}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </CustomMenuItem>
      </Menu>
      </>
    )
}

export default ProfileMenu;