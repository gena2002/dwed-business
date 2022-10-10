import React, {useState} from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {observer} from "mobx-react-lite";
import styled from "styled-components";

type Props = {
    image: string;
    onCrop: (file: any) => void;
}

const MyCropper = ({image, onCrop}: Props) => {

        const [cropData, setCropData] = useState("#");
        const [cropper, setCropper] = useState<any>();

        const [cancel, setCancel] = useState<boolean>(true)

        const getCropData = () => {
            if (typeof cropper !== "undefined") {
                setCropData(cropper.getCroppedCanvas().toDataURL());
                setCancel(false)
            }
        };

        const Cancel = () => {
            setCancel(true)
        }

        console.log(cropData)

        return (
            <div>
                {
                    !cancel ? <div>
                        <Box
                            style={{width: "50%", float: "left", height: "300px"}}
                        >
                            <button onClick={Cancel}>Cancel</button>
                            <button onClick={() => onCrop(cropData)}>Upload</button>
                            <img style={{width: "100%"}} src={cropData} alt="cropped"/>
                        </Box>
                    </div> : <div style={{width: "100%"}}>
                        <Cropper
                            style={{height: 400, width: "100%"}}
                            zoomTo={0.5}
                            initialAspectRatio={1}
                            // preview=".img-preview"
                            src={image}
                            viewMode={1}
                            minCropBoxHeight={10}
                            minCropBoxWidth={10}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                            onInitialized={(instance) => {
                                setCropper(instance);
                            }}
                            guides={true}
                            rotateTo={50}
                        />
                        <h1>
                            <span>Crop</span>
                            <button style={{float: "right"}} onClick={getCropData}>
                                Crop Image
                            </button>
                        </h1>
                    </div>
                }
            </div>
        );
    }
;

export default observer(MyCropper);

const Box = styled.div`
  display: inline-block;
  padding: 10px;
  box-sizing: border-box;
`
const ImgPreview = styled.div`
  overflow: hidden;
  max-width: 200px;
  max-height: 200px;
  min-width: 200px;
  min-height: 200px;
`

// {/*<Box style={{ width: "50%", float: "right" }}>*/}
// {/*    <h1>Preview</h1>*/}
// {/*    <ImgPreview*/}
// {/*        className="img-preview"*/}
// {/*        style={{ width: "100%", float: "left", height: "300px" }}*/}
// {/*    />*/}
// {/*</Box>*/}