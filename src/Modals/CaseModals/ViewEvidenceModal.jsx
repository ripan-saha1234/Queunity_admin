import React from 'react'

const ViewEvidenceModal = ({ title, setmodalIsOpen }) => {
  return (
    <>
          <div className='modal_wrapper'>
              <div className='modal_body'>
                  <div className='modal_head'>
                      <h5>{title}</h5>
                      <i class="fa-solid fa-xmark" onClick={(() => setmodalIsOpen(false))}></i>
                  </div>

                  <img style={{
                    width:'100%',
                    borderRadius:'10px',
                    height:'250px',
                    objectFit:'cover'
                  }} src='/Image (Vehicle 2).png'/>

                  <p style={{
                      color:'rgba(49, 65, 88, 1)',
                      fontSize:'14px',
                   
                  }}><strong style={{
                          marginBottom: '10px',display:'block'
                  }}>Description:</strong>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
          </div>
    </>
  )
}

export default ViewEvidenceModal
