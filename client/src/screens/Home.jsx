import React, { useDebugValue, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { Tab } from '@headlessui/react'
import UserForm from '../components/UserForm';
import UserTable from '../components/UserTable';
import { adminLogout } from '../redux/actions/admin';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Home = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const admin = useSelector(state => state.admin)

  let [tabs] = useState({
    Form: (<UserForm />),
    Table: (<UserTable />)

  })

  const logoutHandler = () => {
    dispatch(adminLogout())
  }


  useEffect(() => {
    if (!admin.adminInfo) {
      history.push('/login')
    }
  }, [history, admin])

  return (
    <div>
      <div className='flex justify-end px-4 '>
        <button onClick={logoutHandler} className='w-28 h-10 rounded-xl shadow-md px-4 py-2 bg-green-500/90 mt-4 text-white'>Logout</button>
      </div>
      <div className="w-full max-w-md mx-auto px-2 py-16 sm:px-0">
        <Tab.Group>

          <Tab.List className="flex p-1 space-x-1 bg-blue-500 rounded-xl">
            {Object.keys(tabs).map((item) => (
              <Tab
                key={item}
                className={({ selected }) =>
                  classNames(
                    'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                {item}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-2  flex justify-center items-center">
            {Object.values(tabs).map((tab, idx) => (
              <Tab.Panel
                key={idx}
                className='mt-4'
              >
                {tab}
              </Tab.Panel>
            ))}
          </Tab.Panels>

        </Tab.Group>
      </div>
    </div>
  );
};

export default Home;
