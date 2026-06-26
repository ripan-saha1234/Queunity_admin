import React from 'react'
import CommonInput from '../../../../components/common-input'
import InputCommon from '../../../../components/input_common'
import { cityOptions, stateOptions, gradeOptions, genderOptions } from '../options'

const ExternalStudentForm = ({ data = {}, setField = () => {} }) => {
    return (
        <>
            <div className="radio_main">
                <label>School Name <span>*</span></label>
                <CommonInput
                    name="school_name"
                    placeholder="Enter school name"
                    onChange={(e) => setField('school_name', e.target.value)}
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
                        value={data.city || ''}
                        onChange={(e) => setField('city', e.target.value)}
                        options={cityOptions}
                        placeholder="Select city"
                    />
                </div>

                <div className="radio_main">
                    <InputCommon
                        label="State"
                        name="state"
                        type="select"
                        required
                        value={data.state || ''}
                        onChange={(e) => setField('state', e.target.value)}
                        options={stateOptions}
                        placeholder="Select state"
                    />
                </div>
            </div>

            <div className="radio_main">
                <label>Student Name <span>*</span></label>
                <CommonInput
                    name="student_name"
                    placeholder="Enter student name"
                    onChange={(e) => setField('student_name', e.target.value)}
                />
            </div>


            <div className='grid_layout'>

                <div className="radio_main">
                    <InputCommon
                        label="Grade"
                        name="grade"
                        type="select"
                        value={data.grade || ''}
                        onChange={(e) => setField('grade', e.target.value)}
                        options={gradeOptions}
                        placeholder="Select grade"
                    />
                </div>
                <div className="radio_main">
                    <InputCommon
                        label="Gender"
                        name="gender"
                        type="select"
                        value={data.gender || ''}
                        onChange={(e) => setField('gender', e.target.value)}
                        options={genderOptions}
                        placeholder="Select gender"
                    />
                </div>

            </div>

            <div className="radio_main">
                <label>Student Details <span>*</span></label>
                <CommonInput
                    name="student_details"
                    placeholder="Enter student details"
                    required
                    multiline={true}
                    onChange={(e) => setField('student_details', e.target.value)}
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
                    multiline={true}
                    onChange={(e) => setField('suspect_identified', e.target.value)}
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
