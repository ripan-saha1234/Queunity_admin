import React, { useMemo, useState } from 'react'
import './SubmitedCase.css'
import { WizardSection } from '../../../../components/WizardSection'
import AnnomityLevelModal from '../../../../Modals/CaseModals/AnnomityLevelModal.jsx'
import PrivacyLevelModal from '../../../../Modals/CaseModals/PrivacyLevelModal.jsx'
import ViewClarityModal from '../../../../Modals/CaseModals/ViewClarityModal.jsx'
import ViewPoliceModal from '../../../../Modals/CaseModals/ViewPoliceModal.jsx'
import ViewResolutionModal from '../../../../Modals/CaseModals/ViewResolutionModal.jsx'
import usePageHeader from '../../../../hooks/use-page-header.jsx'
import { useNavigate, useParams } from 'react-router'
import icon from '../../../../Assets/Icon (5).svg'
const SubmitedCase = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const headerButtons = useMemo(
        () => [
            {
                type: "button",
                text: "Edit",
                // onClick: () => navigate(`/cases/add-cases?step=`),
                backgroundColor: "transparent",
                textColor: "rgba(111, 124, 142, 1)",
                borderColor: "rgba(217, 217, 217, 1)",
            },
            {
                type: "button",
                text: "Update Status",
                // onClick: () => navigate(`/cases/add-cases?step=`),
                backgroundColor: "rgba(220, 224, 229, 1)",
                textColor: "rgba(111, 124, 142, 1)",
                borderColor: "transparent",
            },
        ],
        [navigate],
    )

    usePageHeader({
        title: `2025AWO77#`,
        breadcrumbs: [
            { title: "Cases", link: "/cases" },
            { title: "2025AWO77#", link: `/cases/case-submitted/${id}` },
        ],
        buttons: headerButtons,
    })
    const [modalIsOpen, setmodalIsOpen] = useState('')
    const detailsData = [
        {
            title: 'Offence Category',
            para: 'Verbal Bullying'
        },
        {
            title: 'Offence Sub-Category',
            para: 'Teasing'
        },
        {
            title: 'Incident Date',
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
    return (
        <>
            {modalIsOpen == 'anonymity' && <AnnomityLevelModal setmodalIsOpen={setmodalIsOpen} />}

            {modalIsOpen == 'privacy' && <PrivacyLevelModal setmodalIsOpen={setmodalIsOpen} />}
            {
                modalIsOpen == 'charity' && <ViewClarityModal setmodalIsOpen={setmodalIsOpen} />
            }

            {
                modalIsOpen == 'police' && <ViewPoliceModal setmodalIsOpen={setmodalIsOpen} />
            }

            {
                modalIsOpen == 'resolution' && <ViewResolutionModal setmodalIsOpen={setmodalIsOpen} />
            }
            <div className='submited_case_wrapper'>
                <div className='submited_case_head'>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '20px'
                    }}>
                        <div className='submited_email_box'>
                            <img src='/Icon (1).svg' />
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '10px'
                        }}>
                            <h1 style={{
                                fontWeight: '700',
                                fontSize: '24px'
                            }}>2025AWO77#</h1>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    color: 'rgba(20, 20, 20, 0.8)'
                                }}>
                                    <i class="fa-regular fa-calendar"></i>
                                    <p style={{
                                        fontWeight: '500',
                                    }}>Created date: 26/06/2025</p>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    color: 'rgba(20, 20, 20, 0.8)'
                                }}>
                                    <i class="fa-regular fa-clock"></i>
                                    <p style={{
                                        fontWeight: '500',
                                    }}>Creation time: 12:00 PM</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <p style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '7px 15px',
                        background: 'rgba(0, 166, 62, 1)',
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: '13px',
                        borderRadius: '15px'
                    }}><i class="fa-regular fa-circle-check"></i> Resolved</p>
                </div>

                <div className='submitted_case_details_wrapper'>
                    <div>

                        <WizardSection
                            iconBg=" linear-gradient(135deg, #FF8904 0%, #FF6467 100%)"
                            icon={<img src={icon} alt="" />}
                            title="Incident Details "
                            subtitle={'When & where it happened'}
                        >
                        </WizardSection>

                        <div className='vehicle_details_box_wrapper'>
                            {detailsData?.map((e) => (
                                <div className='physical_details_box '>
                                    <p>{e?.title}</p>
                                    <small>{e?.para}</small>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h3 style={
                        {
                            fontWeight: '600',
                            fontSize: '23px',
                            color: 'rgba(15, 23, 43, 1)'
                        }
                    }>Other Details</h3>
                    <div className='case_details_cards_wrapper'>
                        <div className='case_details_card' onClick={(() => setmodalIsOpen('anonymity'))}>
                            <div className='icon_image'>
                                <img src='/Icon (2).svg' />
                            </div>
                            <p>Anonymity Level</p>

                        </div>


                        <div className='case_details_card' onClick={(() => setmodalIsOpen('privacy'))}>
                            <div className='icon_image'>
                                <img src='/Icon (3).svg' />
                            </div>
                            <p>Privacy Level</p>

                        </div>

                        <div className='case_details_card' onClick={(() => navigate('/cases/submitted-suspect/2'))}>
                            <div className='icon_image'>
                                <img src='/Capa_1.svg' />
                            </div>
                            <p>Suspects</p>

                        </div>

                        <div className='case_details_card' onClick={(() => navigate('/cases/submitted-witness/2'))}>
                            <div className='icon_image'>
                                <img src='/Icon (4).svg' />
                            </div>
                            <p>Witnesses</p>

                        </div>

                        <div className='case_details_card' onClick={(() => navigate('/cases/submitted-evidence/2'))}>
                            <div className='icon_image'>
                                <img src='/Icon (6).svg' />
                            </div>
                            <p>Evidence</p>

                        </div>

                        <div className='case_details_card' onClick={(() => setmodalIsOpen('charity'))}>
                            <div className='icon_image'>
                                <img src='/Capa_1 (1).svg' />
                            </div>
                            <p>Charity</p>
                        </div>

                        <div className='case_details_card' onClick={(() => setmodalIsOpen('police'))}>
                            <div className='icon_image'>
                                <img src='/svg2532.svg' />
                            </div>
                            <p>Police</p>
                        </div>

                        <div className='case_details_card' onClick={(() => setmodalIsOpen('resolution'))}>
                            <div className='icon_image'>
                                <img src='/Icon (5).svg' />
                            </div>
                            <p>Resolution</p>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default SubmitedCase
