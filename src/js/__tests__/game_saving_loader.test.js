import GameSavingLoader from '../game_saving_loader';
import reader from '../reader';
import parser from '../parser';

jest.mock('../reader');
jest.mock('../parser');

describe('GameSavingLoader', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should successfully load game saving', async () => {
    const mockData = '{"id": 1, "created": 1625733343000, "userInfo": {"id": 123, "name": "John", "level": 5, "points": 100}}';
    const expectedGameSaving = {
      id: 1,
      created: 1625733343000,
      userInfo: {
        id: 123, name: 'John', level: 5, points: 100,
      },
    };

    reader.mockResolvedValue(mockData);
    parser.mockResolvedValue(mockData);

    const gameSaving = await GameSavingLoader.load();

    expect(gameSaving).toEqual(expectedGameSaving);
  });

  it('should throw an error if reading data fails', async () => {
    reader.mockRejectedValue(new Error('Failed to read data'));

    await expect(GameSavingLoader.load()).rejects.toThrow('Failed to load game saving');
  });

  it('should throw an error if parsing data fails', async () => {
    const mockData = '{"id": 1, "created": 1625733343000, "userInfo": {"id": 123, "name": "John", "level": 5, "points": 100}}';

    reader.mockResolvedValue(mockData);
    parser.mockRejectedValue(new Error('Failed to parse data'));

    await expect(GameSavingLoader.load()).rejects.toThrow('Failed to load game saving');
  });
});
