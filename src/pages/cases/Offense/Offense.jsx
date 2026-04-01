import React, { useMemo, useState } from 'react'
import './Offense.css'
import CommonTable from '../../../components/common-table';
import CommonButton from '../../../components/common-button';
import AddOffenceModal from '../../../Modals/CaseModals/AddOffenceModal';
import EditOffenceModal from '../../../Modals/CaseModals/EditOffenceModal';
import HeadLinks from '../../../components/HeadLinks.jsx'
import { useNavigate } from 'react-router-dom';
import usePageHeader from '../../../hooks/use-page-header.jsx';
const Offense = () => {
    const [search, setSearch] = useState("");
    const [addOffense, setaddOffense] = useState(false)
    const [editOffense, seteditOffense] = useState(false)
    const navigate = useNavigate();

    const headerButtons = useMemo(
        () => [
            {
                type: "button",
                text: "Add Offense",
                onClick: () => setaddOffense(true),
                backgroundColor: "#95C63D",
                textColor: "#141414",
                borderColor: "#9FC53D",
            },
            {
                type: "search",
                name: "searchCase",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                inputType: "text",
            },
            {
                type: "icon",
                img: "/filter_icon.svg",
                onClick: () => { },
            },
        ],
        [navigate, search],
    );

    usePageHeader({
        title: "Offence",
        breadcrumbs: [{ title: "Offense", link: "/offense" }],
        buttons: headerButtons,
    });
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
               
                <CommonTable
                    tableData={filteredTableData}
                    headers={tableHeaders}
                    handleActionClick={(action, id) => {
                        console.log("table action", action, id)
                        if (action === "view") {
                            navigate(`/single-offense/${id}`)
                        }
                        if (action === "edit") {
                            seteditOffense(true)
                        }
                    }}
                    actionButtons={[
                        { label: "Edit", action: "edit", onClick: () => seteditOffense(true) },
                        { label: "View", action: "view", onClick: () => navigate(`/single-offense/${id}`) },
                        { label: "Delete", action: "delete" },
                    ]}
                />
            </div>

        </>
    )
}

export default Offense
