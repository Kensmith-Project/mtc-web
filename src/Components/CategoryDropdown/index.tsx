import { Select, MenuItem, SelectChangeEvent, CardContent, Card, InputBase, Tooltip, IconButton, Input } from '@mui/material';
import React from 'react';
import SelectIcon from '../../svgs/SelectIcon';
import { useHistory, useLocation } from 'react-router';
import { Challenge } from '../../types/Challenge';
import { SchoolLevel } from '../../types/SchoolLevel';

const CategoryInput = <InputBase
    sx={{
        borderRadius: '10px',
        width: '100%',
        padding: '10px',
    }}
/>

export interface CategoryDropdownProps{
    categories?: Challenge[];
    onChange?: (value: string) => any;
    val?: string;
    clear?: boolean;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ 
    categories = [], onChange, val = '', clear
})=>{

    // Hooks
    const location = useLocation<{level: SchoolLevel}>();
    const history = useHistory();
    
    // State
    const [age, setAge] = React.useState(val);

    // Handlers
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
        onChange && onChange(event.target.value);
    };
    const gotoAddCategories = ()=>{
        history.push({
           pathname: "/admin/settings/categories/add",
           state:{ level: location.state.level }
        });
    }

    // Effect
    React.useEffect(()=>{
        console.log(val);
        if (clear) {
           setAge(''); 
        }
    }, [clear])

    return(
        <Card
            sx={{
                padding: 1
            }}
        >
            <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                IconComponent={SelectIcon}
                inputProps={{ 
                    'aria-label': 'Without label',
                }}
                input={CategoryInput}
            >
                    {
                        //categories.length > 0 &&
                        <MenuItem value="">
                            <em>Choose a Challenge</em>
                        </MenuItem>
                    }
                    {
                        //categories.length === 0 &&
                        <MenuItem value="" onClick={gotoAddCategories}>
                            <em>Create a Challenge</em>
                        </MenuItem>
                    }
                    {
                        categories?.map((item, index)=>(
                            <MenuItem value={item.name} key={item.id} >{item.name}</MenuItem>
                        ))
                    }
            </Select>
        </Card>
    )
}

export default CategoryDropdown;