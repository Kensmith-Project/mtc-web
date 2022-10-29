import React from 'react';
import { 
    Toolbar, Typography, IconButton, Tooltip,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

export interface TableToolbarProps{
    numSelected?: number;
    title?: string;
    deleteCallback?: (event: React.MouseEvent)=> any;
    deleteMessage?: string;
}

export default function TableToolbar(props: TableToolbarProps){
    const { numSelected, title, deleteCallback, deleteMessage } = props;

    // Handlers
    const handleDelete = async (event: React.MouseEvent)=>{
      deleteCallback && deleteCallback(event);
    }
  
    return (
      <Toolbar>
        {numSelected && numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle" component="div">
            {title ? title : "Order Status"}
          </Typography>
          
        )}
  
        {numSelected != 0 && (
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
};