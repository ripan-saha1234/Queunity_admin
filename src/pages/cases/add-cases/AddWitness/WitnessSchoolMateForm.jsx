import React from 'react'
import CommonInput from '../../../../components/common-input'
import { ChoiceRadio } from '../../../../components/ChoiceRadio'
import InputCommon from '../../../../components/input_common'

const WitnessSchoolMateForm = () => {
    return (
        <>
            <div className='grid_layout'>
                <div className="radio_main">
                    <label>Student Name <span>*</span></label>
                    <CommonInput
                        name="student_name"
                        placeholder="Enter student name"
                        value=""
                        style={{
                            height: '45px',
                            resize: 'none'
                        }}
                    />
                </div>

                <div className="radio_main">
                    <label>Grade <span>*</span></label>
                    <InputCommon
                        type='select'
                        name="student_details"
                        placeholder="Select grade"
                        value=""
                        multiline={true}
                        
                    />
                </div>
            </div>


            <div className="radio_main">
                <label>Did the witness see the full incident or part of it? <span>*</span></label>
                <div className="radio_buttons_wrapper">
                    <ChoiceRadio
                        name="Entire incident"
                        label="Entire incident"
                        value="Entire incident"

                    />
                    <ChoiceRadio
                        name="Partially"
                        label="Partially"
                        value="Partially"

                    />

                    <ChoiceRadio
                        name="Only heard about it"
                        label="Only heard about it"
                        value="Only heard about it"

                    />

                    <ChoiceRadio
                        name="Not sure"
                        label="Not sure"
                        value="Not sure"

                    />
                </div>
            </div>


            <div className="radio_main">
                <label>Witness Reliability <span>*</span></label>
                <div className="radio_buttons_wrapper">
                    <ChoiceRadio
                        name="High"
                        label="High"
                        value="High"

                    />
                    <ChoiceRadio
                        name="Medium"
                        label="Medium"
                        value="Medium"

                    />

                    <ChoiceRadio
                        name="Low"
                        label="Low"
                        value="Low"

                    />

                    <ChoiceRadio
                        name="Unknown"
                        label="Unknown"
                        value="Unknown"
                    />
                </div>
            </div>

            <div className="radio_main">
                <label>Describe what the witness said, observed, or reported <span>*</span></label>
                <InputCommon
                    name="student_details"
                    placeholder="Enter details"
                    value=""
                    multiline={true}
                    style={{
                        height:'90px',
                        resize:'none'
                    }}
                />
            </div>

            <div className="radio_main">
                <label>Relationship to the victim <span>*</span></label>
                <div className="radio_buttons_wrapper">
                    <ChoiceRadio
                        name="Classmate"
                        label="Classmate"
                        value="Classmate"

                    />
                    <ChoiceRadio
                        name="Friend"
                        label="Friend"
                        value="Friend"

                    />

                    <ChoiceRadio
                        name="Team member"
                        label="Team member"
                        value="Team member"

                    />

                    <ChoiceRadio
                        name="Sibling"
                        label="Sibling"
                        value="Sibling"
                    />

                    <ChoiceRadio
                        name="No relationship"
                        label="No relationship"
                        value="No relationship"
                    />
                    <ChoiceRadio
                        name="Unknown"
                        label="Unknown"
                        value="Unknown"
                    />
                </div>
            </div>
        </>
    )
}

export default WitnessSchoolMateForm
