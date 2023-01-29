import axios from 'axios';
import { Pencil, Password, FloppyDisk, ClockCounterClockwise, SignOut } from 'phosphor-react';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import NotificationCard from './NotificationCardComponent';
import UrediProfil from './UrediProfilC';
import Pregled from './PregledC';
import PodatkiOOsebi from './PodatkiOOsebiC';

const Profile = () => {
	const PORT = 3005; // !!!
	const { user, setUser, setIsAuth } = useContext(UserContext);

	const [vloga, setVloga] = useState(null);
	const [msg, setMsg] = useState('');
	const [stanjeAdmin, setStanjeAdmin] = useState(0);
	const [prejsnjeStanjeAdmin, setPrejsnjeStanjeAdmin] = useState(0);
	const [tabela, setTabela] = useState(null);
	const [filterUporabniki, setFilterUporabniki] = useState(-1);
	const [filterZaposleni, setFilterZaposleni] = useState(-1);
	// TODO: ime je link in lahko si ogledamo vse podatke ki so shranjeni v bazi o osebah
	const [oseba, setOseba] = useState(null);

	// TODO: na domaci strani naredi okno ki se pojavi ob izbrisu profila
	// TODO: PREVERI CE JE VNOS PRAVILEN (int, date ...)
	// TODO: ne dela ce refreshamo na profile page in gremo nazaj na prijavo (isAuth se ponastavi, ostalo pa ne)
	// TODO: ne dela ce refreshamo - prikaze napacne podatke
	// ce vnesemo nove podatke v prazno polje in nato pritisnemo Ponastavi, se ne izbriše vsebina
	useEffect(() => {
		const pridobiVlogo = async () => {
			try {
				let response = await axios.get(`http://localhost:${PORT}/api/login/vloga`, {
					params: {
						uporabnisko_ime: user.uporabnisko_ime,
					},
				});
				setVloga(parseInt(response.data));
			} catch (error) {
				console.log(error);
			}
		};
		pridobiVlogo();
	}, [user.uporabnisko_ime]);

	if (vloga === null) {
		// pridobivanje vloge profila
		return <>Nalaganje profila ...</>;
	} else if (parseInt(vloga) === 0) {
		// admin
		if (parseInt(stanjeAdmin) === 0) {
			return (
				<div>
					<button
						onClick={(e) => {
							e.preventDefault();
							setStanjeAdmin(1);
						}}>
						Profil
					</button>
					<hr />
					<button
						onClick={(e) => {
							e.preventDefault();
							setStanjeAdmin(2);
						}}>
						Pregled uporabnikov
					</button>
					<button
						onClick={(e) => {
							e.preventDefault();
							setStanjeAdmin(3);
						}}>
						Pregled oseb
					</button>
					<hr />
					<button
						onClick={(e) => {
							e.preventDefault();
							setStanjeAdmin(4);
						}}>
						Dodajanje uporabnikov
					</button>
					<button
						onClick={(e) => {
							e.preventDefault();
							setStanjeAdmin(5);
						}}>
						Dodajanje oseb
					</button>
					<hr />
					<button
						onClick={(e) => {
							e.preventDefault();
							setStanjeAdmin(6);
						}}>
						Pregled izdelkov/računov
					</button>
					<hr />
					<button
						onClick={(e) => {
							e.preventDefault();
							setStanjeAdmin(7);
						}}>
						Pregled naročil
					</button>
					<button
						onClick={(e) => {
							e.preventDefault();
							setStanjeAdmin(8);
						}}>
						Upravljanje s podatkovno bazo (geslo)
					</button>
					<hr />
					<button
						onClick={(e) => {
							e.preventDefault();
							setIsAuth(false);
						}}>
						Odjava <SignOut size={22} />
					</button>
				</div>
			);
		} else if (parseInt(stanjeAdmin) === 1) {
			// profil admin
			return (
				<>
					<NotificationCard />
					<UrediProfil vloga={vloga} setStanjeAdmin={setStanjeAdmin} />
				</>
			);
		} else if (parseInt(stanjeAdmin) === 2) {
			// pregled uporabnikov
			const pridobiInfoOUporabnikih = async () => {
				try {
					let r = await axios.get(`http://localhost:${PORT}/api/admin/uporabniki`);
					setTabela(r.data);
				} catch (error) {
					console.log('Prišlo je do napake');
				}
			};
			if (tabela === null) pridobiInfoOUporabnikih();
			return (
				<Pregled
					props={{
						naslov: 'Pregled uporabnikov',
						naslovnaVrstica: ['Uporabniško ime', 'Geslo', 'Vloga', 'Omogocen', 'Spremeni'],
						tabela: tabela,
						setTabela: setTabela,
						filter: filterUporabniki,
						setFilter: setFilterUporabniki,
						opcije: [
							{ ime: 'Vsi', vrednost: -1 },
							{ ime: 'Administratorji', vrednost: 0 },
							{ ime: 'Računovodje', vrednost: 3 },
							{ ime: 'Zaposleni', vrednost: 1 },
							{ ime: 'Stranke', vrednost: 2 },
						],
						setPrejsnjeStanjeAdmin: setPrejsnjeStanjeAdmin,
						stanjeAdmin: stanjeAdmin,
						setStanjeAdmin: setStanjeAdmin,
						setOseba: setOseba,
					}}
				/>
			);
		} else if (parseInt(stanjeAdmin) === 3) {
			// pregled oseb
			const pridobiInfoOOsebah = async () => {
				try {
					let r = await axios.get(`http://localhost:${PORT}/api/admin/osebe`);
					setTabela(r.data);
				} catch (error) {
					console.log('Prišlo je do napake');
				}
			};
			if (tabela === null) pridobiInfoOOsebah();
			return (
				<Pregled
					props={{
						naslov: 'Pregled oseb',
						naslovnaVrstica: ['ID', 'Uporabniško ime', 'Elektronski naslov', 'Ime', 'Priimek'],
						tabela: tabela,
						setTabela: setTabela,
						filter: filterUporabniki,
						setFilter: setFilterUporabniki,
						opcije: null,
						setPrejsnjeStanjeAdmin: setPrejsnjeStanjeAdmin,
						stanjeAdmin: stanjeAdmin,
						setStanjeAdmin: setStanjeAdmin,
						setOseba: setOseba,
					}}
				/>
			);
		} else if (parseInt(stanjeAdmin) === 4) {
			return (
				<>
					<h2>Pregled strank</h2>
					<button
						onClick={(e) => {
							e.preventDefault();
							setStanjeAdmin(0);
						}}>
						Nazaj
					</button>
				</>
			);
		} else if (parseInt(stanjeAdmin) === 5) {
			return (
				<>
					<h2>Dodajanje uporabnikov</h2>
					<button
						onClick={(e) => {
							e.preventDefault();
							setStanjeAdmin(0);
						}}>
						Nazaj
					</button>
				</>
			);
		} else if (parseInt(stanjeAdmin) === 6) {
			return (
				<>
					<h2>Dodajanje zaposlenih</h2>
					<button
						onClick={(e) => {
							e.preventDefault();
							setStanjeAdmin(0);
						}}>
						Nazaj
					</button>
				</>
			);
		} else if (parseInt(stanjeAdmin) === 7) {
			return (
				<>
					<h2>Dodajanje strank</h2>
					<button
						onClick={(e) => {
							e.preventDefault();
							setStanjeAdmin(0);
						}}>
						Nazaj
					</button>
				</>
			);
		} else if (parseInt(stanjeAdmin) === 8) {
			return (
				<>
					<h2>Pregled izdelkov</h2>
					<button
						onClick={(e) => {
							e.preventDefault();
							setStanjeAdmin(0);
						}}>
						Nazaj
					</button>
				</>
			);
		} else if (parseInt(stanjeAdmin) === 9) {
			return (
				<>
					<h2>Pregled računov</h2>
					<button
						onClick={(e) => {
							e.preventDefault();
							setStanjeAdmin(0);
						}}>
						Nazaj
					</button>
				</>
			);
		} else if (parseInt(stanjeAdmin) === 10) {
			return (
				<>
					<h2>Pregled naročil</h2>
					<button
						onClick={(e) => {
							e.preventDefault();
							setStanjeAdmin(0);
						}}>
						Nazaj
					</button>
				</>
			);
		} else if (parseInt(stanjeAdmin) === 11) {
			return (
				<>
					<h2>Upravljanje s podatkovno bazo (geslo)</h2>
					<button
						onClick={(e) => {
							e.preventDefault();
							setStanjeAdmin(0);
						}}>
						Nazaj
					</button>
				</>
			);
		} else if (parseInt(stanjeAdmin) === 12) {
			// prikazi osebo
			return (
				<PodatkiOOsebi
					oseba={oseba}
					prejsnjeStanjeAdmin={prejsnjeStanjeAdmin}
					setStanjeAdmin={setStanjeAdmin}
				/>
			);
		}
	} else if (parseInt(vloga) === 2) {
		// stranka
		return (
			<>
				<NotificationCard />
				<UrediProfil uporabnisko_ime={user.uporabnisko_ime} vloga={vloga} />
			</>
		);
	} else if (parseInt(vloga) === 1) {
		<>Profil zaposlenega</>;
	} else if (parseInt(vloga) === 3) {
		<>Profil racunovodje</>;
	} else {
		// napacna vloga (profilu dodamo vlogo stranke)
		const posodobiVlogo = async () => {
			let res;
			try {
				res = await axios.post(`http://localhost:${PORT}/api/login/vloga`, {
					uporabnisko_ime: user.uporabnisko_ime,
				});
			} catch (error) {
				res.data = 'Prišlo je do napake';
			}
			setVloga(2);
			setMsg(res.data);
		};

		posodobiVlogo();

		return (
			<>
				<div>Napaka pri prijavi (napačna vloga uporabnika)</div>
				<div>{msg}</div>
			</>
		);
	}
};

export default Profile;