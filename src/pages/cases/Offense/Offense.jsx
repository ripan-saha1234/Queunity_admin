import React, { useMemo, useState } from 'react'
import './Offense.css'
import CommonTable from '../../../components/common-table';
import CommonButton from '../../../components/common-button';
import AddOffenceModal from '../../../Modals/CaseModals/AddOffenceModal';
import EditOffenceModal from '../../../Modals/CaseModals/EditOffenceModal';
import HeadLinks from '../../../components/HeadLinks.jsx'
const Offense = () => {
    const [search, setSearch] = useState("");
    const [addOffense, setaddOffense] = useState(false)
    const [editOffense, seteditOffense] = useState(false)
    const tableHeaders = useMemo(
        () => [
            { title: "Offense Name", value: "offenseName" },
            { title: "No of cases assigned", value: "case_assigned" },
            { title: "Actions", value: "action" },
        ],
        [],
    )

    const tableData = useMemo(
        () => [
            {
                offenseName: "Offense 1",
                case_assigned: "5",
            },
            {
                offenseName: "Offense 2",
                case_assigned: "5",
            },
            {
                offenseName: "Offense 1",
                case_assigned: "5",
            },
            {
                offenseName: "Offense 2",
                case_assigned: "5",
            },
            {
                offenseName: "Offense 1",
                case_assigned: "5",
            },
            {
                offenseName: "Offense 2",
                case_assigned: "5",
            },
        ],
        [],
    )
    const filteredTableData = useMemo(() => {
        if (!search.trim()) return tableData
        const q = search.trim().toLowerCase()
        return tableData.filter((row) => row.offense.toLowerCase().includes(q) || row.caseId.toLowerCase().includes(q))
    }, [search, tableData])
    return (
        <>
            {addOffense && <AddOffenceModal setaddOffense={setaddOffense} />}
            {editOffense && <EditOffenceModal seteditOffence={seteditOffense} />}
            <div className='offense_wrapper'>
                <div className='offense_header_wrapper'>
                    <HeadLinks name={'Offence'} title1={'Offence'} link1={'/offense'} />

                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <CommonButton onClick={(() => setaddOffense(true))} text='Add Offense' backgroundColor={'var(--primary-color)'} borderColor={'transparent'} />

                        <div style={{
                            width: '200px',
                            border: '1px solid rgba(217, 217, 217, 1)',
                            borderRadius: '10px',
                            height: '45px',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <i style={{
                                position: 'absolute',
                                top: "15px",
                                left: '10px',
                                color: '#404040',
                                fontSize: '13px'
                            }} class="fa-solid fa-magnifying-glass"></i>
                            <input placeholder='Search..' style={{
                                width: '100%',
                                height: '100%',
                                paddingLeft: "30px",
                                borderRadius: '10px',
                                border: 'none',
                                outline: 'none'

                            }} />
                        </div>

                        <div style={{
                            padding: '12px 15px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: 'rgba(243, 243, 243, 1)',
                            borderRadius: '8px',
                            height: '45px',
                            width: 'fit-content'
                        }}>
                            <img src='/filter_alt.svg' />
                        </div>
                    </div>
                </div>
                <CommonTable
                    tableData={filteredTableData}
                    headers={tableHeaders}
                    handleActionClick={(action, id) => {
                        console.log("table action", action, id)
                        seteditOffense(true)
                    }}
                    actionButtons={[
                        { label: "Edit", action: "edit" },
                        { label: "View", action: "view" },
                        { label: "Delete", action: "delete" },
                    ]}
                />
            </div>

        </>
    )
}

export default Offense
