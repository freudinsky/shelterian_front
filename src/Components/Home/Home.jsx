import React from "react";
import HeroSection from "./HeroSection";
import HowWorks from "./HowWorks";
import Showcase from "./Showcase";
import {Divider} from "@nextui-org/react"

function Home() {
	return (
		<>
			<HeroSection />
			<Divider className="mb-4 mt-0" />
			<Showcase />
			<Divider className="my-4" />
			<HowWorks />
		</>
	);
}

export default Home;
