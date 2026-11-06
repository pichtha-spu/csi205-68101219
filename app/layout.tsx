'use client'

import Header from "@/components/header";
import "./globals.css";
import Footer from "@/components/footer";
import Link from "next/link";
import {  Button, buttonStyles } from "@/components/tailgrids/core/button";
import { usePathname, useRouter } from "next/navigation";
import { fetchProduct, type Product } from "@/data/products";
import { createContext, useEffect, useRef, useState, useSyncExternalStore, Dispatch, SetStateAction } from "react";
import { Badge } from "@/components/tailgrids/core/badge";
import {
  canAccessPath,
  checkLogin,
  credentialChangeEvent,
  doLogout,
  getCredentialSnapshot,
  getServerCredentialSnapshot,
  parseCredential,
  subscribeToCredential,
} from "@/utils/login";




// กำหนด Type ของ Context เพื่อแก้ Error TypeScript
interface GlobalContextType {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  carts: Product[];
  setCarts: Dispatch<SetStateAction<Product[]>>;
}

export const globalDataContext = createContext<any>(null);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const pathname = usePathname();
  const router = useRouter();
  const handledInitialLoad = useRef(false);
  const credentialValue = useSyncExternalStore(
    subscribeToCredential,
    getCredentialSnapshot,
    getServerCredentialSnapshot,
  );
  const credential = parseCredential(credentialValue);
  const canAccess = (path: string) =>
    credential !== null && canAccessPath(credential.role, path);

  const [products, setProducts] = useState<Product[]>([]);
  const [carts, setCarts] = useState<Product[]>([]);

  useEffect(() => {
    if (pathname === "/login") return;

    if (!handledInitialLoad.current) {
      handledInitialLoad.current = true;
      const navigation = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming | undefined;

      if (navigation?.type === "reload") {
        localStorage.removeItem("credential");
        window.dispatchEvent(new Event(credentialChangeEvent));
        checkLogin(router, pathname);
        return;
      }
    }

    if (!credential) {
      checkLogin(router, pathname);
      return;
    }

    if (!canAccessPath(credential.role, pathname)) {
      router.replace("/");
    }
  }, [credentialValue, pathname, router]);

  useEffect(() => {
    fetchProduct()
      .then(setProducts)
      .catch((error) => {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      });
  }, [])


  useEffect(() => {
    console.log(products)
  }, [products])

  const handleLogout = () => {
    doLogout(router, "/login");
  }



  return (
    <globalDataContext.Provider
      value={{ products, setProducts, carts, setCarts }}>
      <html>
        <body>
          <Header />
          <nav className="flex gap-4 mt-4 p-4 justify-center">
          {/* //Home */}
            <Link href={"/"}
            className= {buttonStyles({
              appearance:pathname === "/" ? "fill" : "outline",
              variant: "primary",
              size: "sm"

            })}
            >
            Home
             </Link>
            {/* // Amination */}


            {canAccess("/animation") && (
              <Link href="/animation"
                className={buttonStyles({
                  appearance: pathname === "/animation" ? "fill" : "outline",
                  variant: "primary",
                  size: "sm"
                })}
              >
                Animation
              </Link>
            )}

            {/* // Calculate */}
            {canAccess("/calculator") && (
              <Link href="/calculator"
                className={buttonStyles({
                  appearance: pathname === "/calculator" ? "fill" : "outline",
                  variant: "primary",
                  size: "sm"
                })}
              >
                Calculator
              </Link>
            )}
              
              {/* todo */}
            {canAccess("/todos") && (
              <Link href="/todos"
                className={buttonStyles({
                  appearance: pathname === "/todos" ? "fill" : "outline",
                  variant: "primary",
                  size: "sm"
                })}
              >
                Todos
              </Link>
            )}

                {/* product */}

            {canAccess("/products") && (
              <Link href="/products"
                className={buttonStyles({
                  appearance: pathname === "/products" ? "fill" : "outline",
                  variant: "primary",
                  size: "sm"
                })}
              >
                Products({products.length})
              </Link>
            )}

            {canAccess("/carts") && (
              <div className="relative">
                {/* carts */}
                <Link href="/carts"
                  className={buttonStyles({
                    appearance: pathname === "/carts" ? "fill" : "outline",
                    variant: "primary",
                    size: "sm"
                  })}
              >
                Carts
                </Link>
                <Badge size={'sm'} className="absolute -top-2 -right-2 bg-red-500 text-white "
                >
                  {carts.length}
                </Badge>
              </div>
            )}

            {credential && (
              <Button
                appearance="outline"
                variant="danger"
                size="sm"
                className="ml-1"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}

              
          </nav>
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </globalDataContext.Provider>
  );
}