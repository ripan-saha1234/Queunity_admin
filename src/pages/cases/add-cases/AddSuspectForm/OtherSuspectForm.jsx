import React, { useState } from 'react'
import CommonInput from '../../../../components/common-input'
import { ChoiceRadio } from '../../../../components/ChoiceRadio'
import { WizardSection } from '../../../../components/WizardSection'
import InputCommon from '../../../../components/input_common'
import { genderOptions, suspectTypeOptions } from '../options'
import icon from '../../../../Assets/svg2292.svg'
const OtherSuspectForm = ({ data = {}, setField = () => {} }) => {
    const onSchoolGrounds = data.was_suspect_on_school_ground !== false
    const setOnSchoolGrounds = (val) => setField('was_suspect_on_school_ground', val)
    return (
        <>
            <div className="radio_main">
                <label>Organization</label>
                <CommonInput
                    name="organization"
                    placeholder="Enter organization"
                    onChange={(e) => setField('organization', e.target.value)}
                />
            </div>
            <div className="radio_main">
                <label>Suspect Type <span>*</span></label>
                <div className="radio_buttons_wrapper">
                    {suspectTypeOptions.map((opt) => (
                        <ChoiceRadio
                            key={opt.value}
                            name="suspect_type"
                            label={opt.label}
                            value={opt.value}
                            checked={data.suspect_type === opt.value}
                            onChange={(value) => setField('suspect_type', value)}
                        />
                    ))}
                </div>
            </div>

            <WizardSection
                iconBg=" linear-gradient(135deg, #9150C9 0%, #BA71FE 100%)
"
                icon={<img src={icon} alt="" />}
                title="Identifying info"
                subtitle="Basic details to help identify them"
            >
                <form className="suspect_form_fields_wrapper">
                    <div className="radio_main">
                        <label>Suspect Name</label>
                        <CommonInput
                            name="suspect_name"
                            placeholder="Enter suspect name"
                            onChange={(e) => setField('suspect_name', e.target.value)}
                        />
                    </div>

                    <div className='four_grid_layout'>
                        <div className="radio_main">
                            <label>Age</label>
                            <CommonInput
                                style={{
                                    height: '50px',
                                    padding: '0 0 0 10px'
                                }}
                                name="age"
                                type='number'
                                onChange={(e) => setField('age', e.target.value)}
                            />
                        </div>

                        <div className="radio_main">
                            <label>Gender</label>
                            <InputCommon
                                name="gender"
                                placeholder="Select gender"
                                value={data.gender || ''}
                                onChange={(e) => setField('gender', e.target.value)}
                                options={genderOptions}
                                type='select'
                            />
                        </div>
                        <div className="radio_main">
                            <label>Relationship to student (if any)</label>
                            <CommonInput
                                style={{
                                    height: '50px',
                                    padding: '0 0 0 10px'
                                }}
                                name="student_relationship"
                                placeholder="Enter relationship to student"
                                onChange={(e) => setField('student_relationship', e.target.value)}
                            />
                        </div>
                        <div className="radio_main">
                            <label>Contact info</label>
                            <div className='phone_wrapper'>
                                <select
                                    value={data.contact_country_code || '+1'}
                                    onChange={(e) => setField('contact_country_code', e.target.value)}
                                >
                                    <option value="+1">+1</option>
                                    <option value="+91">+91</option>
                                    <option value="+44">+44</option>
                                </select>
                                <input
                                    type='tel'
                                    placeholder='Enter contact number'
                                    value={data.contact_phone || ''}
                                    onChange={(e) => setField('contact_phone', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="radio_main">
                        <label>How do you know this Suspect? <span>*</span></label>
                        <CommonInput
                            name="know_suspect"
                            placeholder="Enter details"
                            required
                            multiline={true}
                            onChange={(e) => setField('know_suspect', e.target.value)}
                            style={{
                                height: '90px',
                                resize: 'none'
                            }}
                        />
                    </div>

                    <div className="radio_main">
                        <label>Was the suspect on school grounds? <span>*</span></label>
                        <div className="radio_buttons_wrapper">
                            <ChoiceRadio
                                name="was_suspect_on_school_ground"
                                label="Yes"
                                value="yes"
                                checked={onSchoolGrounds}
                                onChange={(() => setOnSchoolGrounds(true))}
                            />
                            <ChoiceRadio
                                name="was_suspect_on_school_ground"
                                label="No"
                                value="no"
                                checked={!onSchoolGrounds}
                                onChange={(() => setOnSchoolGrounds(false))}
                            />
                        </div>
                    </div>

                    {onSchoolGrounds && <div className="radio_main">
                        <label>Where on campus were they seen? <span>*</span></label>
                        <CommonInput
                            name="were_seen"
                            placeholder="Enter details"
                            required
                            multiline={true}
                            onChange={(e) => setField('were_seen', e.target.value)}
                            style={{
                                height: '90px',
                                resize: 'none'
                            }}
                        />
                    </div>}
                </form>
            </WizardSection>
        </>
    )
}

export default OtherSuspectForm
