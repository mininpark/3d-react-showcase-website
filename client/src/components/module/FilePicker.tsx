import React from 'react'
import CustomButton from '../atoms/CustomButton'

// change logo img on tshirt
const FilePicker = ({ file, setFile, readFile }: any) => {
  return (
    <div className="filepicker-container">
      <div className="picker__file">
        <input
          id="file-upload"
          type="file"
          // only accept image files
          accept="image/*"
          onChange={(e) => setFile(e.target.files![0])} />
        <label htmlFor="file-upload" className="filepicker-label">Upload File</label>
        <p className="picker__file-name">{file === '' ? "No file selected" : file.name}</p>
      </div>
      <div className="picker__file-btn">
        <CustomButton
          type="outline"
          title="Logo"
          handleClick={() => readFile('logo')}
        />
        <CustomButton
          type="filled"
          title="Full"
          handleClick={() => readFile('full')}
        />
      </div>
    </div>
  )
}

export default FilePicker