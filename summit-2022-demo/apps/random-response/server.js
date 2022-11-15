const fastify = require("fastify")({ logger: false });

// Declare a route
fastify.get("/health", async (request, reply) => {
  return { success: true };
});

fastify.get("/feedback", async (request, reply) => {
  // Random delay
  await new Promise((r) => setTimeout(r, random(500)));
  let data = [
    {
      flight_number: "KA812",
      flight_date: "2022-09-25",
      sentiment: "negative",
      text: "My meal was cold",
      author: {
        name: "Bob Corwin",
        street: "9964 Ward Passage",
        city: "North Meghanfurt",
        zip_code: "36061",
        country: "USA",
      },
    },
    {
      flight_number: "KA001",
      flight_date: "2022-09-24",
      sentiment: "neutral",
      text: "We departed late, again. Drinks vouchers on board as a sorry helped though!",
      author: {
        name: "Bob Schamberger",
        street: "9331 Feest Mount",
        city: "Jeanieville",
        zip_code: "64268",
        country: "USA",
      },
    },
    {
      flight_number: "KA427",
      flight_date: "2022-09-19",
      sentiment: "positive",
      text: "Wonderful service! I was travelling with my baby for the first time and your staff made me feel at ease.",
      author: {
        name: "Mrs. Rudolph Lind",
        street: "255 Schulist Bridge",
        city: "Wisozkburgh",
        zip_code: "73763",
        country: "USA",
      },
    },
    {
      flight_number: "KA007",
      flight_date: "2022-09-17",
      sentiment: "positive",
      text: "Thank you to Charlie in the main cabin who went above and beyond when I realised I hadn't\nsubmitted my dietary requirements on time. They found me something to eat and made me feel\nlike it wasn't an issue at all.",
      author: {
        name: "Virginia Rolfson",
        street: "30796 Haylee Isle",
        city: "Hoytton",
        zip_code: "47239",
        country: "USA",
      },
    },
  ];

  if (request.query.sentiment) {
    data = data.filter((f) => f.sentiment == request.query.sentiment);
  }

  return data;
});

fastify.get("/commercial", async (request, reply) => {
  // Random delay
  await new Promise((r) => setTimeout(r, random(500)));
  return [
    {
      waybill_number: "02dKD29j0303DSM",
      customs_status: {
        status_code: "CLEARED",
        destination_airport: "MIA",
        origin_airport: "LHR",
        updated_at: "2022-09-23:23:14:28Z",
      },
      destination: {
        name: "Roger Pfannerstill Jr.",
        street: "8378 Mertz Square",
        city: "Fort Modesta",
        zip_code: "91415",
        country: "USA",
      },
      sender: {
        name: "Jane Doe",
        address: "92 Acacia Avenue",
        zip_code: "L7 AKD",
        country: "GB",
      },
    },
    {
      waybill_number: "LKDW82NDW2nJwd72D",
      customs_status: {
        status_code: "HELD",
        destination_airport: "OAK",
        origin_airport: "DFW",
        updated_at: "2022-09-22:07:52:11Z",
      },
      destination: {
        name: "Mr. Rogelio Purdy",
        street: "9887 Gerard Avenue",
        city: "New Alexandriaburgh",
        zip_code: "81452",
        country: "USA",
      },
      sender: {
        name: "Malcolm Runte",
        street: "5355 Price Turnpike",
        city: "Hoegerton",
        zip_code: "40251",
        country: "USA",
      },
    },
  ];
});

fastify.get("/", async (request, reply) => {
  // Random delay
  await new Promise((r) => setTimeout(r, random(500)));

  let windowSize = Math.floor(Math.random() * 3);

  if (random(windowSize * 5) == 5) {
    reply.code(500);
  }

  if (random(windowSize * 3) == 4) {
    reply.code(401);
  }

  if (random(windowSize * 2) == 3) {
    reply.code(400);
  }
  return "";
});

fastify.listen(
  {
    port: 3000,
    host: "0.0.0.0",
  },
  (err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }
);

function random(max) {
  return Math.floor(Math.random() * max);
}
