const mongoose = require("mongoose");
const PokemonsController = require("../pokemons.controller");
const Pokemon = require("../../models/pokemon");
const pokemonsController = require("../pokemons.controller");

jest.mock("../../models/pokemon");

describe("PokemonController Unit Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new pokemon", async () => {
    const mockReq = {
      body: {
        name: "Ratata",
        type: "normal",
        abilities: ["guts"],
        nature: "adamant",
      },
    };
    const mockRes = { json: jest.fn(), status: jest.fn(() => mockRes) };
    Pokemon.create.mockResolvedValueOnce(mockReq.body);
    await pokemonsController.create(mockReq, mockRes);
    expect(mockRes.json).toHaveBeenCalledWith(mockReq.body);
  });
});
