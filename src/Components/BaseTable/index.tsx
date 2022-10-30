import * as React from 'react';
import { DataGrid, GridCallbackDetails, GridCellParams, GridColDef, GridRenderCellParams, GridSelectionModel, GridValueGetterParams, MuiEvent } from '@mui/x-data-grid';
import { Tooltip, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles'
import { Edit, Search } from '@mui/icons-material';
import styles from './table.module.css';
import CustomNoRowsOverlay from '../NoRowsOverlay';
import TableToolbar from './TableToolbar'


const useStyles = makeStyles((theme)=>({
    root:{
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
        },
    }
}))

export interface BaseTableProps{
    dataColumns?: GridColDef[];
    dataRows?: any[];
    title?: string;
    backgroundColor?: string;
    color?: string;
    searchPlaceholder?: string;
    onSearchChange?: (value: string) => any;
    onDelete?: (selectedRows: number[]) => any;
    deleteMessage?: string;
}

export const EditButton = (params: GridRenderCellParams<any, any, any>,
    onEditCallback: (row: any)=> any
    ) =>(
    <Tooltip title="edit">
        <IconButton 
            aria-label="edit"
            onClick={()=> onEditCallback(params.row)}
            sx={{
                zIndex: 100,
                borderRadius: 1,
                padding: "3px",
                border: "1px solid black",
                boxShadow: "0 1px 0 0 transparent",

                '&:active':{
                    boxShadow: "0 0 1px 0 transparent inset",
                }
            }} 
        >
            <Edit
                sx={{
                    fontSize: "0.88rem",
                }}
            />
        </IconButton>
    </Tooltip>
)



export default function BaseTable(props: BaseTableProps) {

    const { 
        dataRows, dataColumns, title, color,
        backgroundColor, searchPlaceholder,
        onSearchChange = ()=>{},
        onDelete, deleteMessage
    } = props;

    let defaultRows = dataRows || [
        { id: 1, name: "John Smith", age: "10", grade: "5th" },
        { id: 2, name: "Pan Smith", age: "10", grade: "5th" },
        { id: 3, name: "Ikem Smith", age: "10", grade: "5th" },
        { id: 4, name: "Mary Bell", age: "10", grade: "5th",},
        { id: 5, name: "Fat Benjamin Chukwueze", age: "10", grade: "5th",},
        { id: 6, name: "John Smith", age: "10", grade: "5th",},
        { id: 7, name: "John Smith", age: "10", grade: "5th",},
        { id: 8, name: "Edward Smith", age: "10", grade: "5th",},
        { id: 9, name: "John Smith", age: "10", grade: "5th",},
        { id: 10, name: "John Smith", age: "10", grade: "5th",},
        { id: 11, name: "John Smith", age: "10", grade: "5th",},
        { id: 12, name: "John Smith", age: "10", grade: "5th",},
      ];

    const classes = useStyles();
    const [selectedIds, setSelectedIds] = React.useState<any[]>([]);
    const [rows, setRows] = React.useState<any[]>([]);
    const [resetRows, setResetRows] = React.useState<any[]>(defaultRows);

    const deleteCallback = ()=>{
        // let newRows = rows.filter((row)=> !(selectedIds.includes(row.id)));
        onDelete && onDelete(selectedIds);
        // let newFilteredRows = resetRows.filter((row)=> !(selectedIds.includes(row.id)));
        // setRows(newRows);
        // setResetRows(newFilteredRows);
    }

    // custom
    // const onEditCallback = (row: Player)=>{
    //     alert(JSON.stringify(row));
    // }

    const handleSelectModelChange = (ids: GridSelectionModel, details: GridCallbackDetails)=>{
        setSelectedIds(ids);
    }

    const handleChange = (event: React.FormEvent<HTMLInputElement>)=>{
        let value = event.currentTarget.value.toLowerCase();
        onSearchChange && onSearchChange(value);

        //let newRows = resetRows.filter((row)=> row.name.toLowerCase().includes(value));
        //setRows(newRows);
    }

    // Effect
    React.useEffect(()=>{
        if (dataRows) {
            setRows(dataRows);
        }
    }, [dataRows])

    // const columns: GridColDef[] = dataColumns || [
    //     { field: 'id', headerName: 'ID',},
    //     { field: 'name', headerName: 'Name', flex: 2},
    //     { field: 'age', headerName: 'Age', flex: 1},
    //     { field: 'grade', headerName: 'Grade', flex: 1},
    //     { 
    //         field: 'edit', headerName: 'Action', 
    //         renderCell: (params: GridRenderCellParams<any, any, any>)=> EditButton(params, onEditCallback), 
    //         headerAlign: 'center',
    //         align: 'center',
    //     }
    // ];

    const searchBar = (
        <div className={styles.inputArea}>
            <Search
                sx={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    paddingLeft: '5px'
                }}
            />
            <input type="text" placeholder={searchPlaceholder || "Search by name..."} onChange={handleChange} />
        </div>
    )

  return (
    <div style={{ width: 'auto'}}>
        {/** Searcvh bar */}
        <div className={styles.searchBar}>
            {searchBar}
        </div>

        {/** Table */}
        <div style={{backgroundColor: (backgroundColor || 'white'), color: color }}>
            <TableToolbar
                numSelected={selectedIds.length}
                deleteCallback={deleteCallback}
                title={title || "Players"}
                deleteMessage={deleteMessage}
            />
            <DataGrid
                rows={rows}
                columns={dataColumns || []}
                rowsPerPageOptions={[8]}
                pageSize={8}
                checkboxSelection
                autoHeight
                disableSelectionOnClick
                onSelectionModelChange={handleSelectModelChange}
                components={{
                    NoRowsOverlay: CustomNoRowsOverlay,
                }}
                classes={{
                    root: classes.root
                }}
            />
        </div>
    </div>
  );
}
