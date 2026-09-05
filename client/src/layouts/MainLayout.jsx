import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
export const MainLayout = ({ children }) => <div className="min-h-screen bg-[#faf9f6] text-[#142235]"><a href="#main-content" className="skip-link">Skip to main content</a><Navbar /><main id="main-content" tabIndex="-1">{children}</main><Footer /></div>;
