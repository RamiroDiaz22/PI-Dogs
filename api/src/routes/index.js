const { Router, response } = require("express");
const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db");
const router = Router();

const getApi = async () => {
  const getApi = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const infoApi = getApi.data.map((response) => {
    return {
      id: response.id,
      name: response.name,
      weight: response.weight.metric.split("-"),
      temperament: response.temperament,
      image: response.image.url,
    };
  });
  return infoApi;
};

const getDb = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attribute: {
        include: ["name"],
      },
      through: {
        attribute: [],
      },
    },
  });
};

const getAllDogs = async () => {
  let apiInfo = await getApi();
  let dbInfo = await getDb();
  const informacion = apiInfo.concat(dbInfo);
  return informacion;
};

router.get(`/dogs`, async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) {
      const apiInfo = await getApi();
      const dbInfo = await getDb();
      const informacion = await apiInfo.concat(dbInfo);
      informacion.length
        ? res.status(200).send(informacion)
        : res.status(404).send("Api not found");
    }
    if (name) {
      const api = await getAllDogs();
      let dogName = await api.filter((d) =>
        d.name.toLowerCase().includes(name.toLowerCase())
      );
      dogName.length
        ? res.status(200).send(dogName)
        : res.status(404).send("Dog not found");
    }
  } catch (err) {
    next(err);
  }
});

router.get(`/dogs/:id`, async (req, res, next) => {
  try {
    const { id } = req.params;
    const dogsTotal = await getAllDogs();
    if (typeof id === "string" && id.length > 8) {
      let filter = dogsTotal.filter((el) => el.id == id);

      res.status(200).send(filter);
    } else {
      const api = await axios(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
      const infoApi = api.data.map((response) => {
        return {
          id: response.id,
          name: response.name,
          life_span: response.life_span,
          weight: response.weight.metric,
          height: response.height.metric,
          temperament: response.temperament,
          origin: response.origin,
          image: response.image.url,
        };
      });

      const find = infoApi.find((data) => data.id === Number(id));

      res.status(200).json(find);
    }
  } catch (err) {
    next(err);
  }
});

router.get(`/temperament`, async (req, res, next) => {
  try {
    const array = [];
    const arr = [];
    const temperamentApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    const infoTemperament = temperamentApi.data.map((d) => {
      return {
        temperament: d.temperament,
      };
    });

    const filtro = infoTemperament.filter((d) => d.temperament !== undefined);

    filtro.map((d) => {
      array.push(d.temperament.split(","));
      return array;
    });

    array.forEach((d) => {
      for (var i = 0; i < d.length; i++) {
        d[i] = d[i].trimStart();
        arr.push(d[i]);
      }
    });

    const tabla = {};
    const unicos = arr.filter((indice) => {
      return tabla.hasOwnProperty(indice) ? false : (tabla[indice] = true);
    });
    unicos.sort();

    const dbApi = unicos.map((d) => {
      return Temperament.findOrCreate({
        where: {
          name: d,
        },
      });
    });

    let infoDbApi = await Temperament.findAll();
    res.status(200).json(infoDbApi);
  } catch (err) {
    next(err);
  }
});

router.post(`/dogs`, async (req, res, next) => {
  try {
    let {
      name,
      life_span,
      height_min,
      height_max,
      weight_min,
      weight_max,
      origin,
      image,
      temperament,
      createInDb,
    } = req.body;
    const createDog = await Dog.create({
      name,
      life_span,
      height_min,
      height_max,
      weight_min,
      weight_max,
      origin,
      image,
      createInDb,
    });

    let dogTemperament = await Temperament.findAll({
      where: {
        name: temperament,
      },
    });
    createDog.addTemperament(dogTemperament);
    res.status(200).send("Dog created successfully");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
