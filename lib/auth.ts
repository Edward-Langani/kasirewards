import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { db } from './db';
const secret = new TextEncoder().encode(process.env.AUTH_SECRET || 'dev-only-change-me');
const COOKIE='kr_session';
export async function createSession(userId:string){
  const token=await new SignJWT({sub:userId}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('7d').sign(secret);
  const jar=await cookies(); jar.set(COOKIE,token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:60*60*24*7});
}
export async function clearSession(){ const jar=await cookies(); jar.delete(COOKIE); }
export async function getCurrentUser(){
  try { const token=(await cookies()).get(COOKIE)?.value; if(!token) return null; const {payload}=await jwtVerify(token,secret); if(!payload.sub) return null; return db.user.findUnique({where:{id:payload.sub}}); } catch { return null; }
}
export async function requireUser(){ const u=await getCurrentUser(); if(!u) throw new Error('UNAUTHORIZED'); return u; }
export async function requireAdmin(){ const u=await requireUser(); if(u.role!=='ADMIN') throw new Error('FORBIDDEN'); return u; }
