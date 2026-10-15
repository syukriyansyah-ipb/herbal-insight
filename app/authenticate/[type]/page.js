"use client";

import { useRef, useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from "next-auth/react";
import { PiPlantFill } from "react-icons/pi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdErrorOutline, MdVerifiedUser } from "react-icons/md";
import { BsFillSendExclamationFill, BsEnvelopeExclamation } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
// internal imports

export default function Auth({ params }) {

    const router = useRouter();
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [formErrors, setFormErrors] = useState({ email: '', password: '', fullname: '', rePassword: '' });
    const { data: session } = useSession(); // useSession should be used here
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccesRegister, setIsSuccesRegister] = useState(false);
    const [isSuccesLogin, setIsSuccesLogin] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const [errorMessageVerifyMarker, setErrorMessageVerifyMarker] = useState('');
    const [errorMessageVerify, setErrorMessageVerify] = useState('');
    const formRefRegister = useRef(null);
    const [verificationCode, setVerificationCode] = useState("");
    const [emailForLink, setEmailForLink] = useState("");
    const [isResent, setIsResent] = useState(false);

    // SESSION CEK
    useEffect(() => {
        if (session) {
            const userRole = session.user?.role; // Assuming role is present in the session object
            if (userRole === 'superadmin' || userRole === 'admin') {
                router.push('/');
            } else if (userRole === 'contributor') {
                router.push('/contributor');
            }
        }
    }, [session, router]);

    // REGITER HANDLER
    const handleActionRegister = async (formData) => {
        const username = formData.get('username');
        const password = formData.get('password');
        const fullname = formData.get('fullname');
        const rePassword = formData.get('re-password');
        const role = formData.get('role');

        if (password !== rePassword) {
            setFormErrors((prev) => ({
                ...prev,
                rePassword: 'Password does not match', // kata sandi tidak sesuai
            }));
            return;
        }

        const data = { fullname, username, password, role };
        try {
            setIsLoading(true);
            const response = await register(data); // Panggilan API untuk register

            if (response.status === 200) {  // Memeriksa apakah status code adalah 200
                setIsLoading(false);
                setIsSuccesRegister(true);
                // setTimeout(() => {
                //     router.push('/authenticate/login');
                // }, 5000);
            } else {
                setIsLoading(false);
                // setIsError(true);
                // setErrorMessage(response.data?.message || 'An error occurred. Please try again.');
                setIsSuccesRegister(true);
                // setTimeout(() => {
                //     router.push('/authenticate/login');
                // }, 5000);
            }

        } catch (error) {
            setIsLoading(false);
            const detail = error?.response?.data?.detail;

            if (detail === 'USERNAME_ALREADY_REGISTERED') {
                setFormErrors((prev) => ({
                    ...prev,
                    username: 'Email is already registered.',
                }));
            } else {
                setIsError(true);
                setErrorMessage(error?.response?.data?.message || error?.message || 'An error occurred. Please try again.');
            }
            // setIsLoading(false);
            // setIsError(true);
            // setErrorMessage(error?.response?.data?.message || error?.message || 'An error occurred. Please try again.');
        }
    };


    //     const data = {
    //         fullname: formData.get('fullname'),
    //         username: formData.get('email'),
    //         password: formData.get('password'),
    //         role: 'contributor',
    //     };

    //     // Panggilan API untuk register
    //     const response = await register(data);

    //     if (response.status === 200) {
    //         alert('Register Berhasil');
    //         router.push('/authenticate/login');
    //     } else {
    //         alert('Terjadi kesalahan, silakan coba lagi.');
    //     }
    // } catch (error) {
    //     const errorMessage = error.message || 'Terjadi kesalahan, silakan coba lagi.';
    //     alert(errorMessage);
    //   }
    //}

    const formRefLogin = useRef(null);

    // LOGIN HANDLER
    const handleActionLogin = async (formData) => {
        const username = formData.get('username');
        const password = formData.get('password');
        // const username = formData.get('username'); // Jika ingin mengganti dengan username, gunakan ini

        try {
            // Mengubah status loading menjadi true saat proses login
            setIsLoading(true);

            // Melakukan login menggunakan NextAuth
            const result = await signIn('credentials', {
                redirect: false,
                username,
                password,
            });

            // Mengecek apakah login berhasil atau tidak
            if (!result || result.error) {
                // Jika login gagal, atur status loading menjadi false dan tampilkan pesan error
                setIsLoading(false);

                // Set form errors untuk menampilkan pesan login gagal
                setFormErrors({ username: '', password: 'Login failed. Please check your credentials.' });

                // Menangani kasus jika error yang terjadi adalah USER_NOT_VERIFIED
                if (result && result.error === 'USER_NOT_VERIFIED') {
                    router.push('/authenticate/verify');
                }
                setIsError(true);
                setErrorMessage(error.message || 'The password you entered is incorrect. Please try again.');
            } else {
                setIsLoading(false);
                // Jika login berhasil, atur status login sukses dan arahkan ke halaman utama
                setIsSuccesLogin(true);
                setTimeout(() => {
                    const userRole = result?.user?.role;
                    if (userRole === 'superadmin' || userRole === 'admin') {
                        router.push('/management');
                    } else if (userRole === 'contributor') {
                        router.push('/contributor');
                    }
                    window.location.reload();
                }, 5000);
            }

        } catch (error) {
            // Menangani error jika terjadi kesalahan saat login
            setIsLoading(false);
            setIsError(true);

            // Menampilkan pesan error yang relevan
            setErrorMessage(error.message || 'An error occurred. Please try again.');
            alert(error.message || 'An error occurred. Please try again.');
        }
    };

    const handleCloseError = () => {
        setError(false); // Menutup popup saat tombol cross diklik
    };

    // VERIFY MANUAL ACCOUNT
    const handleVerification = async (e) => {
        try {
            e.preventDefault();
            if (!verificationCode) {
                setError(true);
                setErrorMessageVerifyMarker('Oops, the token has not been entered.')
                setErrorMessageVerify('Please enter your token to continue!');
                return;
            }

            // Simulate API call for verification
            const response = await verifyToken(verificationCode)
            setIsLoading(false);
            setIsSuccesLogin(true);
            setTimeout(() => {
                router.push('/authenticate/login');
            }, 2000);
        } catch (error) {
            setIsLoading(false);
            setError(true);
            setErrorMessageVerifyMarker('The token is invalid or expired.');
            setErrorMessageVerify('Please resend the verification link to continue!');
        }
    };

    // VERIFY AUTOMATE USING TOKEN URL
    // useEffect(() => {
    //     const { token } = router.query || {}; // Ambil token dari URL
    //     if (token) {
    //       // Cek token ke API
    //       console.log("ini token : ", token)
    //         const verifyToken = async () => {
    //             try {
    //                 const response = await verifyToken(token);
    //                 if (response.status === 200) {
    //                     // setStatus('success');
    //                     router.push('/login'); // Arahkan ke login jika berhasil
    //                 }
    //             } catch (error) {
    //                 console.log("error verify", error)
    //                 // setStatus('failed'); // Tampilkan opsi resend jika gagal
    //             }
    //         };
    //         verifyToken();
    //     }
    // }, [router.query]);


    const [isSuccesResendLink, setIsSuccesResendLink] = useState(false);
    // VERIFY MANUAL ACCOUNT
    const handleResendLink = async (e) => {
        try {
            e.preventDefault();
            if (!emailForLink) {
                setError(true);
                setErrorMessageVerifyMarker('Oops, the email has not been entered!')
                setErrorMessageVerify('Please enter your email to continue!');
                return;
            }
            setIsLoading(false);
            // Simulate API call for verification
            const response = await resendToken(emailForLink)

            // berhasil disini
            // router.push('/authenticate/login');
            setIsSuccesResendLink(true);
            // alert(response.detail)
        } catch (error) {
            // gagal disini
            setIsLoading(false);
            setError(true);
            setErrorMessageVerifyMarker('Oops, the submission failed.');
            setErrorMessageVerify('Please double-check your email and try again!');
        }

    };

    const handleChangeEmail = (val) => {
        if (val.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setErrorEmail(false);
        } else {
            setErrorEmail(true);
        }
    }
    // const handleChangePassword = (val) => {
    //     if (val.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
    //         setErrorPassword(false);
    //     } else {
    //         setErrorPassword(true);
    //     }
    // }

    return (
        <Fragment>
            {isSuccesResendLink && (
                <div className="fixed top-0 left-0 w-full h-full flex items-top mt-5 justify-center z-50">
                    <div className="flex flex-col gap-4 w-80 sm:w-96 text-[10px] sm:text-xs">
                        <div className="success-alert cursor-default flex items-center justify-between w-full h-[130px] rounded-lg bg-[#F0E1C6] px-[10px]">
                            <div className="text-[#F5F5F5] bg-green-900 p-2 rounded-lg flex justify-center items-center">
                                <IoMdCheckmarkCircleOutline className="text-white text-[42px]" />
                            </div>
                            <div className="ml-4">
                                <p className="text-[#2C6B3F] font-bold text-[14px] sm:text-[15px] sm:mb-2 sm:mt-1">The link has been successfully resent.</p>
                                <p className="text-[#4A4A4A] text-[13px] sm:text-[14px]">Please check your email to enter the token on the verification page.</p>
                                <div className="flex justify-end mt-1">
                                    <button
                                        className="px-3 py-1 text-xs bg-[#6DBE45] text-white rounded-md hover:bg-[#5C9F3B] transition-colors"
                                        onClick={() => router.push('/authenticate/verify')}
                                    >
                                        Verify here!
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}


            {isSuccesLogin && (
                <div className="fixed top-0 left-0 w-full h-full flex items-top mt-5 justify-center z-50">
                    <div className="flex flex-col gap-4 w-80 sm:w-[325px] text-[10px] sm:text-xs">
                        <div className="success-alert cursor-default flex items-center justify-between w-full h-[100px] rounded-lg bg-[#F0E1C6] px-[10px]">
                            <div className="text-[#F5F5F5] bg-green-900 p-2 rounded-lg flex justify-center items-center">
                                <IoMdCheckmarkCircleOutline className="text-white text-[42px]" />
                            </div>
                            <div className="ml-4">
                                <p className="text-[#2C6B3F] font-bold text-[14px] sm:text-[15px] sm:mb-2">Login successful!</p>
                                <p className="text-[#4A4A4A] text-[13px] sm:text-[14px]">You have successfully logged in to your account.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {isError && (
                <div className="fixed top-0 left-0 w-full h-full flex items-top mt-5 justify-center z-50">
                    <div className="flex flex-col gap-4 w-80 sm:w-[325px] text-[10px] sm:text-xs">
                        <div className="error-alert cursor-default flex items-center justify-between w-full h-[100px] rounded-lg bg-[#D1B29D] px-[10px]">
                            <div className="text-[#F5F5F5] bg-red-500/75 p-2 rounded-lg flex justify-center items-center">
                                <MdErrorOutline className="text-white text-[42px]" />
                            </div>
                            <div className="ml-4">
                                <p className="text-[#5C3D28] font-bold text-[14px] sm:text-[15px] sm:mb-1">Error</p>
                                <p className="text-[#4A4A4A] text-[13px] sm:text-[14px]">{errorMessage}</p>
                            </div>
                            <button
                                className="text-[#5C3D28] bg-white/10 backdrop-blur-xl text-sm hover:text-black hover:bg-[#ffffff5d] p-[6px] rounded-md transition-colors ease-linear"
                                onClick={() => setIsError(false)} // Menutup popup ketika tombol ini diklik
                            >
                                <RxCross2 />
                            </button>
                        </div>

                    </div>
                </div>
            )}


            {isLoading && (
                <div className="fixed top-0 left-0 w-full h-full flex items-top mt-5 justify-center z-50">
                    <div className="flex flex-col gap-2 w-80 sm:w-[325px] text-[10px] sm:text-xs">
                        <div className="loading-alert cursor-default flex items-center justify-between w-full h-[100px] rounded-lg bg-[#F0E1C6] px-[10px]">
                            <div className="flex gap-2">
                                <div className="text-[#F5F5F5] bg-green-900/75 p-2 rounded-lg flex justify-center items-center">
                                    <PiPlantFill className="text-white text-[42px] animate-bounce" />
                                </div>
                                <div>
                                    <p className="text-[#2C6B3F] font-bold text-[14px] mt-1 sm:mt-2 sm:text-[15px]">Loading...</p>
                                    <p className="text-[#4A4A4A] text-[13px] mt-1 sm:text-[14px]">Please wait while the data is loading!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isSuccesRegister && (
                <div className="fixed top-0 left-0 w-full h-full flex items-top mt-5 justify-center z-50">
                    <div className="flex flex-col gap-4 w-80 sm:w-96 text-[10px] sm:text-xs">
                        <div className="success-alert cursor-default flex items-center justify-between w-full h-[130px] rounded-lg bg-[#F0E1C6] px-[10px]">
                            <div className="text-[#F5F5F5] bg-green-900 p-2 rounded-lg flex justify-center items-center">
                                <IoMdCheckmarkCircleOutline className="text-white text-[42px]" />
                            </div>
                            <div className="ml-4">
                                <p className="text-[#2C6B3F] font-bold text-[14px] sm:text-[15px] sm:mb-2 sm:mt-1">Registration successful!</p>
                                <p className="text-[#4A4A4A] text-[13px] sm:text-[14px]">A token has been sent to your email address. Please enter the token for first-time verification when you log in.</p>
                                <div className="flex justify-end mt-1">
                                    <button
                                        className="px-3 py-1 text-xs bg-[#6DBE45] text-white rounded-md hover:bg-[#5C9F3B] transition-colors"
                                        onClick={() => router.push('/authenticate/verify')}
                                    >
                                        Verify here!
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}


            {error && (
                <div className="fixed top-0 left-0 w-full h-full flex items-top mt-5 justify-center z-50">
                    <div className="flex flex-col gap-2 w-80 sm:w-96 text-[10px] sm:text-xs">
                        <div className="error-alert cursor-default flex items-center justify-between w-full  h-[100px]  rounded-lg bg-[#D1B29D] px-[10px]">
                            <div className="flex gap-2">
                                <div className="text-[#F5F5F5] bg-red-500/75 backdrop-blur-xl p-2 rounded-lg flex justify-center items-center">
                                    <BsEnvelopeExclamation className='text-[42px] top-0 bottom-0 ' />
                                </div>
                                <div>
                                    <p className="text-[#5C3D28] font-semibold text-[14px] mt-1 sm:mt-2 sm:text-[15px]">{errorMessageVerifyMarker}</p>
                                    <p className="text-[#4A4A4A] text-[13px] mt-1 sm:text-[14px]">{errorMessageVerify}</p>
                                </div>
                            </div>
                            <button
                                className="text-[#5C3D28] bg-white/10 backdrop-blur-xl text-sm hover:text-black hover:bg-[#ffffff5d] p-[6px] rounded-md transition-colors ease-linear"
                                onClick={handleCloseError} // Menutup popup ketika tombol ini diklik
                            >
                                <RxCross2 />
                            </button>
                        </div>
                    </div>
                </div>

                // <div className='z-10 fixed top-0 left-0 w-full h-full bg-black opacity-50 flex items-center justify-center'>
                //     <div className='bg-white p-5 rounded-lg text-center max-w-xs w-full shadow-md'>
                //         <MdErrorOutline className='text-5xl md:text-6xl z-20 mx-auto mt-4' />
                //         <div className="mt-2 text-sm md:text-base">{errorMessageVerify}</div>
                //     </div>
                // </div>
            )}

            {/* verify account */}
            <div className="flex items-center justify-center bg-wallpaper-login bg-cover bg-center w-full h-screen overflow-hidden
                md:w-full md:m-0 md:p-[5px] ">
                <div
                    className={`w-full lg:w-[30%] sm:w-[50%] md:w-[45%] h-[100%] sm:h-[85%] top-[6%] bg-white transition-transform duration-300 lg:translate-x-[116.5%] sm:translate-x-[88%] md:translate-x-[90%] p-10 flex flex-col items-center justify-center  ${params.type == 'verify' ? 'visible flex' : 'invisible hidden'}`}
                    style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }} // Menambahkan posisi vertikal tengah
                >
                    <MdVerifiedUser className='text-7xl z-20 mx-auto mb-4 -mt-4' />
                    {error && <p className='text-red-500 text-base'>{error}</p>} {/* Tampilkan error */}
                    <h1 className="text-xl font-bold mb-4 text-center">Verify Your Account</h1>
                    <p className="mb-6 text-center">Enter the verification code sent to your email.</p>

                    <form
                        onSubmit={handleVerification}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '100%' }}
                    >
                        <input
                            type="text"
                            placeholder="Verification Code"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                        <button
                            type="submit"
                            // className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            className='mt-6 relative px-4 py-2 w-full h-[3em] rounded-[5px] border-none outline-none transition-all duration-400 ease-in-out shadow-[1px_1px_3px_#b5b5b5,-1px_-1px_3px_#1C492F] active:shadow-[inset_3px_3px_6px_#b5b5b5,inset_-3px_-3px_6px_#1C492F]'
                        >
                            Verify
                        </button>
                    </form>

                    <Link href='/authenticate/resend-link'>
                        <p className='text-[#1C492F] text-[14px] mt-4'> Resend Link</p>
                        {/* <button className="mt-6 relative px-4 py-2 w-[20em] h-[3em] rounded-[5px] border-none outline-none transition-all duration-400 ease-in-out shadow-[1px_1px_3px_#b5b5b5,-1px_-1px_3px_#1C492F] active:shadow-[inset_3px_3px_6px_#b5b5b5,inset_-3px_-3px_6px_#1C492F]">Resend Link</button> */}
                    </Link>

                    {/* <button
                            onClick={handleResendCode}
                            disabled={isResent}
                            className={`mt-4 px-4 py-2 rounded border ${isResent ? 'bg-gray-300 text-gray-500' : 'bg-transparent border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition'}`}
                        >
                            {isResent ? 'Code Sent' : 'Resend Code'}
                        </button> */}
                </div>


                {/* RESEND VERIFY LINK */}
                <div
                    className={`w-full lg:w-[30%] sm:w-[50%] md:w-[45%] h-[100%] sm:h-[85%] top-[6%] bg-white transition-transform duration-300 lg:translate-x-[116.5%] sm:translate-x-[88%] md:translate-x-[90%] p-10 flex flex-col items-center justify-center ${params.type == 'resend-link' ? 'visible flex' : 'invisible hidden'}`}
                    style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }} // Menambahkan posisi vertikal tengah
                >
                    <BsFillSendExclamationFill className='text-7xl z-20 mx-auto mb-4 -mt-4' />
                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Tampilkan error */}
                    <h1 className="text-xl font-bold mb-4">Resend Link Verify</h1>
                    <p className="mb-6 text-center">Enter your email registered.</p>

                    <form
                        onSubmit={handleResendLink}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '100%' }}
                    >
                        <input
                            type="text"
                            placeholder="Email"
                            value={emailForLink}
                            onChange={(e) => setEmailForLink(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                        <button
                            type="submit"
                            className="hover:bg-[#d4d3d3] mt-6 relative px-4 py-2 w-full h-[3em] rounded-[5px] border-none outline-none transition-all duration-400 ease-in-out shadow-[1px_1px_3px_#b5b5b5,-1px_-1px_3px_#1C492F] active:shadow-[inset_3px_3px_6px_#b5b5b5,inset_-3px_-3px_6px_#1C492F]"
                        >
                            Resend
                        </button>
                    </form>
                </div>

                {/* Register & Login */}

                <div className={` w-[98%] h-[98%] sm:w-[70%] sm:h-0 sm:min-h-[400px] bg-[#d9d9d988]   flex relative shadow-lg items-center justify-center ${params.type == 'login' || params.type == 'register' ? 'visible' : 'invisible'}`}>
                    <div className="table-cell align-middle text-center sm:ml-8  md:ml-0 md:mr-9">
                        <p className="text-[18px] mb-4 font-bold text-[#1C492F]">Already an user?</p>
                        <Link href='/authenticate/login'>
                            <button className="active bg-[#1C492F] sm:mb-2 font-bold buttonLogin 
                            inline-block border bg-clip-padding absolute left-0 top-0 sm:relative text-white transition-all 
                            duration-[0.25s] sm:py-2.5 sm:rounded-[50px] sm:border-solid border-white w-1/2 h 
                            md:w-[110px] sm:w-[90px] sm:h-[46px] h-10 sm:text-[15px]">Log in</button>
                        </Link>
                    </div>

                    <div className="ml-[100px] sm:ml-[100px] md:ml-[160px] sm:text-center">
                        <p className="mb-4 font-bold text-[#1C492F] text-[18px]">Don't have an account?</p>
                        <Link href='/authenticate/register'>
                            <button className="sm:bg-[#234e35] md:mr-9 bg-[#448560] font-bold md:ml-9 buttonRegister
                            inline-block border bg-clip-padding absolute right-0 top-0 sm:border-solid border-white md:w-[130px] 
                            sm:w-[100px] sm:h-[46px] sm:relative text-white transition-all duration-[0.25s]  sm:py-2.5 sm:rounded-[50px] 
                            w-1/2 h-10 sm:text-[15px]" >Register</button>
                        </Link>
                    </div>

                    <div className={`absolute w-[100%] lg:w-[40%] sm:w-[50%] md:w-[45%] h-[94%] sm:h-[120%] top-[6%] sm:top-[-10%] lg:left-[5%] md:left-[7%] sm:left-[3%] bg-[#F6E9E9] transition-transform duration-300 
                        ${params.type == 'login' ? '' : 'lg:translate-x-[125%] sm:translate-x-[88%] md:translate-x-[90%]'}`}>
                        <form id="login"
                            tabIndex="500"
                            className={`flex-col w-full transition-opacity pt-[15px] pb-[30px] px-[30px] bg-[#F6E9E9] 
                            ${params.type == 'login' ? 'visible' : 'invisible'}`}
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                handleActionLogin(formData);
                            }}
                        >
                            <h3 className="text-center font-semibold text-3xl sm:mb-8 mb-10 mt-20">Log In</h3>
                            <div className="mail relative mb-[20px]">
                                <label className="absolute text-sm whitespace-nowrap text-left text-[#0000009f] 
                                    pointer-events-none px-[5px] py-0 left-[15px] -top-2.5 bg-gradient-to-t from-[#fff] to-[#F6E9E9]">Email</label>
                                <input type="mail" name="username" className="h-10 w-full px-[15px] py-[5px] border-[#575252] border text-sm text-slate-700 placeholder:opacity-50" placeholder='example@gmail.com' onChange={(e) => handleChangeEmail(e.target.value)}
                                />
                                {errorEmail && <p className="text-red-500 text-sm">Invalid email format</p>}
                            </div>
                            <div className="passwd relative mb-[15px]">
                                <label className="absolute text-sm whitespace-nowrap text-left text-[#0000009f] 
                                    pointer-events-none px-[5px] py-0 left-[15px] -top-2.5 bg-gradient-to-t from-[#fff] to-[#F6E9E9]">Password</label>
                                <input type="password" name="password" className="h-10 w-full px-[15px] py-[5px] border border-[#575252] text-sm text-slate-700 placeholder:opacity-50" placeholder='********'
                                />
                                {/* {errorPassword && <p className="text-red-500 text-sm">Password must be at least 8 characters long, with at least one uppercase letter, one number, and one special character.</p>} */}
                            </div>
                            <div className=''>
                                <h1 className='text-sm text-[13px]'>Don't have an account? <a href='#' className='font-bold' onClick={() => router.push('/authenticate/register')}>Register</a></h1>
                            </div>
                            <div className="submit flex items-center justify-center sm:mt-6 mt-14">
                                <button className="sm:bg-[#182F2E] bg-[#1C492F] font-bold inline-block border bg-clip-padding 
                                    relative text-white transition-opacity duration-0 px-[30px] py-2.5 rounded-[50px] 
                                    border-solid border-white mt-12">Log In</button>
                            </div>
                        </form>

                        <form id="register"
                            tabIndex="502"
                            className={`flex-col w-full transition-opacity duration-[0.5s] mt-[-390px] px-[30px] bg-[#F6E9E9]
                            ${params.type == 'register' ? 'visible' : 'invisible'}`}
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                handleActionRegister(formData);
                            }}
                        >
                            <h3 className="text-center font-semibold text-3xl mb-8 ">Register</h3>
                            <div className="relative mb-[20px] sm:mt-0 mt-[39px]">
                                <input type="text" name="fullname" className="h-10 w-full px-[15px] py-[5px] border border-[#575252] text-sm text-slate-700 placeholder:opacity-50" placeholder='Budi Setiawan' />
                                <label className="absolute text-sm whitespace-nowrap text-left text-[#0000009f] 
                                    pointer-events-none px-[5px] py-0 left-[15px] -top-2.5 bg-gradient-to-t from-[#fff] to-[#F6E9E9]">Fullname</label>
                            </div>
                            <div className="mail relative mb-[20px] sm:mt-0 ">
                                <input type="mail" name="username" className="h-10 w-full px-[15px] py-[5px] border border-[#575252] text-sm text-slate-700 placeholder:opacity-50" placeholder='example@gmail.com' onChange={(e) => handleChangeEmail(e.target.value)} />
                                {(errorEmail || formErrors.username) && (<p className="text-red-500 text-sm">{formErrors.username || 'Invalid email format'}</p>)}
                                <label className="absolute text-sm whitespace-nowrap text-left text-[#0000009f] 
                                    pointer-events-none px-[5px] py-0 left-[15px] -top-2.5 bg-gradient-to-t from-[#fff] to-[#F6E9E9]">Email</label>
                            </div>
                            <div className="passwd relative mb-[20px]">
                                <input type="password" name="password" className="h-10 w-full px-[15px] py-[5px] border border-[#575252] text-sm text-slate-700 placeholder:opacity-50" placeholder='********' />
                                {/* {errorPassword && <p className="text-red-500 text-sm">Password must be at least 8 characters long, with at least one uppercase letter, one number, and one special character.</p>} */}
                                <label className="absolute text-sm whitespace-nowrap text-left text-[#0000009f] 
                                    pointer-events-none px-[5px] py-0 left-[15px] -top-2.5 bg-gradient-to-t from-[#fff] to-[#F6E9E9]">Password</label>
                            </div>
                            <div className="repasswd relative mb-[15px]">
                                <input type="password" name="re-password" className="h-10 w-full px-[15px] py-[5px] border border-[#575252] text-sm text-slate-700 placeholder:opacity-50" placeholder='********' />
                                {/* {errorPassword && <p className="text-red-500 text-sm">Password must be at least 8 characters long, with at least one uppercase letter, one number, and one special character.</p>} */}
                                {formErrors.rePassword && <p className="text-red-500 text-sm">{formErrors.rePassword}</p>}
                                <label className="absolute text-sm whitespace-nowrap text-left text-[#0000009f] 
                                    pointer-events-none px-[5px] py-0 left-[15px] -top-2.5 bg-gradient-to-t from-[#fff] to-[#F6E9E9]">Re-Password</label>
                            </div>
                            <div className="role relative mb-[15px]">
                                <input type="role" name="role" value="contributor" readOnly className="h-10 w-full px-[15px] py-[5px] border border-[#575252] text-sm text-slate-700 placeholder:opacity-50" />
                                <label className="absolute text-sm whitespace-nowrap text-left text-[#0000009f] 
                                    pointer-events-none px-[5px] py-0 left-[15px] -top-2.5 bg-gradient-to-t from-[#fff] to-[#F6E9E9]">Role</label>
                            </div>
                            <div className="submit flex items-center justify-center mt-14">
                                <button className="sm:bg-[#182F2E] bg-[#448560] font-bold inline-block border bg-clip-padding 
                                    relative text-white transition-opacity duration-0 px-[30px] py-2.5 rounded-[50px] 
                                    border-solid border-white mb-6 sm:mt-0">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}