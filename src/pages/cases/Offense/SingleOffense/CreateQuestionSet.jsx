import React, { useMemo, useState } from 'react'
import HeadLinks from '../../../../components/HeadLinks'
import CommonButton from '../../../../components/common-button'
import CommonInput from '../../../../components/common-input'
import AddSingleQuestionModal from '../../../../Modals/OffenceModals/AddSingleQuestionModal'
import AddMultiQuestionModal from '../../../../Modals/OffenceModals/AddMultiQuestionModal'
import AddDropdownQuestionModal from '../../../../Modals/OffenceModals/AddDropdownQuestionModal'
import AddDescriptiveModal from '../../../../Modals/OffenceModals/AddDescriptiveModal'
import AddUploadModal from '../../../../Modals/OffenceModals/AddUploadModal'
import usePageHeader from '../../../../hooks/use-page-header'
import { useNavigate } from 'react-router'

const CreateQuestionSet = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate()
    const [toggle, setoggle] = useState({
        singleChoice: false,
        multiChoice: false,
        dropdown: false,
        descriptive: false,
        upload: false
    })

    const toggleFunc = (i) => {
        setoggle({
            singleChoice: i == 1 ? true : false,
            multiChoice: i == 2 ? true : false,
            dropdown: i == 3 ? true : false,
            descriptive: i == 4 ? true : false,
            upload: i == 5 ? true : false
        })
    }

    const headerButtons = useMemo(
        () => [
            {
                type: "button",
                text: "Cancel",
                backgroundColor: "transparent",
                textColor: "#141414",
                borderColor: "transparent",
            },
            {
                type: "button",
                text: "Create",
                backgroundColor: "#95C63D",
                textColor: "#141414",
                borderColor: "#9FC53D",
                onClick: () => navigate('/view-question/2')
            },
            
        
        ],
        [navigate, search],
    );

    usePageHeader({
        title: "Create Question Set",
        breadcrumbs: [{ title: "Offense", link: "/offense" }, { title: "Offense 1", link: "/single-offense/1" }, { title: "View Question", link: "/view-question/1" }, { title: " Create Question Set", link: "/create-question/1" }],
        buttons: headerButtons,
    });
    return (
        <>
            {toggle.singleChoice && <AddSingleQuestionModal toggleFunc={toggleFunc} />}
            {toggle.multiChoice && <AddMultiQuestionModal toggleFunc={toggleFunc} />}
            {toggle.dropdown && <AddDropdownQuestionModal toggleFunc={toggleFunc} />}
            {toggle.descriptive && <AddDescriptiveModal toggleFunc={toggleFunc} />}
            {toggle.upload && <AddUploadModal toggleFunc={toggleFunc} />}
            <div className='offense_wrapper'>
              

                <div className='radio_main' style={{
                    marginTop: '20px'
                }}>
                    <label>Question Set Name</label>
                    <CommonInput placeholder='Enter question set name' />
                </div>

                <div className='add_question_button_wrapper'>
                    <h3>Questions</h3>
                    <div style={
                        {
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            gap: '15px'
                        }
                    }>
                        <CommonButton onClick={(() => toggleFunc(1))} text='Single Choice' backgroundColor={'transparent'} borderColor={'var(--primary-color)'} />

                        <CommonButton onClick={(() => toggleFunc(2))} text='Multi-Choice' backgroundColor={'transparent'} borderColor={'var(--primary-color)'} />

                        <CommonButton onClick={(() => toggleFunc(4))} text='Descriptive' backgroundColor={'transparent'} borderColor={'var(--primary-color)'} />

                        <CommonButton onClick={(() => toggleFunc(3))} text='Dropdown ' backgroundColor={'transparent'} borderColor={'var(--primary-color)'} />

                        <CommonButton onClick={(() => toggleFunc(5))} text='File Upload ' backgroundColor={'transparent'} borderColor={'var(--primary-color)'} />
                    </div>
                </div>

                <div className='added_question_list_wrapper'>
                    {[1, 2, 3].map((e, i) => (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '15px 15px',
                            borderRadius: '5px',
                            background: '#f1f4f9'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <img src='/menu.svg' />
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    gap: '5px'
                                }}>
                                    <h5 style={{
                                        fontSize: '15px',
                                        fontWeight: '500'
                                    }}>Question 1  </h5>
                                    <small style={{
                                        fontSize: '12px'
                                    }}>Single Choice </small>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                gap: '7px',
                                fontSize: '13px',
                                cursor: 'pointer'
                            }}>
                                <i style={{
                                    color: 'var(--primary-color)'
                                }} class="fa-solid fa-pen"></i>
                                <i style={{
                                    color: 'rgba(20, 20, 20, 1)'
                                }} class="fa-regular fa-trash-can"></i>
                            </div>
                        </div>
                    ))}


                </div>

            </div>
        </>
    )
}

export default CreateQuestionSet
