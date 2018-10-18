import { NumberToLetterPipe } from './number-to-letter.pipe';

describe('NumberToLetterPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberToLetterPipe();
    expect(pipe).toBeTruthy();
  });
});
