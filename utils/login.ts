import type { useRouter } from "next/navigation";
import type { Credential } from "@/data/credential";
import { logout } from "@/data/credential";

type Router = ReturnType<typeof useRouter>

export const credentialChangeEvent = "credential-change";

const rolePaths: Record<string, string[]> = {
    admin: ["/", "/animation", "/calculator", "/todos", "/products", "/carts"],
    user: ["/", "/animation", "/calculator", "/todos"],
    manager: ["/", "/products", "/carts"],
};

export function canAccessPath(role: string, pathname: string) {
    return rolePaths[role.toLowerCase()]?.includes(pathname) ?? false;
}

export function subscribeToCredential(onChange: () => void) {
    window.addEventListener("storage", onChange);
    window.addEventListener(credentialChangeEvent, onChange);
    return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener(credentialChangeEvent, onChange);
    };
}

export function getCredentialSnapshot() {
    return localStorage.getItem("credential");
}

export function getServerCredentialSnapshot() {
    return null;
}

export function parseCredential(value: string | null): Credential | null {
    if (!value) return null;

    try {
        const parsed: unknown = JSON.parse(value);
        if (
            typeof parsed === "object" &&
            parsed !== null &&
            "token" in parsed &&
            typeof parsed.token === "string" &&
            "email" in parsed &&
            typeof parsed.email === "string" &&
            "name" in parsed &&
            typeof parsed.name === "string" &&
            "role" in parsed &&
            typeof parsed.role === "string"
        ) {
            return {
                token: parsed.token,
                email: parsed.email,
                name: parsed.name,
                role: parsed.role,
            };
        }
    } catch (error) {
        console.error("Could not read saved credential.", error);
    }

    return null;
}

export const checkLogin = (router: Router,returnPath: string) => {
    if (parseCredential(localStorage.getItem("credential"))) {
        return
    }

    localStorage.removeItem("credential");
    localStorage.setItem("returnPath", returnPath)
    router.replace("/login")
}

export const doLogout = (router: Router, returnPath:string) => {
    const credentialString = localStorage.getItem('credential')
    if (credentialString !== null) {
        const{token}: Credential = JSON.parse(credentialString)

        logout(token)
        .then(() => {})
        .catch(() => {})
        .finally(() => {
            localStorage.removeItem('credential')
            window.dispatchEvent(new Event(credentialChangeEvent))
            router.replace(returnPath)
            router.refresh()
        })

    }else{
        router.replace(returnPath)
        router.refresh()
    }
}
