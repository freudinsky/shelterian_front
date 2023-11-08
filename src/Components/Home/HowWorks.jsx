import React from "react";
import { Card, CardFooter } from "@nextui-org/react";

function HowWorks() {
	return (
		<div>
			<h1 className="text-3xl font-bold my-8 pl-10">Was ist Shelterian?</h1>
			<div className="flex gap-4 justify-center">
				<div className="w-1/2 flex justify-center">
					<img
						src="https://res.cloudinary.com/dcbuuobgt/image/upload/v1699440419/Shelterian_concept_udscv0.webp"
						alt="Shelterian als zentrale Datenbank für Tierheime"
						className="border-1 border-solid border-stone-300 shadow-lg rounded-3xl"
					/>
				</div>
				<div className="w-1/2 flex flex-col justify-center items-center pl-10">
					<div className="flex flex-col justify-around">
						<div className="w-4/5 my-4">
							<h2 className="text-xl font-semibold my-2">
								Die Plattform für Tierfreunde & Tierheime
							</h2>
							<p className="text-base list-disc">
								Shelterian hat es sich zur Mission gemacht, Adoptionswilligen
								die Suche nach einem vierbeinigen Familienmitglied zu
								vereinfachen und die Verwaltung für die Tierheime möglichst
								aufwandsarm zu gestalten, damit sie sich auf das wirklich
								wichtige konzentrieren können.
							</p>
						</div>
						<div className="w-fit my-4">
							<h2 className="text-xl font-semibold my-2">
								Vorteile von Shelterian{" "}
							</h2>
							<ul className="text-base list-disc pl-8">
								<li>Zentralisierte Datenbank für alle Tierheime</li>
								<li>Komfortable Suche nach einem Vierbeiner</li>
								<li>Einfache Verwaltung für Tierheime</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HowWorks;
