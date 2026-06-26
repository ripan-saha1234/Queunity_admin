import React from 'react'
import CommonInput from '../../../../components/common-input'
import { ChoiceRadio } from '../../../../components/ChoiceRadio'
import InputCommon from '../../../../components/input_common'
import {
    gradeOptions,
    incidentVisibilityOptions,
    witnessReliabilityOptions,
    relationshipToVictimOptions,
} from '../options'

const WitnessSchoolMateForm = ({ data = {}, setField = () => {} }) => {
    return (
        <>
            <div className='grid_layout'>
                <div className="radio_main">
                    <label>Student Name <span>*</span></label>
                    <CommonInput
                        name="student_name"
                        placeholder="Enter student name"
                        onChange={(e) => setField('student_name', e.target.value)}
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
                        name="grade"
                        placeholder="Select grade"
                        value={data.grade || ''}
                        onChange={(e) => setField('grade', e.target.value)}
                        options={gradeOptions}
                    />
                </div>
            </div>


            <div className="radio_main">
                <label>Did the witness see the full incident or part of it? <span>*</span></label>
                <div className="radio_buttons_wrapper">
                    {incidentVisibilityOptions.map((opt) => (
                        <ChoiceRadio
                            key={opt.value}
                            name="incident_visibility"
                            label={opt.label}
                            value={opt.value}
                            checked={data.incident_visibility === opt.value}
                            onChange={(value) => setField('incident_visibility', value)}
                        />
                    ))}
                </div>
            </div>


            <div className="radio_main">
                <label>Witness Reliability <span>*</span></label>
                <div className="radio_buttons_wrapper">
                    {witnessReliabilityOptions.map((opt) => (
                        <ChoiceRadio
                            key={opt.value}
                            name="witness_reliability"
                            label={opt.label}
                            value={opt.value}
                            checked={data.witness_reliability === opt.value}
                            onChange={(value) => setField('witness_reliability', value)}
                        />
                    ))}
                </div>
            </div>

            <div className="radio_main">
                <label>Describe what the witness said, observed, or reported <span>*</span></label>
                <CommonInput
                    name="observation_description"
                    placeholder="Enter details"
                    multiline={true}
                    onChange={(e) => setField('observation_description', e.target.value)}
                    style={{
                        height:'90px',
                        resize:'none'
                    }}
                />
            </div>

            <div className="radio_main">
                <label>Relationship to the victim <span>*</span></label>
                <div className="radio_buttons_wrapper">
                    {relationshipToVictimOptions.map((opt) => (
                        <ChoiceRadio
                            key={opt.value}
                            name="relationship_to_victim"
                            label={opt.label}
                            value={opt.value}
                            checked={data.relationship_to_victim === opt.value}
                            onChange={(value) => setField('relationship_to_victim', value)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default WitnessSchoolMateForm
