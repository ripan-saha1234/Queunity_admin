import React, { useState } from 'react'
import CommonInput from '../../../../components/common-input'
import { ChoiceRadio } from '../../../../components/ChoiceRadio'
import { WizardSection } from '../../../../components/WizardSection'
import InputCommon from '../../../../components/input_common'

const OtherSuspectForm = () => {
    const [onSchoolGrounds, setonSchoolGrounds] = useState(true)
    return (
        <>
            <div className="radio_main">
                <label>Organization</label>
                <CommonInput
                    name="Organization"
                    placeholder="Enter organization"
                    value=""
                />
            </div>
            <div className="radio_main">
                <label>Suspect Type <span>*</span></label>
                <div className="radio_buttons_wrapper">
                    <ChoiceRadio
                        name="parent"
                        label="Parent"
                        value="parent"

                    />
                    <ChoiceRadio
                        name="family_member"
                        label="Family Member"
                        value="family_member"

                    />

                    <ChoiceRadio
                        name="staff"
                        label="Staff"
                        value="staff"

                    />
                    <ChoiceRadio
                        name="community_parent"
                        label="Community Parent"
                        value="community_parent"

                    />
                    <ChoiceRadio
                        name="contractor_visitor"
                        label="Contractor/Visitor"
                        value="contractor_visitor"

                    />

                    <ChoiceRadio
                        name="online_person"
                        label="Online Person"
                        value="online_person"
                    />
                </div>
            </div>

            <WizardSection
                iconBg="#F0D9FF"
                icon={<img src="/Container (1).svg" alt="" />}
                title="Identifying info"
                subtitle="When & where it happened"
            >
                <form className="suspect_form_fields_wrapper">
                    <div className="radio_main">
                        <label>Suspect Name</label>
                        <CommonInput
                            name="suspect_name"
                            placeholder="Enter suspect name"
                            value=""
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
                                value=""
                            />
                        </div>

                        <div className="radio_main">
                            <label>Gender</label>
                            <InputCommon
                                name="gender"
                                placeholder="Select gender"
                                value=""
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
                                value=""
                            />
                        </div>
                        <div className="radio_main">
                            <label>Contact info</label>
                            <div className='phone_wrapper'>
                                <select>
                                    <option>+1</option>
                                </select>
                                <input type='Enter contat number.' />
                            </div>
                        </div>
                    </div>

                    <div className="radio_main">
                        <label>How do you know this Suspect? <span>*</span></label>
                        <CommonInput
                            name="know_suspect"
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
                        <label>Was the suspect on school grounds? <span>*</span></label>
                        <div className="radio_buttons_wrapper">
                            <ChoiceRadio
                                name="yes"
                                label="Yes"
                                value="yes"
                                checked={onSchoolGrounds}
                                onChange={(() => setonSchoolGrounds(true))}
                            />
                            <ChoiceRadio
                                name="no"
                                label="No"
                                value="no"
                                checked={!onSchoolGrounds}
                                onChange={(() => setonSchoolGrounds(false))}
                            />
                        </div>
                    </div>

                    {onSchoolGrounds && <div className="radio_main">
                        <label>Where on campus were they seen? <span>*</span></label>
                        <CommonInput
                            name="were_seen"
                            placeholder="Enter details"
                            value=""
                            required
                            multiline={true}
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
