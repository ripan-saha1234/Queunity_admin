import React, { useMemo, useState } from 'react'
import CommonButton from '../../../../components/common-button'
import CommonTable from '../../../../components/common-table'
import HeadLinks from '../../../../components/HeadLinks';
import { useNavigate } from 'react-router-dom';
import usePageHeader from '../../../../hooks/use-page-header';
const SingleOffense = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const headerButtons = useMemo(
        () => [
            {
                type: "button",
                text: "Add Sub-Category",
                backgroundColor: "transparent",
                textColor: "#141414",
                borderColor: "#9FC53D",
            },
            {
                type: "button",
                text: "View Question",
                backgroundColor: "#95C63D",
                textColor: "#141414",
                borderColor: "#9FC53D",
                onClick:()=>navigate('/view-question/2')
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
        title: "Offence 1",
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
            <div className='offense_wrapper'>
               
                <CommonTable
                    tableData={filteredTableData}
                    headers={tableHeaders}
                    handleActionClick={(action, id) => {
                        console.log("table action", action, id)
                        if (action === "view") {
                            navigate(`/single-offense/${id}`)
                        }
                    }}
                    actionButtons={[
                        { label: "Edit", action: "edit" },
                        { label: "View", action: "view", onClick: () => navigate(`/single-offense/${id}`) },
                        { label: "Delete", action: "delete" },
                    ]}
                />
            </div>
        </>
    )
}

export default SingleOffense
