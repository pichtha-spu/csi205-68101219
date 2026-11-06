'use client'
import { useSyncExternalStore } from "react";
import { Badge } from "@/components/tailgrids/core/badge";
import {
    getCredentialSnapshot,
    getServerCredentialSnapshot,
    parseCredential,
    subscribeToCredential,
} from "@/utils/login";

export default function Header() {
    const credentialValue = useSyncExternalStore(
        subscribeToCredential,
        getCredentialSnapshot,
        getServerCredentialSnapshot,
    );
    const credential = parseCredential(credentialValue);

    return (
        // header content
        <div className='m-4 text-center'>
            {/* code */}
            <div className = 'flex justify-center gap-4'>
                <Badge className="text-3xl rounded-lg py-1 px-3 bg-red-500 text-gray-100 rotate-8">C</Badge>
                <Badge className="text-3xl rounded-lg py-1 px-3 bg-green-700 text-gray-100 -rotate-5">S</Badge>
                <Badge className="text-3xl rounded-lg py-1 px-3 bg-blue-700 text-gray-100 rotate-7">I</Badge>
                <Badge className="text-3xl rounded-lg py-1 px-3 bg-sky-400 text-gray-100 -rotate-5">2</Badge>
                <Badge className="text-3xl rounded-lg py-1 px-3 bg-yellow-400 text-gray-100 rotate-4">0</Badge>
                <Badge className="text-3xl rounded-lg py-1 px-3 bg-gray-500 text-gray-100 -rotate-5">5</Badge>
            </div>
            {/* name */}
            <div className = 'mt-2'>
                <Badge size="lg" className="text-3xl rounded-lg py-1 px-3 bg-gray-800 text-gray-100">FRONT END SOFTWARE DEVELOPMENT</Badge>
            </div>
            {credential && (
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold">
                    <span className="flex items-center gap-1">
                        ROLE:
                        <span className="rounded-full bg-red-100 px-3 py-1 text-red-700">
                            {credential.role.toUpperCase()}
                        </span>
                    </span>
                    <span className="flex items-center gap-1">
                        NAME:
                        <span className="rounded-full bg-green-100 px-3 py-1 text-green-800">
                            {credential.name}
                        </span>
                    </span>
                    <span className="flex items-center gap-1">
                        EMAIL:
                        <span className="rounded-full bg-slate-100 px-3 py-1 font-normal text-slate-800">
                            {credential.email}
                        </span>
                    </span>
                </div>
            )}
        </div>
    )
}