import React from 'react'
import CommonInput from '../../../../components/common-input'
import CommonSelect from '../../../../components/common-select'
import InputCommon from '../../../../components/input_common'

const ExternalStudentForm = () => {
    return (
        <>
            <div className="radio_main">
                <label>School Name <span>*</span></label>
                <CommonInput
                    name="school_name"
                    placeholder="Enter school name"
                    value=""
                />
            </div>

            <div className='grid_layout'>
                <div className="radio_main">
                    <label style={{
                        marginBottom: '10px'
                    }}>School Location</label>
                    <InputCommon
                        label="City"
                        name="city"
                        type="select"
                        required
                        placeholder="Select city"

                    />
                </div>

                <div className="radio_main">
                    <InputCommon
                        label="State"
                        name="state"
                        type="select"
                        required
                        placeholder="Select state"
                    />
                </div>
            </div>

            <div className="radio_main">
                <label>Student Name <span>*</span></label>
                <InputCommon
                    name="grade"
                    type="select"
                    placeholder="Select student name"
                />
            </div>


            <div className='grid_layout'>

                <div className="radio_main">
                    <InputCommon
                        label="Grade"
                        name="grade"
                        type="select"
                        
                        placeholder="Select grade"
                    />
                </div>
                <div className="radio_main">
                    <InputCommon
                        label="Gender"
                        name="gender"
                        type="select"
                        
                        placeholder="Select gender"
                    />
                </div>

            </div>

            <div className="radio_main">
                <label>Student Details <span>*</span></label>
                <CommonInput
                    name="student_details"
                    placeholder="Enter student details"
                    value=""
                    required
                    multiline={true}
                    style={{
                        height: '90px',
                        resize: 'none'
                    }}
                />
            </div>

            <div className="radio_main">
                <label>How the suspect was identified</label>
                <CommonInput
                    name="suspect_identified"
                    placeholder="Enter details"
                    value=""
                    multiline={true}
                    style={{
                        height: '90px',
                        resize: 'none'
                    }}
                />
            </div>
        </>
    )
}

export default ExternalStudentForm
