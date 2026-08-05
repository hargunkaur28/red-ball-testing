const Sport = require('../models/Sport');

async function seedSports() {
  const sportsData = [
    {
      name: 'Gym',
      slug: 'gym',
      hourlyPrice: 0,
      dayPrice: 100,
      oneMonthPrice: 1400,
      threeMonthPrice: 3500,
      sixMonthPrice: 6000,
      twelveMonthPrice: 10000,
      active: true,
    },
    {
      name: 'Pickleball',
      slug: 'pickleball',
      hourlyPrice: 1000,
      dayPrice: 1000,
      oneMonthPrice: 2500,
      threeMonthPrice: 6000,
      sixMonthPrice: 10000,
      twelveMonthPrice: 16000,
      active: true,
    },
    {
      name: 'Badminton',
      slug: 'badminton',
      hourlyPrice: 500,
      dayPrice: 500,
      oneMonthPrice: 2500,
      threeMonthPrice: 6000,
      sixMonthPrice: 10000,
      twelveMonthPrice: 16000,
      active: true,
    },
  ];

  console.log('🌱 Starting sports seeding...');
  
  for (const item of sportsData) {
    const existing = await Sport.findOne({ slug: item.slug });
    if (!existing) {
      await Sport.create(item);
      console.log(`✅ Seeded sport: ${item.name}`);
    } else {
      await Sport.updateOne({ slug: item.slug }, { $set: { name: item.name } });
      console.log(`✅ Updated sport name to: ${item.name}`);
    }
  }
  
  console.log('🌱 Sports seeding completed!');
}

module.exports = seedSports;
