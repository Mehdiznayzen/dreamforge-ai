"use client";

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import Link from 'next/link';
import { NavbarLinks } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useClerk, useUser } from '@clerk/nextjs';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import ConfirmSignOutModal from './ConfirmSignOutModal';

const Navbar = () => {
    const { isSignedIn, isLoaded } = useUser();
    const { signOut } = useClerk()
    const router = useRouter();
    const [showModalConformation, setModalConformation] = useState<boolean>(false);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl bg-black/30 border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Image 
                        src={"/images/logo.png"}
                        width={80}
                        height={80}
                        alt='logo'
                    />
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {
                        NavbarLinks.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                            >
                                {item.label}
                            </Link>
                        ))
                    }
                </div>

                {
                    !isSignedIn || !isLoaded ? (
                        <div className="flex items-center gap-4">
                            <Button
                                className="hidden sm:inline-flex border-white/20 text-white hover:bg-white/10 transition-all duration-300 cursor-pointer w-20 md:w-32 h-10"
                                onClick={() => router.push('/sign-in')}
                            >
                                Login
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Button
                                className="relative cursor-pointer overflow-hidden bg-linear-to-r from-purple-600 to-blue-600 text-white w-20 md:w-32 h-10 hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all duration-300"
                                onClick={() => router.push('/dashboard')}
                            >
                                <span className="relative z-10">Dashboard</span>
                                <ArrowRight />
                            </Button>
                            <Button
                                className={"cursor-pointer w-20 md:w-32 h-10 transition-all duration-300"}
                                onClick={() => setModalConformation(true)}
                            >
                                <span className="relative z-10">Sign Out</span>
                            </Button>
                        </div>
                    )
                }

                {
                    showModalConformation && (
                        <ConfirmSignOutModal 
                            open={showModalConformation}
                            onClose={() => setModalConformation(false)}
                            onConfirm={() => signOut({ redirectUrl: "/sign-in"})}
                        />
                    )
                }
            </div>
        </motion.nav>
    );
}

export default Navbar;