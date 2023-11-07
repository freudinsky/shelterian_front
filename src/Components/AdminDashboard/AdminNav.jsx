import { Button, Divider } from '@nextui-org/react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SettingsIcon from './SettingsIcon';

function AdminNav() {
	const {pathname} = useLocation()

  return (
		<>
			<Divider className="mb-2" />
			<div className="flex justify-between items-center w-full">
				<ul className="flex gap-3 justify-between items-center ">
					<li>
						<Link to="myentries">
							<Button
								className="font-semibold text-base"
								variant={
									pathname === "/dashboard/myentries" ? "solid" : "light"
								}
								radius="full"
							>
								Meine Einträge
							</Button>
						</Link>
					</li>
					<li>
						<Link to="new">
							<Button
								className="font-semibold text-base"
								variant={pathname === "/dashboard/new" ? "solid" : "light"}
								radius="full"
							>
								Neuer Eintrag
							</Button>
						</Link>
					</li>
				</ul>

				<Link to="account" className="justify-self-right">
					<Button
						className={
							pathname === "/dashboard/account"
								? "font-semibol bg-neutral-500 text-white"
								: "font-semibol bg-rose-800 text-white"
						}
						variant="solid"
						radius="full"
						startContent={<SettingsIcon />}
					>
						Account
					</Button>
				</Link>
			</div>
			{/* <Divider className="mt-2 mb-4" /> */}
		</>
	);
}

export default AdminNav