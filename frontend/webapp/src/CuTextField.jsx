import TextField from "@mui/material/TextField";

const CuTextField = ({ label, type, value, onChange, required, autoFocus, name }) => {
    return (
        <TextField
            label={label}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            autoFocus={autoFocus}
            name={name}
            margin="dense"
        />
    );
};

export default CuTextField;