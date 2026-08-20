import './globals.css';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
export const metadata={title:'KasiRewards — Do More. Earn More. Get Rewarded.',description:'A South African rewards platform MVP.'};
export default async function RootLayout({children}:{children:React.ReactNode}){
 const user=await getCurrentUser();
 return <><header className="nav"><div className="navin"><Link href="/" className="brand">Kasi<span>Rewards</span></Link><nav className="navlinks">{user?<><Link href="/dashboard">Dashboard</Link><Link href="/earn">Earn</Link><Link href="/wallet">Wallet</Link>{user.role==='ADMIN'&&<Link href="/admin">Admin</Link>}<a href="/api/auth/logout" className="btn secondary">Log out</a></>:<><Link href="/login">Log in</Link><Link href="/register" className="btn">Join free</Link></>}</nav></div></header>{children}<footer className="footer"><div className="container">© 2026 KasiRewards · South Africa · <a href="/terms">Terms</a> · <a href="/privacy">Privacy</a> · Rewards are subject to eligibility, verification and partner terms.</div></footer></>}
