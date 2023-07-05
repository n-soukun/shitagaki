import AppBar from '@mui/material/AppBar';
import './App.css';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SettingsIcon from '@mui/icons-material/Settings';
import InputMultiline from './components/InputMultiline';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControlLabel, LinearProgress, Switch, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export interface Config {
  length: number
  activeMaxLength: boolean
}

function App() {

  const [text, setText] = useState("")
  const [config, setConfig] = useState<Config>({
    length: 100,
    activeMaxLength: false
  })
  const [configOpen, setConfigOpen] = useState(false)

  const textChangeHandler = (e: { target: { value: any; }; })=>{
    setText(e.target.value)
  }

  const textLength = text.replace(/\s+/g,"").length

  const writeClipboard = ()=>{
    navigator.clipboard.writeText(text).then(
      () => {
        alert('文章をコピーしました。');
      },
      () => {
        alert('コピーに失敗しました。');
      });
  }

  const handleLengthClick = ()=>{
    setConfigOpen(!configOpen)
  }

  const handleConfigClose = ()=>{
    setConfigOpen(false)
  }

  const handleLengthChange = (e: { target: { value: any; }; })=>{
    setConfig({...config, length: e.target.value})
  }

  return (
    <Box sx={{ flexGrow: 1, flexDirection: "column" }} display="flex" height={"100vh"}>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div">{textLength + (config.activeMaxLength ? " / " + config.length : "")}</Typography>
          <Box sx={{flexGrow: 1}}/>
          <IconButton size="medium" color="inherit" onClick={handleLengthClick}>
            <SettingsIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      {config.activeMaxLength && (
        <LinearProgress variant="determinate" value={textLength / config.length * 100} color={textLength > config.length ? "error" : "secondary"}/>
      )}
      <InputMultiline placeholder={'ここに入力！もしくは貼り付け！'} onChange={(e)=>textChangeHandler(e)} value={text}/>
      <Fab variant="extended" sx={{position: "absolute", right: "16px", bottom: "16px"}} color="secondary" onClick={writeClipboard}>
        <ContentCopyIcon sx={{ mr: 1 }} />
        Copy
      </Fab>
      <Dialog
        fullWidth={true}
        maxWidth="xs"
        open={configOpen}
        onClose={handleConfigClose}
      >
        <DialogTitle>文字数設定</DialogTitle>
        <DialogContent>
          <Box display="flex" sx={{flexDirection: "column", alignItems: "start"}}>
            <FormControlLabel control={<Switch onChange={(e)=>setConfig({...config,activeMaxLength: e.target.checked})}/>} label="最大文字数を有効にする" checked={config.activeMaxLength}/>
            <TextField id="outlined-basic" label="最大文字数" variant="outlined" type="number" margin="normal" onChange={handleLengthChange} disabled={!config.activeMaxLength} value={config.length} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfigClose}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
