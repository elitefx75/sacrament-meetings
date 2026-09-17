import type { ReactNode } from "react";
import NavLinks from "../../components/NavLinks";

export default function MeetingsLayout({ children }: { children: ReactNode }) {
    return <div className="space-y-8"><NavLinks />{children}</div>;
}