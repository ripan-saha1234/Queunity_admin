import { Fragment, useEffect, useRef, useState } from "react"
import { useContext } from "react"
import { globalContext } from "../context/context"
import Breadcrums from "./breadcrums"
import CommonButton from "./common-button"

function AdminHeader({ variant = "full" }) {
  const { pageTitle, user, buttonList, subTitle } = useContext(globalContext)

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownOpen])

  const renderHeaderControls = () => {
    if (!buttonList || buttonList.length === 0) return null

    return (
      <div className="common-layout-header-icon-container">
        {buttonList.map((item, index) => {
          if (item.type === "button") {
            return (
              <CommonButton
                key={index}
                text={item.text}
                img={item?.img || ""}
                onClick={item.onClick}
                backgroundColor={item.backgroundColor}
                color={item.textColor}
                borderColor={item.borderColor}
                disabled={item.disabled}
              />
            )
          }

          if (item.type === "search") {
            return (
              <Fragment key={`search-${index}`}>
                <div className="common-layout-header-icon-search-container">
                  <img
                    src={item.iconSrc || "/search_icon.svg"}
                    alt=""
                    onError={(e) => {
                      e.currentTarget.src = "/common_icon.svg"
                    }}
                  />
                  <input
                    type={item.inputType}
                    placeholder="Search..."
                    className="common-layout-header-icon-search-input"
                    onChange={item.onChange}
                    value={item.value}
                    name={item.name}
                  />
                </div>
              </Fragment>
            )
          }

          if (item.type === "dropdown") {
            return (
              <div
                key={index}
                ref={dropdownRef}
                className="common-layout-header-icon-dropdown-container"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={item.iconSrc || "/triple-dot-icon.svg"}
                  alt=""
                  onError={(e) => {
                    e.currentTarget.src = "/common_icon.svg"
                  }}
                />
                {dropdownOpen && (
                  <div className="common-layout-header-icon-dropdown-items-container">
                    {item.dropdownItems?.map((dropdownItem, ddIndex) => (
                      <button
                        key={ddIndex}
                        onClick={() => {
                          dropdownItem.onClick()
                          setDropdownOpen(false)
                        }}
                      >
                        {dropdownItem.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          if (item.type === "select") {
            return (
              <div key={index} className="common-layout-header-select-container">
                <select
                  name={item.name}
                  value={item.value}
                  onChange={item.onChange}
                  className="common-layout-header-select"
                >
                  {item.options?.map((option, optIndex) => (
                    <option key={optIndex} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )
          }

          if (item.type === "icon") {
            return (
              <div className="common-layout-header-icon-button" key={index}>
                <img
                  src={item.img}
                  alt=""
                  onClick={item.onClick}
                  onError={(e) => {
                    e.currentTarget.src = "/common_icon.svg"
                  }}
                />
              </div>
            )
          }

          return null
        })}
      </div>
    )
  }

  const topbar = (
    <div className="common-layout-topbar">
      <img
        src="/admin_logo.svg"
        alt="QueUnity"
        className="common-layout-topbar-logo"
        onError={(e) => {
          e.currentTarget.src = "/common_icon.svg"
        }}
      />

      <div className="common-layout-header-user-container">
        <div className="common-layout-bell">
          <img
            src="/bell-icon.svg"
            alt=""
            onError={(e) => {
              e.currentTarget.src = "/common_icon.svg"
            }}
          />
        </div>

        <div
          onClick={() => {
            // Keep behaviour; you can wire this to a profile menu later.
            console.log("profile clicked")
          }}
        >
          <img
            // src={user?.image || "/Avatar.svg"}
            src="/Avatar.svg"
            alt=""
            onError={(e) => {
              e.currentTarget.src = "/common_icon.svg"
            }}
          />
        </div>
      </div>
    </div>
  )

  const pageHeader = (
    <div className="common-layout-header">
      <div className="common-layout-header-title-container">
        <Breadcrums />
        {/* Keep layout stable even when pageTitle is not provided */}
        <h2 style={{ visibility: pageTitle ? "visible" : "hidden" }}>
          {pageTitle}
          {subTitle?.text && (
            <span
              className="common-layout-header-title-container-sub-title"
              style={{
                color: subTitle.textColor,
                backgroundColor: subTitle.backgroundColor,
              }}
            >
              {subTitle.text}
            </span>
          )}
        </h2>
      </div>

      {renderHeaderControls()}
    </div>
  )

  if (variant === "topbar") return topbar
  if (variant === "page") return pageHeader

  return (
    <>
      {topbar}
      {pageHeader}
    </>
  )
}

export default AdminHeader

