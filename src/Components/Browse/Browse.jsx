import {
	Spinner,
	CheckboxGroup,
	Checkbox,
	Divider,
	Input,
} from "@nextui-org/react";
import { Slider } from "@nextui-org/slider";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import AnimCard from "../AnimCard";

function Browse() {
  const [cities, setCities] = useState([]);
	const [animals, setAnimals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [filter, setFilter] = useState([]);
	const [city, setCity] = useState("");
	const [distance, setDistance] = useState("5");
	const [filterQuery, setFilterQuery] = useSearchParams();
	const { type } = useParams();
  
  useEffect(() => {
    const cityFetch = async () => {
      try {
        const res = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/cities", {"country": "germany"}
        );
        if(res.status === 200 && res.data){
          setCities(res.data.data)
        }
      } catch (error) {
        return
      }
    }
    cityFetch()
  },[]);

	useEffect(() => {
		const defaultCharacteristics = {
      chld: false,
			lgplc: false,
			catfr: false,
			exp: false,
			dogfr: false,
		};
		const characteristicObject = filter.reduce((obj, key) => {
      if (defaultCharacteristics.hasOwnProperty(key)) {
        obj[key] = true;
			}
			return obj;
		}, defaultCharacteristics);
		const filterString = Object.entries(characteristicObject)
			.filter(([key, value]) => value === true)
			.map(([key, value]) => `${key}=${value}`)
			.join("&");

		const location = city ? `city=${city}&dist=${distance}&` : "";
		setFilterQuery(`${location}${filterString}`);
	}, [distance, city, filter]);

	useEffect(() => {
		const animalFetch = async () => {
			setIsLoading(true);
			try {
				const res = await axios.get(
					`${
						import.meta.env.VITE_API_URL
					}data/${type}/filter?${filterQuery.toString()}`,
					{ withCredentials: true }
				);
				if (res.status === 200 && res.data) {
					setAnimals(res.data);
					setIsLoading(false);
				}
			} catch (error) {
				toast.error(error);
			}
		};
		animalFetch();
	}, [filterQuery]);

	return (
		<>
			<div className="flex gap-4 justify-between w-full">
				<div className="w-1/5 max-h-screen min-h-fit p-4 bg-rose-950 rounded-2xl">
					<Input
						// aria-label="Static Actions"
						className="dark mt-2"
						color="danger"
						label="Ort"
						placeholder="Suchort eingeben"
						selectedKey={city}
						onChange={(e) => setCity(e.target.value)}
					>
						{/* {cities.map((cty) => <AutocompleteItem key={cty}>{cty}</AutocompleteItem>)} */}
					</Input>
					<Slider
						isDisabled={!city}
						className="slidi dark mt-2 px-1 w-full mx-auto"
						color="danger"
						radius="lg"
						step={5}
						minValue={5}
						maxValue={600}
						defaultValue={5}
						label="Entfernung"
						onChangeEnd={setDistance}
					/>
					<Divider className="dark my-4" />
					<CheckboxGroup
						label="Eigenschaften"
						color="danger"
						value={filter}
						onChange={setFilter}
						className="dark my-4"
					>
						<Checkbox className="my-0.5" value="catfr">
							Verträgt sich mit {type === "cats" ? "anderen" : ""} Katzen
						</Checkbox>
						<Checkbox className="my-0.5 " value="dogfr">
							Verträgt sich mit {type === "dogs" ? "anderen" : ""} Hunden
						</Checkbox>
						<Checkbox className="my-0.5" value="chld">
							Verträgt sich mit Kindern
						</Checkbox>
						{type === "dogs" ? (
							<>
								<Checkbox className="my-0.5" value="lgplc">
									Haus & Garten
								</Checkbox>
								<Checkbox className="my-0.5" value="exp">
									Erfahrener Hundehalter
								</Checkbox>
							</>
						) : (
							""
						)}
					</CheckboxGroup>
					{/* <Button
						color="danger"
						className="rounded-full dark mb-2 w-full"
						onClick={handleFilter}
					>
						Filtern
					</Button> */}
				</div>
				<div className="w-4/5 border-solid border-1 flex flex-col border-neutral-300 rounded-2xl p-6">
					<h1 className="text-2xl font-bold">
						{type === "dogs" ? "Hunde" : type === "cats" ? "Katzen" : ""}
					</h1>
					{!isLoading && animals.length > 0 ? (
						<div className="flex justify-start flex-wrap gap-x-4 gap-y-0 items-center w-fit">
							{animals.map((dog) => (
								<AnimCard key={dog._id} animal={dog} type={"dog"} />
							))}
						</div>
					) : !isLoading ? (
						<div>
							<p className="text-lg font-semibold text-center p-20">
								Keine Ergebnisse zu den gesuchten Kriterien.
							</p>
						</div>
					) : (
						<Spinner />
					)}
				</div>
			</div>
		</>
	);
}

export default Browse;
