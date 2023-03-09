import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React from "react";

const NavbarComponent = () => (
  <nav className="border-b-2 border-gray-100 sticky top-0 z-50">
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand>
        <span
          style={{ fontFamily: "Dancing Script" }}
          className="text-xl text-blue-600 font-black text__outline"
        >
          Your Sherd
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded={true}
              className="mr-2 md:mr-0"
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <div className="w-[30rem] mx-auto border-2 border-gray-200 rounded-md">
          <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 border-none focus:outline-none"
              type="text"
              id="search"
              placeholder="Search something.."
            />
          </div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  </nav>
);

export default NavbarComponent;