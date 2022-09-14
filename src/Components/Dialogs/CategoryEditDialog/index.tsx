import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import React from 'react';
import styles from './categoryEdit.module.css';
import LoadingContext from '../../../Contexts/LoadingContext';
import ToastContext from '../../../Contexts/ToastContext';
import { Challenge } from '../../../types/Challenge';
import CategoryForm from '../../Forms/CategoryForm';

export interface CategoryEditDialogProps{
    open?: boolean;
    onClose: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => any;
    category?: Challenge;
}

const CategoryEditDialog: React.FC<CategoryEditDialogProps> = ({
    open = false, onClose, category
})=>{

    // Context
    const { setLoading } = React.useContext(LoadingContext);
    const { openError, openSuccess } = React.useContext(ToastContext);
    
   
    // Handlers
    const handleSave = (request: Challenge)=>{
        // setLoading(true);
        // console.log(request);
    }

    // Status messages
    let successMessage = `Category successfully updated`;
    let errorMessage = 'An error occurred while editing this category';
       

    return(
        <Dialog
            maxWidth= 'lg'
            PaperProps={{
                sx:{
                    backgroundColor: 'rgba(4, 6, 73, 0.7)',
                    width:'100%',
                }
            }}
            open={open}
            onClose={onClose}
            aria-labelledby="category-edit-dialog-title"
            aria-describedby="alert-category-description"
        >
            <DialogTitle sx={{ color: 'white' }} >Edit Challenge </DialogTitle>
            <DialogContent>
                <CategoryForm category={category} onClose={onClose} mode='edit' title='Edit Category'
                    onSubmit={handleSave}
                />
            </DialogContent>
            <DialogActions>
                <Button sx={{ color: 'white' }} onClick={onClose}>Close</Button>
            </DialogActions>
        
        </Dialog>
    )
}

export default CategoryEditDialog;