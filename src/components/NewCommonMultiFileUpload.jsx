import React, { useState } from 'react'
import '../css/CommonFileUpload.css'
const NewCommonMultiFileUpload = ({ onChange }) => {
    const [previews, setPreviews] = useState([])
    const handleChange = (e) => {
        const files = Array.from(e.target.files)

        const imageUrls = files.map(file => URL.createObjectURL(file))

        setPreviews(imageUrls)

        if (onChange) onChange(e)
    }
    return (
        <>
            <div className='file_upload_wrapper'>
                {previews.length > 0 ? (
                    <div className="preview_container">
                        {previews.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt="preview"
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'cover',
                                    margin: '5px'
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <>
                        <img src="/document-upload.png" alt="upload" />
                        <h2>
                            <span>Choose file</span> to upload <br />pdf, png, jpeg, jpg
                        </h2>
                    </>
                )}

                <input type='file' multiple onChange={handleChange} />
            </div>
        </>
    )
}

export default NewCommonMultiFileUpload
