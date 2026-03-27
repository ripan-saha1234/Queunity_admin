import React, { useState } from 'react'
import CommonInput from '../../../../components/common-input'
import CommonFileUpload from '../../../../components/common-file-upload.jsx'
import NewCommonMultiFileUpload from '../../../../components/NewCommonMultiFileUpload.jsx'
import PhysicalDetails from './PhysicalDetails.jsx'
import InputCommon from '../../../../components/input_common.jsx'
const VehicleDetails = () => {
  const [toggle, settoggle] = useState(true)

  return (
    <>
      <div className='other_Head_details_wrapper'>
        <section className="add-cases-section">
          <div className="add-cases-section-header">
            <div className="add-cases-section-icon">
              <img src={'/Container (3).svg'} />
            </div>
            <div className="add-cases-section-header-text">
              <h3 className="add-cases-section-title">Vehicle Details</h3>
              <p className="add-cases-section-subtitle">When & where it happened</p>
            </div>
          </div>
        </section>
        <div className='down_arrow_wrapper'>
          <img src={'/Layer_1.svg'} />
          <div style={{
            background: 'rgba(159, 197, 61, 0.16)',
            width: '28px',
            height: '28px',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <i class="fa-solid fa-angle-down" style={{
              color: 'var(--deep-color)',
              fontSize: '10px'
            }}></i>
          </div>
        </div>
      </div>

      <div className='physical_details_wrapper'>
        <div className='add_description_wrapper'>
          <h5>Want to add a description</h5>
          <div style={!toggle ? {
            flexDirection: 'row-reverse',
            transition: '0.2s linear all',
            background: '#f1f6df'
          } : {}} className='description_button' onClick={(() => settoggle(!toggle))}>
            {toggle && <i class="fa-solid fa-check"></i>}
            {!toggle && <i class="fa-solid fa-x"></i>}
            <div className='description_circle'></div>
          </div>
        </div>

        <div className='four_grid_layout' style={{
          marginTop: '20px'
        }}>
          <div className="radio_main">
            <label>Vehicle Type</label>
            <InputCommon
              type='select'
              name="vehicle_type"
              placeholder="Select vechicle type"
              value=""
            
            />
          </div>
          <div className="radio_main">
            <label>Color</label>
            <CommonInput
              name="color"
              placeholder="Blue"
              value=""
              style={{
                height: '50px',
                borderRadius: '8px',
                padding: '0px 10px'
              }}
            />
          </div>

          <div className="radio_main">
            <label>Brand</label>
            <CommonInput
              name="brand"
              placeholder="Enter brand name"
              value=""
              style={{
                height: '50px',
                borderRadius: '8px',
                padding: '0px 10px'
              }}
            />
          </div>

          <div className="radio_main">
            <label>Model</label>
            <CommonInput
              name="model"
              placeholder="Enter vehicle model"
              value=""
              style={{
                height: '50px',
                borderRadius: '8px',
                padding: '0px 10px'
              }}
            />
          </div>

          <div className="radio_main">
            <label>Marking</label>
            <CommonInput
              name="marking"
              placeholder="Enter marking"
              value=""
              style={{
                height: '50px',
                borderRadius: '8px',
                padding: '0px 10px'
              }}
            />
          </div>

          <div className="radio_main">
            <label>Damage</label>
            <CommonInput
              name="damage"
              value=""
              style={{
                height: '50px',
                borderRadius: '8px',
                padding: '0px 10px'
              }}
            />
          </div>

          <div className="radio_main">
            <label>Registration No</label>
            <CommonInput
              name="registration_no"
              value=""
              placeholder='Enter registration no'
              style={{
                height: '50px',
                borderRadius: '8px',
                padding: '0px 10px'
              }}
            />
          </div>

          <div className="radio_main">
            <label>Additional Info </label>
            <CommonInput
              name="addition_info"
              value=""
              placeholder='Add additional info'
              style={{
                height: '50px',
                borderRadius: '8px',
                padding: '0px 10px'
              }}
            />
          </div>

          <div className="radio_main">
            <label>Direction of travel</label>
            <InputCommon
              name="direction"
              value=""
              type='select'
              placeholder='Select direction'
              style={{
                height: '50px',
                borderRadius: '8px',
                padding: '0px 10px'
              }}
            />
          </div>

          <div className="radio_main">
            <label>Last seen location </label>
            <CommonInput
              name="last_location"
              value=""
              placeholder='Enter last seen location'
              style={{
                height: '50px',
                borderRadius: '8px',
                padding: '0px 10px'
              }}
            />
          </div>


        </div>

        <div className="radio_main" style={{
          marginTop: '20px'
        }}>
          <NewCommonMultiFileUpload />
        </div>
      </div>
    </>
  )
}

export default VehicleDetails
