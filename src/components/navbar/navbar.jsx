import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { AppRoutesPaths } from "../routes/app_route";
import { FaPhone } from "react-icons/fa";

export const NavBar = ({ path }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [active, setActive] = useState("");

    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);

        if (path === "home") setActive("#home");
        if (path === "about") setActive("#about");
    }, [path]);

    const menuItems = [
        { label: "HOME", id: "#home" },
        { label: "ABOUT", id: "#about" },
    ];

    const handleClick = (id) => {
        setActive(id);
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsOpen(false);
        if (id === "#home") navigate(AppRoutesPaths.home);
        if (id === "#about") navigate(AppRoutesPaths.about);
    };

    return (
        <nav
            className={`w-full backdrop-blur-md bg-rd-black shadow-md sticky top-0 left-0 transition-transform duration-700 ease-in-out ${
                isVisible ? "translate-y-0" : "-translate-y-20"
            }`}
            style={{ zIndex: 100000 }}
        >
            <div>
                {/* Top Row */}
                <div className="flex items-center justify-between flex-wrap gap-4 bg-rd-black px-4">
                    <div className="flex items-center gap-6 py-2">
                        <img
                            src={logo}
                            alt="Logo"
                            onClick={() => navigate(AppRoutesPaths.home)}
                            className="w-30 h-10 object-contain cursor-pointer"
                        />
                        <div className="h-8 border-l border-rd-gold"></div>
                        <span className="text-xl md:text-2xl font-serif font-bold text-rd-champagne tracking-wide">
                            FRAGRANCE
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-rd-champagne">
                            <FaPhone className="w-5 h-5 text-rd-gold" />
                            <span className="text-sm">(+237) 678-566-292</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="hidden md:flex justify-center gap-8 items-center h-12 px-20 bg-rd-deepNavy">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleClick(item.id)}
                            className={`relative font-serif cursor-pointer text-rd-champagne hover:text-rd-gold transition px-2 pb-1 ${
                                active === item.id ? "border-b-2 border-rd-gold" : ""
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <div className="flex md:hidden justify-between items-center mt-2 px-4 py-2 bg-rd-deepNavy">
                    <button onClick={toggleMenu} className="text-rd-champagne">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {isOpen && (
                    <div className="md:hidden px-4 pt-2 pb-4 space-y-2 shadow rounded mt-2 bg-rd-deepNavy">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleClick(item.id)}
                                className={`block w-full text-left font-serif text-rd-champagne hover:text-rd-gold transition ${
                                    active === item.id ? "border-b-2 border-rd-gold" : ""
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};
