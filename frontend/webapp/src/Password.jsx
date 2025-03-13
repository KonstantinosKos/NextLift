import {useState} from "react";
import TextField from "@mui/material/TextField";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from "@mui/material/IconButton";
import {InputAdornment} from "@mui/material";

const Password = ({label, type, value, onChange, required, autoFocus, name, error}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    return (
        <TextField
            error={error}
            type={showPassword ? 'text' : type}
            label={label}
            value={value}
            onChange={onChange}
            name={name}
            required={required}
            autoFocus={autoFocus}
            margin="dense"
            slotProps={{
                input: {
                    endAdornment:
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                }
            }}
        />
    )
}

export default Password;