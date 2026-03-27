import React from 'react'

const WitnessSchoolMate = () => {
    const detailsData = [
        {
            title:'Relationship',
            para:'Schoolmate'
        },
        {
            title: 'Name',
            para: 'Bidisha Bhowmick'
        },
        {
            title: 'Grade',
            para: 'Grade 8'
        },
        {
            title: 'Queunity ID',
            para: '#ST34522'
        },
    ]
    return (
        <>
            <div style={{
                marginTop: '25px'
            }}>
                <h5 style={{
                    fontSize:'20px',
                    color:'rgba(15, 23, 43, 1)',
                    fontWeight:'600'
                }}>Details</h5>

                <div className='details_box_wrapper' style={{
                    marginTop:'20px'
                }}>
                    {detailsData?.map((e) => (
                        <div className='physical_details_box'>
                            <p>{e?.title}</p>
                            <small>{e?.para}</small>
                        </div>
                    ))}
                    <div className='physical_details_box' style={{
                        gridColumn: '1/-1',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px'
                    }}>
                        <p>{'Student Details'}</p>
                        <small>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}</small>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WitnessSchoolMate
