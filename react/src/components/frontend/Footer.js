import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© Cloth Rental 2023. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="/About" className="mr-4 hover:underline md:mr-6 ">About</a>
          </li>
          <li>
            <a href="/PrivacyPolicy" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
          </li>
          <li>
            <a href="/TermsandConditions" className="mr-4 hover:underline md:mr-6">Terms and conditions</a>
          </li>
          <li>
            <a href="/Contact" className="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer