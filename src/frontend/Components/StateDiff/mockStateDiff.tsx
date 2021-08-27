export const curSnapMock = {
  statusAtom: {
    contents: 'Next Player: X',
    nodeDeps: ['squaresAtom', 'winnerAtom', 'nextValueAtom'],
    components: ['End', 'Status', 'test'],
  },
  winnerAtom: {
    contents: null,
    nodeDeps: ['squaresAtom'],
    components: ['End'],
  },
  nextValueAtom: {
    contents: 'O',
    nodeDeps: ['squaresAtom'],
    components: [],
  },
  resetSquaresAtom: {
    contents: 0,
    nodeDeps: ['squaresAtom'],
    components: ['Status'],
  },
  selectSquareAtom: {
    contents: [null, null, null, null, null, null, null, null, null],
    nodeDeps: ['squaresAtom', 'winnerAtom', 'nextValueAtom'],
    components: ['Squares'],
  },
  squaresAtom: {
    contents: [null, null, null, null, null, null, null, null, null],
    nodeDeps: [],
    components: [],
  },
};

export const prevSnapMock = {
  statusAtom: {
    contents: 'Next Player: O',
    nodeDeps: ['squaresAtom', 'winnerAtom', 'nextValueAtom'],
    components: ['End', 'Status'],
  },
  winnerAtom: {
    contents: null,
    nodeDeps: ['squaresAtom'],
    components: ['End'],
  },
  nextValueAtom: {
    contents: 'X',
    nodeDeps: ['squaresAtom'],
    components: [],
  },
  resetSquaresAtom: {
    contents: 1,
    nodeDeps: ['squaresAtom'],
    components: ['Status'],
  },
  selectSquareAtom: {
    contents: ['X', null, null, 'X', null, null, 'O', null, null],
    nodeDeps: ['squaresAtom', 'winnerAtom', 'nextValueAtom'],
    components: ['Squares'],
  },
  squaresAtom: {
    contents: ['X', null, null, 'X', null, null, 'O', null, null],
    nodeDeps: [],
    components: [],
  },
};

const one = {
  statusAtom: {
    r: 1,
    nodeDeps: ['winnerAtom', 'squaresAtom', 'nextValueAtom'],
    contents: 'Next player: X',
    components: ['End', 'Status'],
  },
  resetSquaresAtom: {
    r: 0,
    nodeDeps: ['resetSquaresAtom'],
    contents: null,
    components: ['Status'],
  },
  selectSquareAtom: {
    r: 1,
    nodeDeps: ['squaresAtom'],
    contents: [null, null, null, null, null, null, null, null, null],
    components: ['Squares'],
  },
  winnerAtom: {
    r: 1,
    nodeDeps: ['squaresAtom'],
    contents: null,
    components: ['End'],
  },
  squaresAtom: {
    r: 0,
    nodeDeps: ['squaresAtom'],
    contents: [null, null, null, null, null, null, null, null, null],
    components: [],
  },
  nextValueAtom: {
    r: 1,
    nodeDeps: ['squaresAtom'],
    contents: 'X',
    components: [],
  },
};
const two = {
  statusAtom: {
    r: 2,
    nodeDeps: ['winnerAtom', 'squaresAtom', 'nextValueAtom'],
    contents: 'Next player: O',
    components: ['End', 'Status'],
  },
  resetSquaresAtom: {
    r: 0,
    nodeDeps: ['resetSquaresAtom'],
    contents: null,
    components: ['Status'],
  },
  selectSquareAtom: {
    r: 2,
    nodeDeps: ['squaresAtom'],
    contents: [null, null, null, null, 'X', null, null, null, null],
    components: ['Squares'],
  },
  winnerAtom: {
    r: 1,
    nodeDeps: ['squaresAtom'],
    contents: null,
    components: ['End'],
  },
  squaresAtom: {
    r: 1,
    nodeDeps: ['squaresAtom'],
    contents: [null, null, null, null, 'X', null, null, null, null],
    components: [],
  },
  nextValueAtom: {
    r: 2,
    nodeDeps: ['squaresAtom'],
    contents: 'O',
    components: [],
  },
};
const three = {
  statusAtom: {
    r: 3,
    nodeDeps: ['winnerAtom', 'squaresAtom', 'nextValueAtom'],
    contents: 'Next player: X',
    components: ['End', 'Status'],
  },
  resetSquaresAtom: {
    r: 0,
    nodeDeps: ['resetSquaresAtom'],
    contents: null,
    components: ['Status'],
  },
  selectSquareAtom: {
    r: 3,
    nodeDeps: ['squaresAtom'],
    contents: [null, null, 'O', null, 'X', null, null, null, null],
    components: ['Squares'],
  },
  winnerAtom: {
    r: 1,
    nodeDeps: ['squaresAtom'],
    contents: null,
    components: ['End'],
  },
  squaresAtom: {
    r: 2,
    nodeDeps: ['squaresAtom'],
    contents: [null, null, 'O', null, 'X', null, null, null, null],
    components: [],
  },
  nextValueAtom: {
    r: 3,
    nodeDeps: ['squaresAtom'],
    contents: 'X',
    components: [],
  },
};
const four = {
  statusAtom: {
    r: 4,
    nodeDeps: ['winnerAtom', 'squaresAtom', 'nextValueAtom'],
    contents: 'Next player: O',
    components: ['End', 'Status'],
  },
  resetSquaresAtom: {
    r: 0,
    nodeDeps: ['resetSquaresAtom'],
    contents: null,
    components: ['Status'],
  },
  selectSquareAtom: {
    r: 4,
    nodeDeps: ['squaresAtom'],
    contents: [null, null, 'O', null, 'X', 'X', null, null, null],
    components: ['Squares'],
  },
  winnerAtom: { r: 1, nodeDeps: ['squaresAtom'], contents: null },
  squaresAtom: {
    r: 3,
    nodeDeps: ['squaresAtom'],
    contents: [null, null, 'O', null, 'X', 'X', null, null, null],
    components: [],
  },
  nextValueAtom: {
    r: 4,
    nodeDeps: ['squaresAtom'],
    contents: 'O',
    components: [],
  },
};
const five = {
  statusAtom: {
    r: 5,
    nodeDeps: ['winnerAtom', 'squaresAtom', 'nextValueAtom'],
    contents: 'Next player: X',
    components: ['End', 'Status'],
  },
  resetSquaresAtom: {
    r: 0,
    nodeDeps: ['resetSquaresAtom'],
    contents: null,
    components: ['Status'],
  },
  selectSquareAtom: {
    r: 5,
    nodeDeps: ['squaresAtom'],
    contents: [null, 'O', 'O', null, 'X', 'X', null, null, null],
    components: ['Squares'],
  },
  winnerAtom: {
    r: 1,
    nodeDeps: ['squaresAtom'],
    contents: null,
    components: ['End'],
  },
  squaresAtom: {
    r: 4,
    nodeDeps: ['squaresAtom'],
    contents: [null, 'O', 'O', null, 'X', 'X', null, null, null],
    components: [],
  },
  nextValueAtom: {
    r: 5,
    nodeDeps: ['squaresAtom'],
    contents: 'X',
    components: [],
  },
};
const six = {
  statusAtom: {
    r: 6,
    nodeDeps: ['winnerAtom'],
    contents: 'Winner: X',
    components: ['End', 'Status'],
  },
  resetSquaresAtom: {
    r: 0,
    nodeDeps: ['resetSquaresAtom'],
    contents: null,
    components: ['Status'],
  },
  selectSquareAtom: {
    r: 6,
    nodeDeps: ['squaresAtom'],
    contents: [null, 'O', 'O', 'X', 'X', 'X', null, null, null],
    components: ['Squares'],
  },
  winnerAtom: { r: 2, nodeDeps: ['squaresAtom'], contents: 'X' },
  squaresAtom: {
    r: 5,
    nodeDeps: ['squaresAtom'],
    contents: [null, 'O', 'O', 'X', 'X', 'X', null, null, null],
    components: [],
  },
  extraAtom: {
    r: 5,
    nodeDeps: ['squaresAtom'],
    contents: [null, 'O', 'O', 'X', 'X', 'X', null, null, null],
    components: [],
  },
};

export const snapshotTestArray = [one, two, three, four, five, six];