import React, { useMemo } from 'react'
import '../ViewSuspect/ViewSuspect.css'
import { WizardSection } from '../../../../components/WizardSection'
import { useParams } from 'react-router'
import { useLocation, useNavigate } from 'react-router-dom'
import usePageHeader from '../../../../hooks/use-page-header'
import WitnessSchoolMate from './WitnessSchoolMate'
import WitnessExternal from './WitnessExternal'
import WitnessOtherDetails from './WitnessOtherDetails'

const ViewWitness = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const returnStep = useMemo(() => {
        const step = Number(new URLSearchParams(location.search).get("step"))
        return Number.isFinite(step) ? step : 2
    }, [location.search])
    const viewSuspect = [
        {
            title: 'Health',
            para: '140cm'
        },
        {
            title: 'Build',
            para: 'Slim'
        },
        {
            title: 'Skin Tone',
            para: 'Dark'
        },
        {
            title: 'Clothing',
            para: 'T-shirt & pants'
        },
        {
            title: 'Hair',
            para: 'Curly'
        },
        {
            title: 'Eyes',
            para: 'Blue'
        },
        {
            title: 'Mouth',
            para: 'Lip piercing'
        },
        {
            title: 'Shoulders',
            para: 'Tattoos'
        },
        {
            title: 'Hands & Arms',
            para: 'Bracelet on left wrist'
        },
        {
            title: 'Torso',
            para: 'Wearing blue jacket'
        },
        {
            title: 'Legs',
            para: 'Black jeans'
        },
        {
            title: 'Feet',
            para: 'White sneakers'
        },
        {
            title: 'Accessories',
            para: 'Silver watch, backpack'
        },
        {
            title: 'Additional Info',
            para: 'Black'
        },
    ]

    const vechileDetails = [
        {
            title: 'Type',
            para: 'Sedan'
        },
        {
            title: 'Brand',
            para: 'Toyota'
        },
        {
            title: 'Model',
            para: 'Camry 2020'
        },
        {
            title: 'Color',
            para: 'Dark Blue'
        },
        {
            title: 'Marking',
            para: 'Dent on rear bumper'
        },
        {
            title: 'Damage',
            para: 'Scratches on driver side'
        },
        {
            title: 'Registration No.',
            para: 'ABC-1234'
        },
        {
            title: 'Additional Info',
            para: 'Tinted windows, roof rack'
        },
        {
            title: 'Direction of travel',
            para: 'North'
        },
    ]
    const headerButtons = useMemo(
        () => [
            {
                type: "button",
                text: "Back to Witness list",
                onClick: () => navigate(`/cases/add-cases?step=${returnStep}`),
                backgroundColor: "#95C63D",
                textColor: "#141414",
                borderColor: "#9FC53D",
            },
            {
                type: "icon",
                img: "/head-edit.svg",
                backgroundColor: "#DBEAFE",
                onClick: () => { },
            },
            {
                type: "icon",
                img: "/head-delete.svg",
                backgroundColor: "#FFE2E2",
                onClick: () => { },
            },
        ],
        [navigate, returnStep],
    )

    usePageHeader({
        title: `View Witness ${id}`,
        breadcrumbs: [
            { title: "Cases", link: "/cases" },
            { title: "Add Case", link: "/cases/add-cases" },
            { title: `View Witness ${id}`, link: `/cases/view-witness/${id}` },
        ],
        buttons: headerButtons,
    })

    return (
        <>
            <div className='view_suspect_wrapper'>
                <div className='view_suspect_heading'>
                    <div className='suspect_name_wrapper'>
                        <img src='/Container (5).svg' />
                        <h5>Witness #{id}</h5>
                    </div>
                    {id == 2 && <p>Unknown Witness</p>}
                    {id != 2 && <p style={{
                        background: 'rgba(0, 166, 62, 1)'
                    }}>Known Witness</p>}
                </div>
                {id == 1 && <WitnessSchoolMate />}
                {id == 3 && <WitnessExternal />}
                {id == 4 && <WitnessOtherDetails />} 
                {id == 2 && <>
                    <div style={{
                        marginTop: '25px'
                    }}>
                        <WizardSection
                            iconBg="#F0D9FF"
                            icon={<img src="/Container (6).svg" alt="" />}
                            title="Physical Details"
                            subtitle="When & where it happened"
                        >
                        </WizardSection>

                        <div className='physical_details_box_wrapper'>
                            {viewSuspect?.map((e) => (
                                <div className='physical_details_box'>
                                    <p>{e?.title}</p>
                                    <small>{e?.para}</small>
                                </div>
                            ))}
                        </div>

                        <div className='photos_heading'>
                            <img src={'/Icon.svg'} />
                            <p>Photos (3)</p>
                        </div>

                        <div className='photos_wrapper'>
                            {[1, 2, 3].map(() => (
                                <div className='photos_div'>
                                    <img src='/download.svg' style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px'
                                    }} />
                                    <img className='photo_img' src='/94dc08df112e1477ea1563b951d9786788581d54.jpg' />
                                </div>
                            ))}

                        </div>
                    </div>
                    <div style={{
                        marginTop: '25px'
                    }}>
                        <WizardSection
                            iconBg="#F0D9FF"
                            icon={<img src="/Container (3).svg" alt="" />}
                            title="Vehicle Details"
                            subtitle="When & where it happened"
                        >
                        </WizardSection>

                        <div className='vehicle_details_box_wrapper'>
                            {viewSuspect?.map((e) => (
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
                                <p>{'Last seen location'}</p>
                                <small>{'742 Maple Ridge Lane, Brookfield, WI 53005'}</small>
                            </div>
                        </div>

                        <div className='photos_heading'>
                            <img src={'/Icon.svg'} />
                            <p>Photos (3)</p>
                        </div>

                        <div className='photos_wrapper'>
                            {[1, 2].map(() => (
                                <div className='photos_div'>
                                    <img src='/download.svg' style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px'
                                    }} />
                                    <img className='photo_img' src='/c67bcce7f785c689b6d73522681c4db13204eca1.jpg' />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{
                        marginTop: '25px'
                    }}>
                        <WizardSection
                            iconBg="#F0D9FF"
                            icon={<img src="/Container (7).svg" alt="" />}
                            title="Other Details"
                            subtitle="When & where it happened"
                        >
                        </WizardSection>

                        <div className='physical_details_box' style={{
                            gridColumn: '1/-1',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px'
                        }}>
                            <p>{'Describe actions, behavior, or anything unusual observed by witnesses or staff.'}</p>
                            <small>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}</small>
                        </div>
                    </div>
                </>
                }
            </div>
        </>
    )
}

export default ViewWitness
