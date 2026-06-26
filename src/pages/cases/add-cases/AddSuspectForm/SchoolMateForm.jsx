import React from 'react'
import CommonInput from '../../../../components/common-input'

const SchoolMateForm = ({ data = {}, setField = () => {} }) => {
  return (
    <>
          <div className="radio_main">
              <label>Student Name <span>*</span></label>
              <CommonInput
                  name="student_name"
                  placeholder="Enter student name"
                  onChange={(e) => setField('student_name', e.target.value)}
              />
          </div>

          <div className="radio_main">
              <label>Student Details <span>*</span></label>
              <CommonInput
                  name="student_details"
                  placeholder="Enter student details"
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

export default SchoolMateForm
