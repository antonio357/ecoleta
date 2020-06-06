import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import './styles.css'
import { FiUpload } from "react-icons/fi";

interface Props {
    onFileuploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({onFileuploaded}) => {
    const [seletecFileUrl, setSeletecFileUrl] = useState('')

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]
    const fileUrl = URL.createObjectURL(file)
    setSeletecFileUrl(fileUrl)
    onFileuploaded(file)
  }, [onFileuploaded])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
      onDrop,
      accept: 'image/*'
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*"/>
      {
        isDragActive ?
          <p> solte a imagem ...</p> :
          ( seletecFileUrl ?
            <img src={seletecFileUrl} alt="Location Thumbnail"/>
            : (
                <p>
                    <FiUpload />
                    Arraste a imagem do estabelecimento até aqui, ou click para selecionar a imagem
                </p>
              )
          )
      }
    </div>
  )
}

export default Dropzone