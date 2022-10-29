import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';

export interface DropdownOption{
    label: string;
    value: any;
}

export interface DropdownProps{
    options?: DropdownOption[];
    onChange?: (value: string) => any;
    val?: any;
    clear?: boolean;
    label?: string;
    hideNoneValue?: boolean;
}

const StyledSelect = styled(Select)(()=> ({
    '&.MuiOutlinedInput-root': {
        borderBottomColor: 'yellow',
    },

    '&.Mui-focused':{
        borderColor: 'white'
    }
}))

const Dropdown: React.FC<DropdownProps> = ({ 
    options = [], onChange, val = '', clear, label, hideNoneValue
})=>{

    // State
    const [optionValue, setOptionValue] = React.useState<any>(val);

    // Handlers
    const handleChange = (event: SelectChangeEvent) => {
        setOptionValue(event.target.value);
        onChange && onChange(event.target.value);
    };

    // Effect
    React.useEffect(()=>{
        console.log(val);
        if (clear) {
            setOptionValue(''); 
        }
    }, [clear])

    return(
        <FormControl sx={{ mb: 1, minWidth: "30%" }} size="small">
            <InputLabel 
                id="demo-select-small"
                sx={{
                    color: 'white',

                    '& label.Mui-focused':{
                        color: 'white',
                    },
                }}
            >
                {label}
            </InputLabel>
            <Select
                value={optionValue}
                onChange={handleChange}
                label={label}
                fullWidth
                sx={{
                    color: 'white',
                    '& fieldset': {
                        borderColor: 'white',
                    },

                    '&:hover':{
                        '& fieldset': {
                            borderColor: 'white !important',
                        },
                    },

                    '& .Mui-focused':{
                        '& fieldset': {
                            borderColor: 'white !important',
                        },
                    },

                    '& .MuiSvgIcon-root':{
                        color: 'white !important',
                    }

                }}
            >
                {
                    !hideNoneValue &&
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                }
                {
                    options?.map((item, index)=>(
                        <MenuItem value={item.value} key={index} >{item.label}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
}

export default Dropdown;