import React from 'react'
import { useNavigate } from 'react-router'

const SuspectCard = ({ suspect }) => {
    const navigate = useNavigate()
    return (
        <>
            <div className={"card_01"}>
                <div className={"cardTop_02"}>
                    <div className={"leftSection_03"}>
                        <div className={"numberBox_04"}>{suspect.id}</div>

                        <div className={"titleSection_05"}>
                            <h3>{suspect.title}</h3>
                            <p className={suspect.statusClass}>{suspect.status}</p>
                        </div>
                    </div>

                    <div className={"actionsWrap_06"}>
                        <button onClick={(()=>navigate(`/cases/view-suspect/${suspect.id}?step=1`))} className={"iconBtn_07 viewBtn_08"} title={"View"}>
                            <i className={"fa-regular fa-eye"}></i>
                        </button>

                        <button onClick={(() => navigate(`/cases/view-suspect/${suspect.id}?step=1`))} className={"iconBtn_07 editBtn_09"} title={"Edit"}>
                            <i className={"fa-solid fa-pen"}></i>
                        </button>

                        <button className={"iconBtn_07 deleteBtn_10"} title={"Delete"}>
                            <i className={"fa-regular fa-trash-can"}></i>
                        </button>
                    </div>
                </div>

                <div className={"cardBody_13"}>
                    {suspect.details.map((item, index) => (
                        <p key={index}>
                            <span className={"labelText_14"}>{item.label}:</span> {item.value}
                        </p>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SuspectCard
