import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import './styles/home.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import * as ImageStore from '../store/ImageStore';
import { ApplicationState } from '../store/index';
import { useSelector,useDispatch } from 'react-redux';
import { padding } from '@mui/system';




interface Props{
    imageUrls : string[],
}
enum ChangeDirection{
    next,
    prev
}

function ImageViewer(props:Props ) {
     const state=useSelector((state:ApplicationState)=>state.image);
     const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const [currentImage,setCurrentImage] = useState<number>(0);
    const changeImage = (dir:ChangeDirection) =>{
        if(dir == ChangeDirection.next && currentImage < props.imageUrls.length-1){
            setCurrentImage(currentImage+1);
        }
        else if(dir == ChangeDirection.prev && currentImage > 0){
            setCurrentImage(currentImage-1);
        }
    }

    
    return (
      <div>
        <button className="imageBtn" onClick={handleClickOpen}>
          <img src={props.imageUrls[0]}></img>
        </button>
        <Dialog
          onClose={handleClose}
          open={open}
            PaperProps={{ style: {
            minHeight: '600px',
            maxHeight: '600px',
            }}}
        >
          <DialogTitle>
            Images 
          </DialogTitle>
          <DialogContent dividers>
            <div className='imageViewer'>
                <img src={props.imageUrls[currentImage]} />
                <div>
                <span style={{marginLeft:'8px'}}>{`${currentImage+1} / ${props.imageUrls.length}`}</span>
                <div>
                <button onClick={() => changeImage(ChangeDirection.prev)}>{"<"}</button>
                <button onClick={() => changeImage(ChangeDirection.next)}>{">"}</button>
                </div>
                </div>      
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

export default ImageViewer 