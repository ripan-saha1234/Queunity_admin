import CommonInput from '../../../../components/common-input'
import { ChoiceRadio } from '../../../../components/ChoiceRadio'
import { WizardSection } from '../../../../components/WizardSection'
import InputCommon from '../../../../components/input_common'
import { genderOptions, witnessTypeOptions, presentDuringIncidentOptions } from '../options'
import icon from '../../../../Assets/svg2292.svg'
const OtherWitnessForm = ({ data = {}, setField = () => {} }) => {
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
                <label>Witness Type <span>*</span></label>
                <div className="radio_buttons_wrapper">
                    {witnessTypeOptions.map((opt) => (
                        <ChoiceRadio
                            key={opt.value}
                            name="witness_type"
                            label={opt.label}
                            value={opt.value}
                            checked={data.witness_type === opt.value}
                            onChange={(value) => setField('witness_type', value)}
                        />
                    ))}
                </div>
            </div>

            <WizardSection
                iconBg=" linear-gradient(135deg, #9150C9 0%, #BA71FE 100%)"
                icon={<img src={icon} alt="" />}
                title="Identifying info"
                subtitle="Basic details to identify the witness"
            >
                <form className="suspect_form_fields_wrapper">
                    <div className="radio_main">
                        <label>Witness Name</label>
                        <CommonInput
                            name="witness_name"
                            placeholder="Enter Witness name"
                            onChange={(e) => setField('witness_name', e.target.value)}
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
                        <label>Explain how this witness is connected to the incident <span>*</span></label>
                        <CommonInput
                            name="connection_to_incident"
                            placeholder="Enter details"
                            required
                            multiline={true}
                            onChange={(e) => setField('connection_to_incident', e.target.value)}
                            style={{
                                height: '80px',
                                resize: 'none'
                            }}
                        />
                    </div>

                    <div className="radio_main">
                        <label>Was this witness present during the incident? <span>*</span></label>
                        <div className="radio_buttons_wrapper">
                            {presentDuringIncidentOptions.map((opt) => (
                                <ChoiceRadio
                                    key={opt.value}
                                    name="present_during_incident"
                                    label={opt.label}
                                    value={opt.value}
                                    checked={data.present_during_incident === opt.value}
                                    onChange={(value) => setField('present_during_incident', value)}
                                />
                            ))}
                        </div>
                    </div>


                </form>
            </WizardSection>
        </>
    )
}

export default OtherWitnessForm
