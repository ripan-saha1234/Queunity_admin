import React from 'react'

const AnnomityLevelModal = ({ setmodalIsOpen }) => {
  return (
    <>
          <div className='modal_wrapper'>
              <div className='modal_body'>
                  <div className='modal_head'>
                      <h5>Anonymity Level</h5>
                      <i onClick={(() => setmodalIsOpen(''))} class="fa-solid fa-xmark"></i>
                  </div>
                  
                  <p style={{
                      color:'rgba(20, 20, 20, 0.8)',
                      marginTop:'15px',
                      fontWeight:'500'
                  }}>Complete anonymous</p>
               
              </div>
          </div>
    </>
  )
}

export default AnnomityLevelModal
