import React from 'react'
import CommonInput from '../../../../components/common-input'
import CommonSelect from '../../../../components/common-select'
import InputCommon from '../../../../components/input_common'

const WitnessExternalForm = () => {
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

            <div className='grid_layout' style={{
                gridTemplateColumns:'repeat(auto-fill,minmax(28%,1fr))'
            }}>
                <div className="radio_main">
                    <InputCommon
                        label="Grade"
                        name="grade"
                        type="select"
                        required
                        placeholder="Select grade"

                    />
                </div>

                <div className="radio_main">
                    <InputCommon
                        label="Gender"
                        name="gender"
                        type="select"
                        required
                        placeholder="Select gender"
                    />
                </div>

                <div className="radio_main">
                    <InputCommon
                        label="Age (in Years)"
                        name="age"
                        type="text"
                        required
                        placeholder="Enter age"
                    />
                </div>

            </div>

            <div className="radio_main">
                <label>How was this witness identified? <span>*</span></label>
                <CommonInput
                    name="identified_details"
                    placeholder="Enter details"
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
                <label>Student Details</label>
                <CommonInput
                    name="student_details"
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

export default WitnessExternalForm
