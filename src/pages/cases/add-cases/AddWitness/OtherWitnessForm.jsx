import CommonInput from '../../../../components/common-input'
import { ChoiceRadio } from '../../../../components/ChoiceRadio'
import { WizardSection } from '../../../../components/WizardSection'
import InputCommon from '../../../../components/input_common'

const OtherWitnessForm = () => {
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
                <label>Witness Type <span>*</span></label>
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

                    <ChoiceRadio
                        name="Stranger"
                        label="Stranger"
                        value="Stranger"
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
                        <label>Witness Name</label>
                        <CommonInput
                            name="Witness_name"
                            placeholder="Enter Witness name"
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
                        <label>Explain how this witness is connected to the incident <span>*</span></label>
                        <CommonInput
                            name="know_suspect"
                            placeholder="Enter details"
                            value=""
                            required
                            multiline={true}
                            style={{
                                height: '80px',
                                resize: 'none'
                            }}
                        />
                    </div>

                    <div className="radio_main">
                        <label>Was this witness present during the incident? <span>*</span></label>
                        <div className="radio_buttons_wrapper">
                            <ChoiceRadio
                                name="yes"
                                label="Yes"
                                value="yes"
                               
                            />
                            <ChoiceRadio
                                name="Partially"
                                label="Partially"
                                value="Partially"
                               
                            />

                            <ChoiceRadio
                                name="no"
                                label="No"
                                value="no"
                               
                            />

                            <ChoiceRadio
                                name="Unknown"
                                label="Unknown"
                                value="Unknown"
                               
                            />
                        </div>
                    </div>

                
                </form>
            </WizardSection>
        </>
    )
}

export default OtherWitnessForm
