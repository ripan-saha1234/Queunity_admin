import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const SuspectCard = ({ suspect, nodelete, noedit }) => {
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)
    const readOnlyActions = nodelete && noedit

    const handleView = () => {
        navigate(`/cases/view-suspect/${suspect.id}?step=1`)
        setMenuOpen(false)
    }

    const handleEdit = () => {
        navigate(`/cases/view-suspect/${suspect.id}?step=1`)
        setMenuOpen(false)
    }

    const handleDelete = () => {
        setMenuOpen(false)
    }

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
                        {readOnlyActions ? (
                            <button
                                type="button"
                                onClick={handleView}
                                className={"iconBtn_07 viewBtn_08"}
                                title={"View"}
                            >
                                <img src="/view-eye.svg" alt="" width={18} height={18} />
                            </button>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setMenuOpen((prev) => !prev)}
                                    className={"iconBtn_07 moreBtn_15"}
                                    title={"More"}
                                >
                                    <img src="/new_three_dot.svg" alt="More actions" />
                                </button>

                                {menuOpen && (
                                    <div className="actionsMenu_16">
                                        <button type="button" className="actionsMenuItem_17" onClick={handleView}>
                                            View
                                        </button>
                                        {!noedit && (
                                            <button type="button" className="actionsMenuItem_17" onClick={handleEdit}>
                                                Edit
                                            </button>
                                        )}
                                        {!nodelete && (
                                            <button type="button" className="actionsMenuItem_17 delete_18" onClick={handleDelete}>
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
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
