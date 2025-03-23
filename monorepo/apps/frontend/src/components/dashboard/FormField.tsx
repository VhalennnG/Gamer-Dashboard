import React from "react";
import { TextField, Avatar, InputAdornment, Grid } from "@mui/material";

interface FormFieldProps {
  name?: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  multiline?: boolean;
  gridSize: {
    xs: number;
    sm?: number;
  };
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  value,
  onChange,
  icon,
  multiline = false,
  gridSize,
}) => {
  return (
    <Grid item {...gridSize}>
      <TextField
        fullWidth
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        margin='normal'
        multiline={multiline}
        rows={1}
        InputProps={{
          sx: { borderRadius: 1.5 },
          startAdornment: (
            <InputAdornment position='start'>
              <Avatar
                sx={{
                  bgcolor: "transparent",
                  color: "primary.main",
                  width: 32,
                  height: 32,
                }}>
                {icon}
              </Avatar>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

export default FormField;
