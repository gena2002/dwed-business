import React, {useState} from 'react';
import styled from "styled-components";
import Popup from "../atoms/Popup";
import Button from "@mui/material/Button";
import {observer} from "mobx-react-lite";
import MyCropper from "../atoms/MyCropper";

type Props = {
    onCrop: (file: any) => void;
}

const CropperPopup = ({onCrop}: Props) => {
    const [open, setOpen] = useState(false);

    const [image, setImage] = useState('');
    const [cropData, setCropData] = useState("#");
    const [cropper, setCropper] = useState<any>();

    const onChange = (e: any) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result as any);
        };
        console.log(files[0])
        reader.readAsDataURL(files[0]);
    };


    return (<>
            <Button style={{maxWidth: '235px'}} onClick={() => {
                setOpen(true)
            }} variant="outlined">
                Add Image
            </Button>
            <Popup open={open} onClose={() => {
                setImage('')
                setOpen(false)
            }}>
                <Root>
                    {
                        image === '' ?
                            <Center>
                                <input type="file" onChange={onChange}/>
                            </Center> :
                            <MyCropper image={image} onCrop={onCrop}/>
                    }
                </Root>
            </Popup>
        </>
    );
};

export default observer(CropperPopup);

const Root = styled.div`
  background-color: white;
  border-radius: 18px;
  width: 500px;
  height: 500px;
  position: relative;
`;

const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


