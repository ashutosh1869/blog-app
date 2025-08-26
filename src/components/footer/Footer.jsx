import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo.jsx'

function Footer() {
    return (
        <footer className="bg-gradient-to-br from-indigo-100 via-blue-200 to-purple-100 border-t-2 border-gray-200 py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-wrap gap-8 justify-between">
                    <div className="flex flex-col justify-between md:w-1/2 lg:w-5/12 w-full mb-8 md:mb-0">
                        <div className="flex items-center mb-6">
                            <Logo width="100px" />
                        </div>
                        <p className="text-sm text-gray-600">
                            &copy; Copyright 2023. All Rights Reserved by DevUI.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-1">
                        <div>
                            <h3 className="text-xs font-bold uppercase text-gray-500 mb-6 tracking-wide">
                                Company
                            </h3>
                            <ul>
                                <li className="mb-3">
                                    <Link className="text-base text-gray-700 hover:text-black transition" to="/">
                                        Features
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link className="text-base text-gray-700 hover:text-black transition" to="/">
                                        Pricing
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link className="text-base text-gray-700 hover:text-black transition" to="/">
                                        Affiliate Program
                                    </Link>
                                </li>
                                <li>
                                    <Link className="text-base text-gray-700 hover:text-black transition" to="/">
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase text-gray-500 mb-6 tracking-wide">
                                Support
                            </h3>
                            <ul>
                                <li className="mb-3">
                                    <Link className="text-base text-gray-700 hover:text-black transition" to="/">
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link className="text-base text-gray-700 hover:text-black transition" to="/">
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link className="text-base text-gray-700 hover:text-black transition" to="/">
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link className="text-base text-gray-700 hover:text-black transition" to="/">
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase text-gray-500 mb-6 tracking-wide">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-3">
                                    <Link className="text-base text-gray-700 hover:text-black transition" to="/">
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link className="text-base text-gray-700 hover:text-black transition" to="/">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link className="text-base text-gray-700 hover:text-black transition" to="/">
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
