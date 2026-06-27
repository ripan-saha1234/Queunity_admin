import React from 'react'
import CommonInput from '../../components/common-input'
import CommonButton from '../../components/common-button'

const AddSubCategoryModal = ({ setAddSubCategory }) => {
    return (
        <>
            <div className='modal_wrapper'>
                <div className='modal_body'>
                    <div className='modal_head'>
                        <h5>Add Sub-Category</h5>
                        <i class="fa-solid fa-xmark" onClick={(() => setAddSubCategory(false))}></i>
                    </div>
                    <div className='radio_main'>
                        <label style={{
                            marginLeft: '10px',
                            display: 'block'
                        }}>Sub-Category Name <span>*</span></label>
                        <CommonInput placeholder='Enter sub-category name' />
                    </div>
                    <div onClick={(() => setAddSubCategory(false))} style={{
                        marginLeft: 'auto'
                    }}>
                        <CommonButton text='Add' backgroundColor={'var(--primary-color)'} borderColor={'transparent'} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddSubCategoryModal
