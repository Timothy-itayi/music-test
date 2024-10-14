import React from 'react';

const Navbar = () => (
  <div className="flex justify-between items-center p-4">
    <div className="flex space-x-4">
      <button className="px-4 py-2 bg-gray-200 rounded">UNVEIL ® PROJECTS</button>
      <button className="px-4 py-2 bg-gray-200 rounded">STUDIO</button>
      <button className="px-4 py-2 bg-gray-200 rounded">CONTACT</button>
    </div>
    <div className="flex space-x-4">
      <button className="px-4 py-2 bg-gray-200 rounded">OVERVIEW</button>
      <button className="px-4 py-2 bg-gray-200 rounded">INDEX</button>
    </div>
  </div>
);

export default Navbar;
