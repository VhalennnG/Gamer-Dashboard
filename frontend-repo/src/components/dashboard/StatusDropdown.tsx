import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  InputAdornment,
  Grid,
  SelectChangeEvent,
} from "@mui/material";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

interface StatusDropdownProps {
  value: string;
  onChange: (newValue: string) => void;
  gridSize: {
    xs: number;
    sm?: number;
  };
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  value,
  onChange,
  gridSize,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  // Status options with colors
  const statusOptions = [
    { value: "online", label: "Online", color: "#4caf50" },
    { value: "offline", label: "Offline", color: "#9e9e9e" },
    { value: "in-game", label: "In Game", color: "#2196f3" },
    { value: "away", label: "Away", color: "#ff9800" },
  ];

  return (
    <Grid item {...gridSize}>
      <FormControl fullWidth margin='normal'>
        <InputLabel id='status-select-label'>Status</InputLabel>
        <Select
          labelId='status-select-label'
          id='status-select'
          value={value}
          onChange={handleChange}
          label='Status'
          sx={{ borderRadius: 1.5 }}
          startAdornment={
            <InputAdornment position='start'>
              <Avatar
                sx={{
                  bgcolor: "transparent",
                  color: "primary.main",
                  width: 32,
                  height: 32,
                }}>
                <SignalCellularAltIcon />
              </Avatar>
            </InputAdornment>
          }>
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: option.color,
                    display: "inline-block",
                    marginRight: 8,
                  }}
                />
                {option.label}
              </div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default StatusDropdown;
