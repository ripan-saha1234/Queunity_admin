import React from 'react'
import CommonInput from '../../../../components/common-input'
import InputCommon from '../../../../components/input_common'
import { cityOptions, stateOptions, gradeOptions, genderOptions } from '../options'

const WitnessExternalForm = ({ data = {}, setField = () => {} }) => {
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

            <div className='grid_layout' style={{
                gridTemplateColumns:'repeat(auto-fill,minmax(28%,1fr))'
            }}>
                <div className="radio_main">
                    <InputCommon
                        label="Grade"
                        name="grade"
                        type="select"
                        required
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
                        required
                        value={data.gender || ''}
                        onChange={(e) => setField('gender', e.target.value)}
                        options={genderOptions}
                        placeholder="Select gender"
                    />
                </div>

                <div className="radio_main">
                    <InputCommon
                        label="Age (in Years)"
                        name="age"
                        type="text"
                        required
                        value={data.age || ''}
                        onChange={(e) => setField('age', e.target.value)}
                        placeholder="Enter age"
                    />
                </div>

            </div>

            <div className="radio_main">
                <label>How was this witness identified? <span>*</span></label>
                <CommonInput
                    name="identified_details"
                    placeholder="Enter details"
                    required
                    multiline={true}
                    onChange={(e) => setField('identified_details', e.target.value)}
                    style={{
                        height: '90px',
                        resize: 'none'
                    }}
                />
            </div>

            <div className="radio_main">
                <label>Student Details</label>
                <CommonInput
                    name="student_details"
                    placeholder="Enter details"
                    multiline={true}
                    onChange={(e) => setField('student_details', e.target.value)}
                    style={{
                        height: '90px',
                        resize: 'none'
                    }}
                />
            </div>
        </>
    )
}

export default WitnessExternalForm
