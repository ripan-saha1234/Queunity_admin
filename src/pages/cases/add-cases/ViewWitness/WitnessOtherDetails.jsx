import React from 'react'
import { WizardSection } from '../../../../components/WizardSection'

const WitnessOtherDetails = () => {
    const detailsData = [
        {
            title: 'Relationship',
            para: 'External Student'
        },
        {
            title: 'Organization',
            para: 'Mission High School'
        },
        {
            title: 'Suspect Type',
            para: 'Staff'
        },

    ]

    const identifyData = [
        {
            title: 'Suspect Name',
            para: 'Bidisha Bhowmick'
        },
        {
            title: 'Age',
            para: '44'
        },
        {
            title: 'Relationship to student (if any)',
            para: 'Teacher'
        },
        {
            title: 'Gender',
            para: 'Female'
        },
        {
            title: 'Contact info',
            para: '+1 6248 898 7890'
        },

    ]
    return (
        <>
            <div style={{
                marginTop: '25px'
            }}>
                <h5 style={{
                    fontSize: '20px',
                    color: 'rgba(15, 23, 43, 1)',
                    fontWeight: '600'
                }}>Details</h5>

                <div className='vehicle_details_box_wrapper' style={{
                    marginTop: '20px'
                }}>
                    {detailsData?.map((e) => (
                        <div className='physical_details_box'>
                            <p>{e?.title}</p>
                            <small>{e?.para}</small>
                        </div>
                    ))}
                    <div className='physical_details_box' style={{
                        gridColumn: '1/-1',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px'
                    }}>
                        <p>{'Student Details'}</p>
                        <small>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}</small>
                    </div>

                    <div className='physical_details_box' style={{
                        gridColumn: '1/-1',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px'
                    }}>
                        <p>{'How the suspect was identified'}</p>
                        <small>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}</small>
                    </div>
                </div>
            </div>

            <div style={{
                marginTop: '25px'
            }}>
                <WizardSection
                    iconBg="#F0D9FF"
                    icon={<img src="/Container (1).svg" alt="" />}
                    title="Identifying info"
                    subtitle="When & where it happened"
                >
                </WizardSection>

                <div className='vehicle_details_box_wrapper' style={{
                    marginTop: '20px'
                }}>
                    {detailsData?.map((e) => (
                        <div className='physical_details_box'>
                            <p>{e?.title}</p>
                            <small>{e?.para}</small>
                        </div>
                    ))}
                    <div className='physical_details_box' style={{
                        gridColumn: '1/-1',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px'
                    }}>
                        <p>{'How the suspect was identified'}</p>
                        <small>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}</small>
                    </div>

                    <div className='physical_details_box' style={{
                        gridColumn: '1/-1',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px'
                    }}>
                        <p>{'Was the suspect on school grounds'}</p>
                        <small>{'Yes'}</small>
                    </div>

                    <div className='physical_details_box' style={{
                        gridColumn: '1/-1',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px'
                    }}>
                        <p>{'Where on campus were they seen?'}</p>
                        <small>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}</small>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WitnessOtherDetails
