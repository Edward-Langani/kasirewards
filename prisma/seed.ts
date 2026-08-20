import { PrismaClient, Role, ActivityStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
async function main() {
  const passwordHash = await bcrypt.hash('Admin123!change', 12);
  const admin = await prisma.user.upsert({ where:{email:'admin@kasirewards.local'}, update:{}, create:{email:'admin@kasirewards.local',firstName:'Kasi',passwordHash,role:Role.ADMIN,referralCode:'ADMIN01'} });
  const activities = [
    {title:'Consumer Survey',description:'Answer a short market-research survey. Demo activity — connect a real provider before launch.',category:'Surveys',rewardCents:500,estimatedMinutes:8,provider:'Demo',externalUrl:'https://example.com'},
    {title:'Brand Preference Study',description:'Share your preferences in a short research activity.',category:'Research',rewardCents:350,estimatedMinutes:5,provider:'Demo',externalUrl:'https://example.com'},
    {title:'Partner Offer',description:'A placeholder offer slot for a verified offer provider.',category:'Offers',rewardCents:1200,estimatedMinutes:12,provider:'Demo',externalUrl:'https://example.com'}
  ];
  for (const a of activities) await prisma.activity.create({data:{...a,status:ActivityStatus.ACTIVE}});
  console.log(`Seeded admin ${admin.email}`);
}
main().finally(()=>prisma.$disconnect());
