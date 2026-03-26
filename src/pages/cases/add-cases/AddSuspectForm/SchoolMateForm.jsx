import React from 'react'
import CommonInput from '../../../../components/common-input'

const SchoolMateForm = () => {
  return (
    <>
          <div className="radio_main">
              <label>Student Name <span>*</span></label>
              <CommonInput
                  name="student_name"
                  placeholder="Enter student name"
                  value=""
              />
          </div>

          <div className="radio_main">
              <label>Student Details <span>*</span></label>
              <CommonInput
                  name="student_details"
                  placeholder="Enter student details"
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

export default SchoolMateForm
