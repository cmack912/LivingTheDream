import React, { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { getStyles } from "@/utils";
import NavLink from "../organism/NavLink";
import { PageComponentChild, Styles } from "@/types";

type CarouselItemProps = {
    item: PageComponentChild;
    childStyles: Styles | undefined;
};

const CarouselItem: React.FC<CarouselItemProps> = ({ item, childStyles }) => {
    const controls = useAnimation();
    const ref = React.useRef<HTMLDivElement>(null);
    
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    const inView = useInView(ref, {
        margin: isMobile ? "-50px 0px -50px 0px" : "-100px 0px -100px 0px",
        once: true
    });

    const [scrollProgress, setScrollProgress] = useState(() => {
        const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
        const maxScroll = isMobile ? 400 : 600;
        return Math.min(scrollY / maxScroll, 1);
    });

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = isMobile ? 400 : 600;
            const progress = Math.min(scrollY / maxScroll, 1);
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isMobile]);

    useEffect(() => {
        if (inView) {
            controls.start({ opacity: 1, x: 0 });
        } else {
            controls.start({ opacity: 0, x: 50 });
        }
    }, [inView, controls]);

    return (
        <div className={getStyles("wrapper", childStyles)}>
            {/* Image */}
            <motion.div
                className={getStyles("imageContainer", childStyles)}
                style={{
                    transform: `perspective(1000px) rotateX(${20 - scrollProgress * 20}deg)`,
                    boxShadow: `0 ${20 - scrollProgress * 15}px ${30 - scrollProgress * 20}px rgba(0, 0, 0, ${0.25 - scrollProgress * 0.15})`,
                    transformOrigin: "center bottom",
                    transition: "all 0.3s ease-out",
                }}
            >
                <Image
                    src={item.settings.carouselImage || ""}
                    width={800}
                    height={800}
                    alt={item.settings.title || "Default Title"}
                    className="rounded-lg w-full h-full object-cover"
                    priority
                />
            </motion.div>

            {/* Text */}
            <motion.div
                ref={ref}
                className={getStyles("textContainer", childStyles)}
                initial={{ opacity: 0, x: 50 }}
                animate={controls}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <h3 className={getStyles("title", childStyles)}>
                    {item.settings.title || "Default Title"}
                </h3>
                <p className={getStyles("description", childStyles)}>
                    {item.settings.description || "Default Description"}
                </p>
                {item.settings.path && (
                    <div className={getStyles("buttonContainer", childStyles)}>
                        <NavLink
                            href={item.settings.path}
                            disableMotion={true}
                            className={getStyles("button", childStyles)}
                            analytics={
                            {
                                eventLabel: item.settings.title || "Default Title",
                                eventCategory: "Carousel Interaction",
                                eventAction: "link_click",
                                eventValue: item.settings.path,
                            }
                        }
                    >
                            Learn More
                        </NavLink>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default CarouselItem;
