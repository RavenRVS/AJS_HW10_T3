import reader from './reader';
import parser from './parser';

export default class GameSavingLoader {
  static async load() {
    try {
      const data = await reader();
      const value = await parser(data);
      const gameSaving = JSON.parse(value);
      return gameSaving;
    } catch (error) {
      throw new Error('Failed to load game saving');
    }
  }
}
