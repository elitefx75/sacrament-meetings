import type { ReactNode } from "react";
import NavLinks from "../../components/NavLinks";

export default function MeetingsLayout({ children }: { children: ReactNode }) {
    return <main className="mx-auto w-[min(100%-2rem,60rem)] space-y-8 py-10 sm:py-14"><NavLinks />{children}</main>;
}