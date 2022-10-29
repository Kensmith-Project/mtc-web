import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import styles from './questions.module.css';
import LoadingScreen from '../../LoadingScreen';
import MyStatusBar from '../../MyStatusBar';
import { SchoolLevel } from '../../../types/SchoolLevel';
import { UploadQuestionRequest } from '../../../types/requests/UploadQuestionRequest';
import { uploadQuestions } from '../../../Services/question';
import ToastContext from '../../../Contexts/ToastContext';
import { parseError } from '../../../utils/errorUtils';

export interface QuestionUploadDialogProps{
    open?: boolean;
    onClose: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => any;
    level: SchoolLevel;
}

const QuestionUploadDialog: React.FC<QuestionUploadDialogProps> = ({
    open = false, onClose, level
})=>{

    // Context
    const { openSuccess, openError } = React.useContext(ToastContext);

    // State
    const [drag, setDrag] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState<File>();
    const [loading, setLoading] = React.useState<boolean>(false);


    // Refs
    const dropRef = React.createRef<HTMLDivElement>();
    let dragCounter = React.useRef(0);

    // Handlers
    const handleUpload = async ()=>{
        let request: UploadQuestionRequest = {
            level: level
        }
        setLoading(true);
        
        const { data, error } = await uploadQuestions(request, selectedFile);

        if (data && data.success) {
            setLoading(false);
            openSuccess(data?.message || 'Questions successfully uploaded');
            onClose && onClose();
        }

        if (error) {
            setLoading(false);
            openError(parseError(error));
        }
    }
    const handleChange = async (event: React.FormEvent<HTMLInputElement>)=>{
        //const file = await uploadQuestion();
        const fileList = event.currentTarget.files;
        if (fileList) {
            console.log(fileList);
            setSelectedFile(fileList[0]);
        }
    }

    const handleDelete = ()=>{
        setSelectedFile(undefined);
    }

    const handleDrag = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDragIn = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('INE');
        dragCounter.current++;
        if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
          setDrag(true);
        }
    }

    const handleDragOut = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current--;
        if (dragCounter.current === 0) {
            setDrag(false);
        }
    }

    const handleDrop = (e: any) => {
        //console.log('DROPPED');
        e.preventDefault()
        e.stopPropagation()
        setDrag(false);
        if (e.dataTransfer?.files && e.dataTransfer?.files.length > 0) {
            setSelectedFile(e.dataTransfer?.files[0].path);
            e.dataTransfer.clearData()
            dragCounter.current = 0    
        }
    }
    
    // Subscribe event listeners
    const subscribe = ()=>{
        let div = dropRef.current;
        div?.addEventListener('dragenter', handleDragIn);
        div?.addEventListener('dragleave', handleDragOut)
        div?.addEventListener('dragover', handleDrag)
        div?.addEventListener('drop', handleDrop);
    }

    // Unsubscribe from  event listeners
    const unsubscribe = ()=>{
        let div = dropRef.current;
        div?.removeEventListener('dragenter', handleDragIn);
        div?.removeEventListener('dragleave', handleDragOut);
        div?.removeEventListener('dragover', handleDrag);
        div?.removeEventListener('drop', handleDrop);
    }

    React.useEffect(()=>{
        subscribe();
        return unsubscribe;
    },[]);


    const upload = (
        <Card sx={{ 
            position: 'relative' , padding: '20px'
        }}>

            {/** Upload instruction */}
            <div className={styles.instruction}>
                {`Import your .csv or .xlsx file to upload your questions`}
            </div>

            {/** Upload buttom */}
            <div className={styles.buttonContainer}>
                {!selectedFile && 
                <span>
                <label htmlFor="contained-button-file" className={styles.labelBtn}>
                    Choose a file
                </label>
                <input id='contained-button-file' type="file" onChange={handleChange} />
                    {/* {" or drag it here"} */}
                </span>}
                {
                    selectedFile && (
                        <div>
                            {selectedFile.name} 
                            <span>
                                {/** Close Icon */}
                                <IconButton aria-label="close" onClick={handleDelete} >
                                    <CloseIcon sx={{ fontSize: '16px' }} />
                                </IconButton>
                            </span>
                        </div>
                    )
                }
            </div>
        </Card>
    )
    

    return(
        <>
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="upload-question-dialog-title"
            aria-describedby="upload-question-dialog-description"
            PaperProps={{
                ref: dropRef
            }}
        >
            {drag && <div className={styles.hovered}></div>}
            <DialogTitle sx={{ textAlign: 'center' }}>
                Import a CSV or Excel file
                {/** Close Icon */}
                <div className={styles.close}>
                    <IconButton aria-label="close" onClick={onClose} >
                        <CloseIcon/>
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent sx={{ padding: 0}} >
                { loading && <LoadingScreen/>}
                { upload }
            </DialogContent>
            <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <Button
                    variant="outlined"
                    onClick={handleUpload}
                    disabled={!selectedFile}
                >Upload</Button>
                <Button
                    href={process.env.PUBLIC_URL + '/template.xlsx'}
                    download
                    //onClick={handleDownloadClick}
                    variant="outlined"
                >
                    DOWNLOAD TEMPLATE
                </Button>

            </DialogActions>
        
        </Dialog>
        </>
    )
}

export default QuestionUploadDialog;