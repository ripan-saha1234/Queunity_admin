import React, { useState } from 'react'
import '../css/CommonFileUpload.css'
const NewCommonFileUpload = ({ onChange }) => {
    const [preview, setPreview] = useState(null)

    const handleChange = (e) => {
        const file = e.target.files[0]

        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setPreview(imageUrl)
        }

        // pass to parent if needed
        if (onChange) onChange(e)
    }

    return (
        <div className='file_upload_wrapper'>
            {preview ? (
                <img
                    src={preview}
                    alt="preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            ) : (
                <>  
                    <img src="/document-upload.png" alt="upload" />
                    <h2>
                        <span>Choose file</span> to upload <br/>pdf, png, jpeg, jpg
                    </h2>
                </>
            )}

            <input type='file' onChange={handleChange} />
        </div>
    )
}

export default NewCommonFileUpload