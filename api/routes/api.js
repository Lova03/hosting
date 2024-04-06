const apiRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const Promocode = require('../models/promocode');

apiRouter.get('/products', (req, res, next) => {
  const minecraftProducts = [
    {
      _id: 'mc1',
      serviceType: 'Minecraft Hosting',
      planName: 'Coal',
      pricePerMonth: 5.99,
      cpu: '1 vCPU',
      ram: '2GB',
      storage: '10GB SSD',
      maxPlayers: 20,
      defaultTypeValue: 'Vanilla',
      image: 'https://content.something.host/plans/minecraft_coal.png',
    },
    {
      _id: 'mc2',
      serviceType: 'Minecraft Hosting',
      planName: 'Iron',
      pricePerMonth: 9.99,
      cpu: '2 vCPUs',
      ram: '4GB',
      storage: '20GB SSD',
      maxPlayers: 40,
      defaultTypeValue: 'Vanilla',
      image: 'https://content.something.host/plans/minecraft_iron.png',
    },
    {
      _id: 'mc3',
      serviceType: 'Minecraft Hosting',
      planName: 'Lapis',
      pricePerMonth: 14.99,
      cpu: '3 vCPUs',
      ram: '6GB',
      storage: '30GB SSD',
      maxPlayers: 60,
      defaultTypeValue: 'Vanilla',
      image: 'https://content.something.host/plans/minecraft_lapis.png',
    },
    {
      _id: 'mc4',
      serviceType: 'Minecraft Hosting',
      planName: 'Gold',
      pricePerMonth: 19.99,
      cpu: '4 vCPUs',
      ram: '8GB',
      storage: '40GB SSD',
      maxPlayers: 80,
      defaultTypeValue: 'Vanilla',
      image: 'https://content.something.host/plans/minecraft_gold.png',
    },
    {
      _id: 'mc5',
      serviceType: 'Minecraft Hosting',
      planName: 'Diamond',
      pricePerMonth: 24.99,
      cpu: '6 vCPUs',
      ram: '12GB',
      storage: '60GB SSD',
      maxPlayers: 100,
      defaultTypeValue: 'Vanilla',
      image: 'https://content.something.host/plans/minecraft_diamond.png',
    },
    {
      _id: 'mc6',
      serviceType: 'Minecraft Hosting',
      planName: 'God Tier',
      pricePerMonth: 59.99,
      cpu: '16 vCPUs',
      ram: '30GB',
      storage: '150GB SSD',
      maxPlayers: 500,
      defaultTypeValue: 'Vanilla',
      image:
        'https://preview.redd.it/okay-minecraft-gods-and-goddess-is-it-technically-possibly-v0-63oc9rykpndb1.png?auto=webp&s=1279c19a4668b16b8035b9b1b100cb3540d519c4',
    },
  ];
  const discordBotProducts = [
    {
      _id: 'db1',
      serviceType: 'Discord Bot Hosting',
      planName: 'Basic',
      pricePerMonth: 3.49,
      cpu: '1 vCPU',
      ram: '1GB',
      storage: '5GB SSD',
      defaultTypeValue: 'Node.js',
      image: 'https://content.something.host/plans/2.png',
    },
    {
      _id: 'db2',
      serviceType: 'Discord Bot Hosting',
      planName: 'Standard',
      pricePerMonth: 5.99,
      cpu: '2 vCPUs',
      ram: '2GB',
      storage: '10GB SSD',
      defaultTypeValue: 'Node.js',
      image: 'https://content.something.host/plans/3.png',
    },
    {
      _id: 'db3',
      serviceType: 'Discord Bot Hosting',
      planName: 'Advanced',
      pricePerMonth: 7.99,
      cpu: '3 vCPUs',
      ram: '4GB',
      storage: '15GB SSD',
      defaultTypeValue: 'Node.js',
      image: 'https://content.something.host/plans/4.png',
    },
  ];
  const vpsProducts = [
    {
      _id: 'vps1',
      serviceType: 'VPS Hosting',
      planName: 'Basic',
      pricePerMonth: 9.99,
      cpu: '2 vCPUs',
      ram: '4GB',
      storage: '20GB SSD',
      defaultTypeValue: 'Ubuntu',
      bandwidth: '1TB',
      image: 'https://content.something.host/plans/server.png',
    },
    {
      _id: 'vps2',
      serviceType: 'VPS Hosting',
      planName: 'Pro',
      pricePerMonth: 19.99,
      cpu: '4 vCPUs',
      ram: '8GB',
      storage: '40GB SSD',
      defaultTypeValue: 'Ubuntu',
      bandwidth: '2TB',
      image: 'https://content.something.host/plans/server.png',
    },
    {
      _id: 'vps3',
      serviceType: 'VPS Hosting',
      planName: 'Enterprise',
      pricePerMonth: 29.99,
      cpu: '6 vCPUs',
      ram: '16GB',
      storage: '60GB SSD',
      defaultTypeValue: 'Ubuntu',
      bandwidth: '3TB',
      image: 'https://content.something.host/plans/server.png',
    },
  ];

  res.status(200).json({
    success: true,
    products: [...minecraftProducts, ...discordBotProducts, ...vpsProducts],
  });
});

apiRouter.post('/validate-promocode', async (req, res) => {
  const { code } = req.body;

  try {
    const promocode = await Promocode.findOne({ code: code.toUpperCase(), isActive: true });
    // if (!promocode || promocode.expiresAt < new Date()) {
    //   return res.status(404).json({ message: 'Promocode is invalid or expired.' });
    // }

    // res.json({ message: 'Promocode is valid.', discount: promocode.discount });
    res.json({ message: 'Promocode is valid.', discount: 10 });
  } catch (error) {
    res.status(500).json({ message: 'Error validating promocode.' });
  }
});

module.exports = apiRouter;
