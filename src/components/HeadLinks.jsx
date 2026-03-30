import React from 'react'
import { useNavigate } from 'react-router-dom'

const HeadLinks = ({ title1, link1, title2, link2, title3, link3, title4, link4, name }) => {
    const navigate = useNavigate()

    return (
        <div className='offense_Head'>
            <small>
                <span onClick={() => navigate(link1)}>{title1}</span>

                {title2 && (
                    <>
                        {" / "}
                        <span onClick={() => navigate(link2)}>{title2}</span>
                    </>
                )}

                {title3 && (
                    <>
                        {" / "}
                        <span onClick={() => navigate(link3)}>{title3}</span>
                    </>
                )}

                {title4 && (
                    <>
                        {" / "}
                        <span onClick={() => navigate(link4)}>{title4}</span>
                    </>
                )}
            </small>

            <h2 style={{
                fontSize:'25px',
                fontWeight:'600',
                marginTop:'10px'
            }}>{name}</h2>
        </div>
    )
}

export default HeadLinks