import { Input, InputProps } from "@mui/material";

const InputMultiline: React.FC<InputProps> = (props)=>{
  return (
    <Input style={TextAreaStyle} {...props} multiline disableUnderline={true} sx={{padding: {xs: "16px", sm: "24px"}}}/>
  );
}

export default InputMultiline

const TextAreaStyle: React.CSSProperties = {
  boxSizing: "border-box",
  border: "none",
  alignItems: "start",
  flexGrow: 1,
}