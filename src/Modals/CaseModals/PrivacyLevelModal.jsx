import React from 'react'

const PrivacyLevelModal = ({ setmodalIsOpen }) => {
  return (
    <>
          <div className='modal_wrapper'>
              <div className='modal_body'>
                  <div className='modal_head'>
                      <h5>Privacy Level</h5>
                      <i onClick={(() => setmodalIsOpen(''))} class="fa-solid fa-xmark"></i>
                  </div>

                  <p style={{
                      color: 'rgba(20, 20, 20, 0.8)',
                      marginTop: '15px',
                      fontWeight: '500'
                  }}>Level 1 (Default) <br/><br/>
                      Note: Only principal 
                  </p>
                
              </div>
          </div> 
    </>
  )
}

export default PrivacyLevelModal
