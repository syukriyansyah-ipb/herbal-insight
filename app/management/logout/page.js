"use client"
import React, { Fragment, useState } from 'react'
import { signOut } from 'next-auth/react';

const Logout = () => {
 const [showPopup, setShowPopup] = useState(false);

  const handlePopupConfirm = () => {
    signOut({ callbackUrl: 'https://herbalinsight.tod.my.id/authenticate/login' });
  };

  const handlePopupClose = () => {
    // Jika pengguna memilih untuk membatalkan, tutup popup
    setShowPopup(false);
    window.location.href = "/management";
  };
    return (
        <Fragment>
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg relative">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to log out?</p>
                        <div className="flex justify-end">
                            <button onClick={handlePopupClose} className="bg-gray-300 px-4 py-2 rounded mr-2">NO</button>
                            <button onClick={handlePopupConfirm} className="bg-blue-500 text-white px-4 py-2 rounded">YES</button>
                        </div>
                    </div>
                </div>
        </Fragment>
    )
}

export default Logout