import React, { useState } from 'react'
import CommonInput from '../../../../components/common-input'
import NewCommonMultiFileUpload from '../../../../components/NewCommonMultiFileUpload.jsx'
import InputCommon from '../../../../components/input_common.jsx'
import { WizardSection } from '../../../../components/WizardSection.jsx'
import { vehicleTypeOptions, directionOptions } from '../options'
import icon from '../../../../Assets/Frame.svg'
const WitnessVechicleForm = ({ isOpen = false, onToggle = () => { }, data = {}, setField = () => {}, onUpload = () => {} }) => {
    const [toggle, settoggle] = useState(false)

    return (
        <>
            <div className='other_Head_details_wrapper'>
                <section className="add-cases-section">
                    <WizardSection iconBg=" linear-gradient(135deg, #5CEFBC 0%, #1AAF67 100%)"
                              icon={<img src={icon} alt="" />}
                              title="Vehicle Details"
                              subtitle="Vehicle-related information"></WizardSection>
                </section>
                <div className='down_arrow_wrapper' onClick={onToggle} style={{ cursor: 'pointer' }}>
                    <img src={'/Layer_1.svg'} />
                    <div style={{
                        background: isOpen ? 'rgba(159, 197, 61, 0.16)' : '#e5e7eb',
                        width: '28px',
                        height: '28px',
                        borderRadius: '5px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <i class="fa-solid fa-angle-down" style={{
                            color: 'var(--deep-color)',
                            fontSize: '10px',
                            transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                            transition: 'transform 0.2s ease'
                        }}></i>
                    </div>
                </div>
            </div>

            {isOpen && (
            <div className='physical_details_wrapper'>
                <div className='add_description_wrapper'>
                    <h5>Want to add a description</h5>
                    <div style={!toggle ? {
                        flexDirection: 'row-reverse',
                        transition: '0.2s linear all',
                        background: 'grey'
                    } : {}} className='description_button' onClick={(() => settoggle(!toggle))}>
                        {toggle && <i class="fa-solid fa-check"></i>}
                        {!toggle && <i class="fa-solid fa-x"></i>}
                        <div className='description_circle'></div>
                    </div>
                </div>

                {toggle && (
                    <>
                <div className='four_grid_layout' style={{
                    marginTop: '20px'
                }}>
                    <div className="radio_main">
                        <label>Vehicle Type</label>
                        <InputCommon
                            type='select'
                            name="vehicle_type"
                            placeholder="Select vechicle type"
                            value={data.vehicle_type || ''}
                            onChange={(e) => setField('vehicle_type', e.target.value)}
                            options={vehicleTypeOptions}
                        />
                    </div>
                    <div className="radio_main">
                        <label>Color</label>
                        <CommonInput
                            name="color"
                            placeholder="Blue"
                            onChange={(e) => setField('color', e.target.value)}
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
                            onChange={(e) => setField('brand', e.target.value)}
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
                            onChange={(e) => setField('model', e.target.value)}
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
                            onChange={(e) => setField('marking', e.target.value)}
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
                            onChange={(e) => setField('damage', e.target.value)}
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
                            placeholder='Enter registration no'
                            onChange={(e) => setField('registration_no', e.target.value)}
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
                            name="vehicle_additional_info"
                            placeholder='Add additional info'
                            onChange={(e) => setField('vehicle_additional_info', e.target.value)}
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
                            type='select'
                            placeholder='Select direction'
                            value={data.direction || ''}
                            onChange={(e) => setField('direction', e.target.value)}
                            options={directionOptions}
                        />
                    </div>

                    <div className="radio_main">
                        <label>Last seen location </label>
                        <CommonInput
                            name="last_location"
                            placeholder='Enter last seen location'
                            onChange={(e) => setField('last_location', e.target.value)}
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
                    <NewCommonMultiFileUpload onChange={(e) => onUpload('image_urls', e.target.files)} />
                </div>
                    </>
                )}
            </div>
            )}
        </>
    )
}

export default WitnessVechicleForm
