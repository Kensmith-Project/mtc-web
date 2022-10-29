import { Avatar, Button, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material';
import { withStyles } from '@mui/styles';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import BaseTable, { EditButton } from '../../Components/BaseTable';
import CategoryEditDialog from '../../Components/Dialogs/CategoryEditDialog';
import Layout from '../../Components/Layout';
import LoadingContext from '../../Contexts/LoadingContext';
import ToastContext from '../../Contexts/ToastContext';
import { useCategories } from '../../Services/question';
import { Challenge } from '../../types/Challenge';
import { SchoolLevel } from '../../types/SchoolLevel';
import { mapCategoriesToRows } from '../../utils/uploadUtils';
import styles from './categorySettings.module.css';


const CategorySettings: React.FC<any> = ()=>{

    // Hooks
    const history = useHistory();
    const match = useRouteMatch();
    const { data, isLoading, isError } = useCategories()

    // Context
    const { setLoading } = React.useContext(LoadingContext);
    const { openError } = React.useContext(ToastContext);

    // State
    const [level, setLevel] = React.useState<SchoolLevel>();
    const [rows, setRows] = React.useState<any[]>([]);
    const [resetRows, setResetRows] = React.useState<any[]>();
    const [categoryToEdit, setCategoryToEdit] = React.useState<Challenge>();
    const [open, setOpen] = React.useState<boolean>();

    // Links and Handlers
    const handleDialogClose = ()=>{
        setOpen(false);
    }
    const gotoAddCategories = ()=>{
        history.push(`/admin/settings/categories/add?level=${level}`);
    }
    const handleClose = ()=>{
        history.goBack()
    }
    const gotoSettings = ()=>{
        history.push("/admin");
    }
    const handleHighCheck = (event: React.SyntheticEvent<Element, Event>, checked: boolean)=>{
        if(checked){
            setLevel('high');
        }   
    }
    const handleSecondaryCheck = (event: React.SyntheticEvent<Element, Event>, checked: boolean)=>{
        if(checked){
            setLevel('secondary');
        }   
    }
    const handleElementaryCheck = (event: React.SyntheticEvent<Element, Event>, checked: boolean)=>{
        if(checked){
            setLevel('elementary');
        }   
    }
    const handleOnSearchChange = (value: string)=>{
        let newRows = resetRows?.filter((row)=> row.name.toLowerCase().includes(value));
        setRows(newRows || []);
    }

    const handleDelete = (selectedRows: any[])=>{
        //setLoading(true);
        // dispatch(resetCategoryStatus());
        //dispatch(send('category-delete', selectedRows));
    }
    

    // Cell Render Function
    const renderEditCell = (params: GridRenderCellParams<any, any, any>)=>{
        const { row } = params;
        
        return(
            EditButton(params, (row: Challenge)=>{
                const cat = data?.find((item)=> item.id === row.id);
                setCategoryToEdit(cat);
                setOpen(true);
            })
        )
    }

    // Effect for fetching questions
    React.useEffect(()=>{
        
        if (isLoading) {
            setLoading(true);
        }
        else{
            setLoading(false);
        }

        if (isError) {
            setLoading(false);
            openError("Could not fetch the challenges")
        }

        if (data && level) {
            console.log(level);
            let newRows = data.filter((item)=>{
                if (item.level === level) {
                    return item;
                }
            })
            let mappedRows = mapCategoriesToRows(newRows);
            console.log(mappedRows);
            setRows(mappedRows);
        }
    }, [level, isLoading, isError])

    // Status messages
    let errorMessage = 'An error occurred while deleting categories';

    // Columns
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'name', headerName: 'Name', flex: 1,},
        { field: 'description', headerName: 'Description', flex: 1},
        { 
            field: 'edit', headerName: 'Action', 
            renderCell: renderEditCell,
            headerAlign: 'center',
            align: 'center',
        }
    ];

    // Radion control
    const CssRadio = withStyles({
        root: {
            color: '#FFFFFF',
            '&$checked': {
                color: 'white',
              },
        },
        checked: {}
    })(Radio)

    return(
        <Layout>
            {/** Edit Dialog */}
            <CategoryEditDialog onClose={handleDialogClose} open={open}
                category={categoryToEdit}
            />
            <div className={`${styles.container}`}>
                {/** Radio Select for Level */}
                <FormControl component="fieldset"
                    sx={{
                        marginBottom: '25px',
                        color: 'white',
                    }}
                >
                    <FormLabel component="legend" sx={{ 
                        color: 'white',
                        "&.Mui-focused": {
                            color: "white"
                        } 
                        }}>Choose Level</FormLabel>
                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                    <FormControlLabel value="elementary" control={<CssRadio/>} 
                            label="Elementary School"
                            onChange={handleElementaryCheck}
                        />
                        <FormControlLabel value="secondary" control={<CssRadio/>} 
                            label="Middle School"
                            onChange={handleSecondaryCheck} 
                        />
                        <FormControlLabel value="high" control={<CssRadio/>} 
                            label="High School"
                            onChange={handleHighCheck} 
                        />
                    </RadioGroup>
                </FormControl>
                <div className={styles.buttonGroup}>
                    <Button
                        onClick={gotoSettings}
                        variant='contained'
                        sx={{
                            color: 'white'
                        }}
                    >
                        Go Back
                    </Button>
                    {level && <Button
                        onClick={gotoAddCategories}
                        variant='contained'
                        sx={{
                            backgroundColor: '#E3EBFF',
                            color: 'black'
                        }}
                    >
                        Add Challenge
                    </Button>}
                </div>
                {level && <BaseTable
                    dataColumns={columns}
                    dataRows={rows}
                    title="Challenges"
                    onSearchChange={handleOnSearchChange}
                    onDelete={handleDelete}
                    deleteMessage={`Deleting this challenge will also delete all the questions associated with it. 
                    Are you sure you want to delete this?`}
                    //backgroundColor="rgb(255,255,255, 0.9)"
                />}
            </div>
        </Layout>
    )
}

export default CategorySettings;