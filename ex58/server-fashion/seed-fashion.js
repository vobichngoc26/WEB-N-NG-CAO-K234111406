/**
 * Exercise 58 - Seed Fashion collection
 * 3 Styles, each 3-5 fashions
 * Run: node seed-fashion.js
 */
const { MongoClient, ObjectId } = require('mongodb');

const client = new MongoClient('mongodb://127.0.0.1:27017');

const fashions = [
  // STREET STYLE - 4 items
  { style: 'Street Style', title: "Phil Oh's Best Street Style Photos From Fall 2023 Paris", details: '<p>Street style photography from Paris Fashion Week.</p>', thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', creationDate: new Date('2024-01-15') },
  { style: 'Street Style', title: "Phil Oh's Best Street Style From Fall 2023 Milan", details: '<p>Street style from Milan.</p>', thumbnail: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=300&fit=crop', creationDate: new Date('2024-01-14') },
  { style: 'Street Style', title: "Vivienne Westwood's Burmanne Collection in London", details: '<p>London street style highlights.</p>', thumbnail: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=300&fit=crop', creationDate: new Date('2024-01-13') },
  { style: 'Street Style', title: 'Best Dressed at New York Fashion Week', details: '<p>NYFW street style.</p>', thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop', creationDate: new Date('2024-01-12') },
  // TRENDS - 4 items
  { style: 'Trends', title: 'Fall 2024 Color Trends', details: '<p>Discover the top color trends for fall.</p>', thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop', creationDate: new Date('2024-01-11') },
  { style: 'Trends', title: 'Minimalist Fashion 2024', details: '<p>Less is more this season.</p>', thumbnail: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop', creationDate: new Date('2024-01-10') },
  { style: 'Trends', title: 'Oversized Silhouettes', details: '<p>Oversized fits are everywhere.</p>', thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop', creationDate: new Date('2024-01-09') },
  { style: 'Trends', title: 'Sustainable Fashion Picks', details: '<p>Eco-friendly fashion choices.</p>', thumbnail: 'https://images.unsplash.com/photo-1558769132-cb1aea2c1f54?w=400&h=300&fit=crop', creationDate: new Date('2024-01-08') },
  // CLASSIC - 3 items
  { style: 'Classic', title: 'Timeless Elegance: Classic Pieces', details: '<p>Wardrobe essentials that never go out of style.</p>', thumbnail: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=300&fit=crop', creationDate: new Date('2024-01-07') },
  { style: 'Classic', title: 'Little Black Dress Reinvented', details: '<p>The LBD gets a modern twist.</p>', thumbnail: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop', creationDate: new Date('2024-01-06') },
  { style: 'Classic', title: 'Tailored Blazers for 2024', details: '<p>Structured blazers are back.</p>', thumbnail: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop', creationDate: new Date('2024-01-05') }
];

async function seed() {
  try {
    await client.connect();
    const db = client.db('FashionData');
    const coll = db.collection('Fashion');
    await coll.deleteMany({});
    await coll.insertMany(fashions);
    console.log('Fashion seeded:', fashions.length, 'documents');
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
