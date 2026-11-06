'use client'

import { Badge } from "@/components/tailgrids/core/badge";
import { Discord, Facebook, Google, Instagram1, Telephone1, Twitter } from "@tailgrids/icons";
import Link from "next/link";
export default function Footer() {
    return (
        // footer content
        <div className='text-center mt-4'>
            {/* stunden info */}
            <div>
                <Badge className="text-xl rounded-lg bg-blue-300 text-black">68101219 พิชญ์ ทาทอง</Badge>
            </div>
            {/* contact info */}
            <div className='flex justify-center gap-6 mt-4'>
                <Link href="https://www.facebook.com/pich.thathong?locale=th_TH" target="_blank">
                    <Facebook className='text-blue-700' />
                </Link>

                <div className='border-l'></div>
                <Link href="https://www.instagram.com/pich__tha/" target="_blank">
                    <Instagram1 className='text-pink-600' />
                </Link>

               


            </div>
        </div>
    )
}