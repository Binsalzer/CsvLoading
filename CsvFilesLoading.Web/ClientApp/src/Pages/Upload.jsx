import React, { useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
})


const Upload = () => {

    const ref = useRef()
    const navigate = useNavigate()


    const onUploadClick =async () => {
        if (!ref.current.files.length) {
            return
        }
        const file = ref.current.files[0]
        const base64 = await toBase64(file)
        await axios.post('/api/csv/upload', { base64: base64 })
        navigate('/')
    }

    return (
        <div className="container" style={{ marginTop: '60px' }} >
            <div className="d-flex vh-100" style={{ marginTop: '-70px' }}>
                <div className="d-flex w-100 justify-content-center align-self-center">
                    <div className="row">
                        <div className="col-md-10">
                            <input type="file" ref={ref} className="form-control"></input>
                        </div>
                        <div class="col-md-2">
                            <button className="btn btn-primary" onClick={ onUploadClick}>Upload</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload
