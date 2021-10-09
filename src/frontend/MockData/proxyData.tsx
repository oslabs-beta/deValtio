export default {
  statusProxy: {
    value: 'Next Player: X',
    dependentOf: [],
    dependents: ['squaresProxy', 'winnerProxy', 'nextValueProxy'],
    components: ['End', 'Status', 'test'],
  },
  winnerProxy: {
    value: null,
    dependentOf: ['selectSquareProxy', 'statusProxy'],
    dependents: ['squaresProxy'],
    components: ['End'],
  },
  nextValueProxy: {
    value: 'O',
    dependentOf: ['selectSquareProxy', 'statusProxy'],
    dependents: ['squaresProxy'],
    components: [],
  },
  resetSquaresProxy: {
    value: 0,
    dependentOf: [],
    dependents: ['squaresProxy'],
    components: ['Status'],
  },
  selectSquareProxy: {
    value: [null, null, null, null, null, null, null, null, null],
    dependentOf: [],
    dependents: ['squaresProxy', 'winnerProxy', 'nextValueProxy'],
    components: ['Squares'],
  },
  squaresProxy: {
    value: [null, null, null, null, null, null, null, null, null],
    dependentOf: ['selectSquareProxy', 'resetSquaresProxy', 'nextValueProxy', 'winnerProxy', 'statusProxy'],
    dependents: [],
    components: [],
  },
};