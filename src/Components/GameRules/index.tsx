import React from 'react';
import styles from './gameRules.module.css';
import RuleIcon from '../../svgs/RuleIcon';
import { Card, CardContent, CardHeader } from '@mui/material';
import { Rule } from '../../types/Challenge';

export interface RuleProps{
    rule: string;
    afterText?: string;
    icon?: JSX.Element;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string | number | readonly string[]
}
const RuleDisplay: React.FC<RuleProps> = ({ 
    rule, afterText, icon = <RuleIcon/>, value,
    onChange
})=>{

    // Refs
    let spanRef = React.useRef<any>();

    return(
        <div className={styles.ruleMain}>
            {/** Icon */}
            <div>
                {icon}
            </div>

            {/** Label */}
            <div className={styles.labelGroup}>
                <p>{rule}
                    <span ref={spanRef}>
                        <input type="text" onChange={onChange} value={value}/>
                    </span>
                    {afterText}
                </p>
            </div>
        </div>
    )
}

export interface GameRuleState{
    maxSkip?: string | number;
    maxTime?: string | number;
    plusPoints?: string | number;
    minusPoints?: string | number;
    roundName?: string | number;
}

export interface GameRulesProps{
    rule?: Rule;
    onRuleChange?: (state: GameRuleState)=> any;
}
const GameRules: React.FC<GameRulesProps> = ({ rule, onRuleChange })=>{

    // State
    const [maxSkip, setMaxSkip] = React.useState<string | number>('');
    const [maxTime, setMaxTime] = React.useState<string | number>('');
    const [plusPoints, setPlusPoints] = React.useState<string | number>('');
    const [minusPoints, setMinusPoints] = React.useState<string | number>('');
    const [roundName, setRoundName] = React.useState<string | number>('');

    // Handlers
    const handleMaxSkipChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        onRuleChange && onRuleChange({ 
            maxSkip: event.currentTarget.value, maxTime, plusPoints, minusPoints, roundName 
        })
        setMaxSkip(event.currentTarget.value);
    }
    const handleMaxTimeChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        onRuleChange && onRuleChange({ 
            maxTime: event.currentTarget.value, maxSkip, plusPoints, minusPoints, roundName 
        })
        setMaxTime(event.currentTarget.value);
    }
    const handlePlusPointsChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        onRuleChange && onRuleChange({ 
            plusPoints: event.currentTarget.value, maxSkip, maxTime, minusPoints, roundName 
        })
        setPlusPoints(event.currentTarget.value);
    }
    const handleMinusPointsChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        onRuleChange && onRuleChange({ 
            minusPoints: event.currentTarget.value, maxSkip, maxTime, plusPoints, roundName 
        })
        setMinusPoints(event.currentTarget.value);
    }
    const handleRoundNameChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        onRuleChange && onRuleChange({ 
            roundName: event.currentTarget.value, maxSkip, maxTime, plusPoints, minusPoints 
        })
        setRoundName(event.currentTarget.value);
    }

    // Effect
    React.useEffect(()=>{
        if (rule) {
            setMaxSkip(rule.maxSkip || 0);   
            setMaxTime(rule.maxTime || 0);   
            setPlusPoints(rule.plusPoints || 0);   
            setMinusPoints(rule.minusPoints || 0);   
            setRoundName(rule.roundName || 0);   
        }
    }, [rule])

    // Rules
    const rules: RuleProps[] =[
        { rule: "You can only skip ", afterText: "X", value: maxSkip, onChange: handleMaxSkipChange },
        { rule: "Time duration is ", afterText: "s", value: maxTime, onChange: handleMaxTimeChange },
        { 
            rule: "Each right answer has ", afterText: "points addition", 
            value: plusPoints, onChange: handlePlusPointsChange 
        },
        { 
            rule: "Each wrong answer has ", afterText: "points reduction",
            value: minusPoints, onChange: handleMinusPointsChange 
        },
    ]

    return(
        <Card sx={{ backgroundColor: '#ff8503', borderRadius: '23px' }}>
            <CardHeader title="Game Rules"
                sx={{
                    fontFamily: 'Rubik',
                    fontStyle: 'italic',
                    lineHeight: '43px',
                    color: 'white',
                    textAlign: 'center',
                    '& .MuiCardHeader-title	':{
                        fontWeight: '500',
                        fontSize: '30px',
                    }
                }}
            />
            <CardContent>
                {
                    rules.map((rule, index)=>(
                        <RuleDisplay key={`rule${index}`} {...rule}/>
                    ))
                }
                 <div className={styles.ruleMain}>
                    {/** Icon */}
                    <div>
                        <RuleIcon/>
                    </div>

                    {/** Label */}
                    <div className={styles.labelGroup}>
                        <p>
                            <span>
                                <input type="text" style={{ width: "70%", textAlign: 'left' }}
                                    value={roundName} onChange={handleRoundNameChange}
                                />
                            </span>
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default GameRules;