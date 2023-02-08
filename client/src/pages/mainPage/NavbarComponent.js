import '../../App.css';
import { UserCircle } from 'phosphor-react';
import { useContext, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import Logo from './LogoComponent';

const Navbar = () => {
	const { user, isAuth, setIsAuth } = useContext(UserContext);
	const msg = {
		msg1: 'Za ponovno prijavo se morate najprej odjaviti',
		msg2: 'Za registracijo se morate najprej odjaviti',
	};

	return (
		<div className='navbar'>
			<div className='bar'>
				<Logo />
				<div>
					<Link to='/' className='links'>
						Domov
					</Link>
				</div>
				<div>
					<Link to='/shop' className='links'>
						Trgovina
					</Link>
				</div>
				<div>
					<Link
						to='/auth'
						state={{ loggingMode: 'signup', msg: isAuth ? msg.msg2 : '' }}
						className='links'>
						Registracija
					</Link>
				</div>
				<div>
					<Link
						to='/auth'
						state={{ loggingMode: 'signin', msg: isAuth ? msg.msg1 : '' }}
						className='links'>
						{isAuth ? (
							<>
								<UserCircle size={28} style={{ marginRight: '4px' }} />
								<label style={{ marginRight: '12px' }}>{user.uporabnisko_ime}</label>
								<label
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setIsAuth(false);
									}}
									style={{ textDecoration: 'underline' }}>
									Odjava
								</label>
							</>
						) : (
							'Prijava'
						)}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
