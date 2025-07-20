import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import HowItWorks from "../components/Home/HowItWorks";
import Testimonials from "../components/Home/Testimonials";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import { useEffect } from "react";

const LandingPage = () => {
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const target = document.querySelector(hash);
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth' });
                }, 0); // wait for DOM to render
            }
        }
    }, []);
    return (
        <div className="font-sans text-gray-800">
            <Navbar />
            <Hero />
            <div id="features"><Features /></div>
            <div id="about"><HowItWorks /></div>
            <Testimonials />
            <Footer />
        </div>
    );
};

export default LandingPage;
