import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import styled from "styled-components";
import {Gallery, Camera} from "iconsax-react";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";

type Props = {
    preview_link?: string;
    image: any,
    setImage: Dispatch<SetStateAction<any>>;
}

const ImageUpload = ({image, setImage, preview_link}: Props) => {
    const {t} = useTranslation();
    // const [selectedFile, setSelectedFile] = useState<any>()
    const [preview, setPreview] = useState<any>()

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!image) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(image)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [image])

    const onSelectFile = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setImage(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setImage(e.target.files[0])

        // console.log([e.target.result].join(''))
        // console.log(e.target.files[0])
        // console.log(window.URL.createObjectURL(e.target.files[0]))
        //
        // const file = e.target.files[0];
        // console.log(typeof (file))
        // setImage(e.target.files[0]);


        // if (file.size > 3145728) {
        //     setImageSelectError(true);
        // } else {
        //     setImage(file);
        //     setImageSelectError(false);
        //     setState(window.URL.createObjectURL(e.target.files[0]))
        // }
    }


    useEffect(() => {
        setPreview(preview_link)
    }, [preview_link])

    return (
        <div>
            <Dropzone>
                <MyGalleryIcon
                    variant={'Linear'}
                    size="48"
                    color="#D0D5DD"
                />
                <Text variant={'body2'} color={'text.secondary'}>{t("ImageUploadTitle")}</Text>
                <Image style={{
                    backgroundImage: `url(${preview})`
                }}/>

                <Black>
                    <Camera
                        size="38"
                        color="#fff"
                    />
                </Black>
                <FileInput type={'file'} accept="image/png, image/jpeg" onChange={onSelectFile}/>

            </Dropzone>
        </div>
    );
};

export default ImageUpload;

// const Dropzone = styled.img`
//   width: 200px;
//   height: 200px;
// `;

const Black = styled.div`
  position: absolute;
  background-color: black;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: all .3s;
`;

const Dropzone = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border: 2px dashed #D0D5DD;
  border-radius: 8px;
  overflow: hidden;

  &:hover ${Black} {
    opacity: 0.7;
  }
`;

const MyGalleryIcon = styled(Gallery)`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
`;

const Text = styled(Typography)`
  text-align: center;
  font-size: 12px !important;
  width: 75%;
  position: absolute;
  top: 58%;
  left: 50%;
  transform: translateX(-50%);
  user-select: none;
  -webkit-user-select: none;
  pointer-events: none;
`;

const Image = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

`;
const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  opacity: 0;
  cursor: pointer;
`;