import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getStoredUser, getToken } from "../api/token";


export const globalContext = createContext();

export function GlobalContextProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [breadcrums, setBreadcrums] = useState([]);
  const [pageTitle, setPageTitle] = useState('');
  const [buttonList, setButtonList] = useState([
    // {
    //   type: 'button',
    //   text: 'Add New Staff',
    //   onClick: () => { console.log('Add New Staff clicked') },
    //   backgroundColor: '#00A1F9',
    //   textColor: 'white',
    //   borderColor: '#00A1F9'
    // },
    // {
    //   type: 'search',
    //   name: 'search',
    //   value: '',
    //   onChange: (e) => { setSearchTerm(e.target.value) },
    //   inputType: 'text',
    // },
    // {
    //   type: 'dropdown',
    //   dropdownItems: [
    //     {
    //       text: 'Roles',
    //       onClick: () => { console.log('Roles clicked') },
    //     },
    //     {
    //       text: 'Departments',
    //       onClick: () => { console.log('Departments clicked') },
    //     }
    //   ],
    // },
    // {
    //   type: 'icon',
    //   img: '/bell-icon.svg',
    //   onClick: () => console.log('Icon clicked'),
    // },
  ]);
  const [subTitle, setSubTitle] = useState({});
  const [user, setUser] = useState({
    id: null,
    name: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    const userData = getStoredUser();
    if (userData) {
      setUser({
        id: userData.id || null,
        name: userData.name || '',
        firstName: userData.first_name || userData.firstName || '',
        lastName: userData.last_name || userData.lastName || '',
        phone: userData.phone || '',
        email: userData.email || '',
        image: userData.image || '/avatar.svg',
        roles: userData.roles || [],
      });
    }
  }, []);

  useEffect(() => {
    const path = location.pathname;
    const token = getToken();

    if (path) {
      if (path !== '/auth') {
        if (!token) navigate('/auth');
      } else if (token) {
        navigate('/staffs');
      }
    }
  }, [location.pathname, navigate]);
  
  return (
    <globalContext.Provider value={{
      breadcrums,
      setBreadcrums,
      pageTitle,
      setPageTitle,
      user,
      setUser,
      buttonList,
      setButtonList,
      subTitle,
      setSubTitle
    }}>
      {children}
    </globalContext.Provider>
  );
}
