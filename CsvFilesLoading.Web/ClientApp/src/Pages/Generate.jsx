import React, { useState } from 'react'
import axios from 'axios'


const Generate = () => {

    const [amount, setAmount]=useState()


    const onAmountChange = e => {
        setAmount(e.target.value)
    }

    const onGenerateClick = () => {
        window.location.href=`/api/csv/generatecsv?amount=${amount}`
    }

    return (
        <div className='container' style={{ marginTop: '60px' }}>
            <div className="d-flex vh-100" style={{ marginTop: '-70px' }}>
                <div className="d-flex w-100 justify-content-center align-self-center">
                    <div className="row">
                        <input type="text" className="form-control-lg" placeholder="Amount" onChange={onAmountChange }></input>
                    </div>
                    <div className="row">
                        <div class="col-md-4 offset-md-2">
                            <button class="btn btn-primary btn-lg" onClick={onGenerateClick }>Generate</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Generate