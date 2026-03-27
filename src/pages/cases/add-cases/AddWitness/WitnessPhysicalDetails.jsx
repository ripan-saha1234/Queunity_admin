import React, { useState } from 'react'
import CommonInput from '../../../../components/common-input'
import NewCommonMultiFileUpload from '../../../../components/NewCommonMultiFileUpload.jsx'
const WitnessPhysicalDetails = () => {
    const [toggle, settoggle] = useState(true)

    return (
        <>
            <div className='other_Head_details_wrapper'>
                <section className="add-cases-section">
                    <div className="add-cases-section-header">
                        <div className="add-cases-section-icon">
                            <img src={'/Container (2).svg'} />
                        </div>
                        <div className="add-cases-section-header-text">
                            <h3 className="add-cases-section-title">Physical Details</h3>
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
                        <label>Height (estimate in cm)</label>
                        <CommonInput
                            name="height"
                            placeholder="Enter Height"
                            value=""
                            style={{
                                height: '50px',
                                borderRadius: '8px',
                                padding: '0px 10px'
                            }}
                        />
                    </div>
                    <div className="radio_main">
                        <label>Build</label>
                        <CommonInput
                            name="build"
                            placeholder="Enter build"
                            value=""
                            style={{
                                height: '50px',
                                borderRadius: '8px',
                                padding: '0px 10px'
                            }}
                        />
                    </div>

                    <div className="radio_main">
                        <label>Skin tone</label>
                        <CommonInput
                            name="skin_tone"
                            placeholder="Enter skin tone"
                            value=""
                            style={{
                                height: '50px',
                                borderRadius: '8px',
                                padding: '0px 10px'
                            }}
                        />
                    </div>

                    <div className="radio_main">
                        <label>Clothing type</label>
                        <CommonInput
                            name="clothing_type"
                            placeholder="Enter clothing type"
                            value=""
                            style={{
                                height: '50px',
                                borderRadius: '8px',
                                padding: '0px 10px'
                            }}
                        />
                    </div>

                    <div className="radio_main">
                        <label>Hair</label>
                        <CommonInput
                            name="hair"
                            placeholder="Enter hair type"
                            value=""
                            style={{
                                height: '50px',
                                borderRadius: '8px',
                                padding: '0px 10px'
                            }}
                        />
                    </div>

                    <div className="radio_main">
                        <label>Eyes</label>
                        <CommonInput
                            name="eyes"
                            placeholder="Enter eye color"
                            value=""
                            style={{
                                height: '50px',
                                borderRadius: '8px',
                                padding: '0px 10px'
                            }}
                        />
                    </div>

                    <div className="radio_main">
                        <label>Mouth</label>
                        <CommonInput
                            name="mouth"
                            value=""
                            placeholder='Lip piercing'
                            style={{
                                height: '50px',
                                borderRadius: '8px',
                                padding: '0px 10px'
                            }}
                        />
                    </div>

                    <div className="radio_main">
                        <label>Shoulders</label>
                        <CommonInput
                            name="shoulders"
                            value=""
                            placeholder='Tattoos'
                            style={{
                                height: '50px',
                                borderRadius: '8px',
                                padding: '0px 10px'
                            }}
                        />
                    </div>

                    <div className="radio_main">
                        <label>Hands and Arms</label>
                        <CommonInput
                            name="hands"
                            value=""
                            placeholder='Tattoos'
                            style={{
                                height: '50px',
                                borderRadius: '8px',
                                padding: '0px 10px'
                            }}
                        />
                    </div>

                    <div className="radio_main">
                        <label>Torso </label>
                        <CommonInput
                            name="eyes"
                            value=""
                            placeholder='Muscular'
                            style={{
                                height: '50px',
                                borderRadius: '8px',
                                padding: '0px 10px'
                            }}
                        />
                    </div>

                    <div className="radio_main">
                        <label>Legs  </label>
                        <CommonInput
                            name="legs"
                            value=""
                            placeholder='Tattoos'
                            style={{
                                height: '50px',
                                borderRadius: '8px',
                                padding: '0px 10px'
                            }}
                        />
                    </div>

                    <div className="radio_main">
                        <label>Feet  </label>
                        <CommonInput
                            name="feet"
                            value=""
                            placeholder='Boots'
                            style={{
                                height: '50px',
                                borderRadius: '8px',
                                padding: '0px 10px'
                            }}
                        />
                    </div>

                    <div className="radio_main">
                        <label>Accessories</label>
                        <CommonInput
                            name="accessories"
                            value=""
                            placeholder='Present of belt'
                            style={{
                                height: '50px',
                                borderRadius: '8px',
                                padding: '0px 10px'
                            }}
                        />
                    </div>

                    <div className="radio_main">
                        <label>Additional Info</label>
                        <CommonInput
                            name="additional_info"
                            value=""
                            placeholder='Tattoos'
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

export default WitnessPhysicalDetails
