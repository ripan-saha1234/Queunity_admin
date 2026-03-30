import React from 'react'
import './ResolutionDesired.css'
import { WizardSection } from '../../../../components/WizardSection'
import { ChoiceRadio } from '../../../../components/ChoiceRadio'
import SummaryCaseModal from '../../../../Modals/CaseModals/SummaryCaseModal'
const ResolutionDesired = () => {
    return (
        <>
            <div className='resolution_desired_wrapper'>
                <WizardSection
                    iconBg=" linear-gradient(135deg, #22C55E 0%, #6D28D9 100%);
"
                    icon={<img src="/Container (11).svg" alt="" />}
                    title="Resolution Desired "
                    subtitle={'When & where it happened'}
                >
                </WizardSection>

                <div className="radio_main">
                    <div className="radio_buttons_wrapper" style={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'start'
                    }}>
                        <div style={{
                            display:'flex',
                            justifyContent:'flex-start',
                            alignItems:'start',
                       
                        }}>
                            <ChoiceRadio
                                name="note"
                              
                                value="note"
                            />
                            <div style={{
                                display:'flex',
                                flexDirection:'column',
                            }}>
                                <h4 style={{
                                    color:'rgba(20, 20, 20, 0.8)',
                                    fontSize:'12px',
                                    fontWeight:'500',
                                    marginBottom:'5px'
                                }}>School administration may handle it at their discretion.</h4>
                                <small style={{
                                    color:'rgba(20, 20, 20, 0.8)',
                                    fontSize:'12px'
                                }}>Note: Restorative circle or conference</small>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems:'start'
                        }}>
                            <ChoiceRadio
                                name="note"
                              
                                value="note"
                            />
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <h4 style={{
                                    color: 'rgba(20, 20, 20, 0.8)',
                                    fontSize: '12px',
                                    fontWeight:'500',
                                    marginBottom:'5px'
                                }}>I want the student disciplined according to the school conduct policy.</h4>
                                <small style={{
                                    color: 'rgba(20, 20, 20, 0.8)',
                                    fontSize: '12px'
                                }}>Note: No restorative justice required</small>
                            </div>
                        </div>


                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems:'start'
                        }}>
                            <ChoiceRadio
                                name="note"
                              
                                value="note"
                            />
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <h4 style={{
                                    color: 'rgba(20, 20, 20, 0.8)',
                                    fontSize: '12px',
                                    fontWeight:'500',
                                    marginBottom:'5px'
                                }}>I do not want the student to be disciplined, but I would like a class-wide intervention (without identifying anyone).</h4>
                                <small style={{
                                    color: 'rgba(20, 20, 20, 0.8)',
                                    fontSize: '12px'
                                }}>Note: School is doing an announcement to all the students (classroom or entire school)</small>
                            </div>
                        </div>


                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems:'start'
                        }}>
                            <ChoiceRadio
                                name="note"
                              
                                value="note"
                            />
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <h4 style={{
                                    color: 'rgba(20, 20, 20, 0.8)',
                                    fontSize: '12px',
                                    fontWeight:'500',
                                    marginBottom:'5px'
                                }}>I want the student to be disciplined and have a restorative circle.</h4>
                                <small style={{
                                    color: 'rgba(20, 20, 20, 0.8)',
                                    fontSize: '12px'
                                }}>Note: Restorative circle & justice required</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResolutionDesired
