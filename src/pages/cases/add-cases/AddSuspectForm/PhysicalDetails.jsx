import React, { useState } from 'react'
import CommonInput from '../../../../components/common-input'
import NewCommonMultiFileUpload from '../../../../components/NewCommonMultiFileUpload.jsx'
import { WizardSection } from '../../../../components/WizardSection.jsx'
import icon from '../../../../Assets/Layer_1.svg'
const PhysicalDetails = ({ isOpen = false, onToggle = () => { }, data = {}, setField = () => {}, onUpload = () => {} }) => {
    const [toggle, settoggle] = useState(false)

    return (
        <>
            <div className='other_Head_details_wrapper'>
                <section className="add-cases-section">
                    <WizardSection iconBg="linear-gradient(135deg, #FDC700 0%, #CF8A41 100%)
"
                        icon={<img src={icon} alt="" />}
                        title="Physical Details"
                        subtitle="Appearance or identifying features"></WizardSection>
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
                                <label>Height (estimate in cm)</label>
                                <CommonInput
                                    name="height"
                                    placeholder="Enter Height"
                                    type="number"
                                    onChange={(e) => setField('height', e.target.value)}
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
                                    onChange={(e) => setField('build', e.target.value)}
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
                            onChange={(e) => setField('skin_tone', e.target.value)}
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
                            onChange={(e) => setField('clothing_type', e.target.value)}
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
                            onChange={(e) => setField('hair', e.target.value)}
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
                            onChange={(e) => setField('eyes', e.target.value)}
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
                            placeholder='Lip piercing'
                            onChange={(e) => setField('mouth', e.target.value)}
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
                            placeholder='Tattoos'
                            onChange={(e) => setField('shoulders', e.target.value)}
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
                            placeholder='Tattoos'
                            onChange={(e) => setField('hands', e.target.value)}
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
                            name="torso"
                            placeholder='Muscular'
                            onChange={(e) => setField('torso', e.target.value)}
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
                            placeholder='Tattoos'
                            onChange={(e) => setField('legs', e.target.value)}
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
                            placeholder='Boots'
                            onChange={(e) => setField('feet', e.target.value)}
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
                            placeholder='Present of belt'
                            onChange={(e) => setField('accessories', e.target.value)}
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
                                    placeholder='Tattoos'
                                    onChange={(e) => setField('additional_info', e.target.value)}
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
                            <NewCommonMultiFileUpload onChange={(e) => onUpload('photo_urls', e.target.files)} />
                        </div>
                    </>
                )}
            </div>
            )}
        </>
    )
}

export default PhysicalDetails
