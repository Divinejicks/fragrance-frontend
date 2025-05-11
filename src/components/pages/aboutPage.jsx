import { useEffect, useRef } from "react";
import { NavBar } from "../navbar/navbar";
import Footer from "../footer/footer";

export const AboutPage = () => {
    const formRef = useRef(null);

    useEffect(() => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [])

    return (
        <div ref={formRef}>
            <NavBar path="about" />
            <h1 className="text-4xl font-bold">About Us</h1>
            <p className="mt-4 text-lg">This is the about page of our application.</p>
            <Footer />
        </div>
    );
}