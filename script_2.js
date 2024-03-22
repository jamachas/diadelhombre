console.clear();

// TODO: Add Some Responsiveness

const WORDS = ['GLPI', 'Redinalambrica', 'Activosfijos', 'Navegacion','Internet', 'ServiciodeTI', 'Googleapps'];


const DIRECTIONS = {
  VERTICAL_POSITIVE: "v+",
  VERTICAL_NEGATIVE: "v-",
  HORIZONTAL_POSITIVE: "h+",
  HORIZONTAL_NEGATIVE: "h-",
  DIAGONAL_NE: "dne",
  DIAGONAL_NW: "dnw",
  DIAGONAL_SE: "dse",
  DIAGONAL_SW: "dsw",
  INITIAL: "i" };


const getWords = amount => {
  const result = {};

  for (let i = 0; i < amount; i++) {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    result[word] = false;
  }

  return result;
};

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const highlightStyles = {
  [DIRECTIONS.VERTICAL_POSITIVE]: current => {
    return {
      top: `${32 * current.start.y}px`,
      left: `${32 * current.start.x}px`,
      height: `${32 * (Math.abs(current.start.y - current.end.y) + 1)}px`,
      transformOrigin: "center center" };

  },
  [DIRECTIONS.VERTICAL_NEGATIVE]: current => {
    return {
      top: `${32 * current.end.y}px`,
      left: `${32 * current.end.x}px`,
      height: `${32 * Math.abs(current.start.y - current.end.y + 1)}px`,
      transformOrigin: "center center" };

  },
  [DIRECTIONS.HORIZONTAL_POSITIVE]: current => {
    return {
      top: `${32 * current.start.y}px`,
      left: `${32 * current.start.x}px`,
      width: `${32 * (Math.abs(current.start.x - current.end.x) + 1)}px`,
      transformOrigin: "center center" };

  },
  [DIRECTIONS.HORIZONTAL_NEGATIVE]: current => {
    return {
      top: `${32 * current.end.y}px`,
      left: `${32 * current.end.x}px`,
      width: `${32 * Math.abs(current.start.x - current.end.x + 1)}px`,
      transformOrigin: "center center" };

  },
  [DIRECTIONS.DIAGONAL_SE]: current => {
    const distance = Math.abs(current.end.y - current.start.y) + 1;
    return {
      top: `${32 * current.start.y - 7}px`,
      left: `${32 * current.start.x + 15}px`,
      width: `${32 * distance + 13.5 * (distance - 1)}px`,
      transformOrigin: "top left",
      transform: "rotate(45deg)" };

  },
  [DIRECTIONS.DIAGONAL_SW]: current => {
    const distance = Math.abs(current.end.y - current.start.y) + 1;
    return {
      top: `${32 * current.start.y - 7}px`,
      left: `${32 * current.start.x - (30 * distance + 15.5 * (distance - 2))}px`,
      width: `${32 * distance + 13.5 * (distance - 1)}px`,
      transformOrigin: "top right",
      transform: "rotate(-45deg)" };

  },
  [DIRECTIONS.DIAGONAL_NE]: current => {
    const distance = Math.abs(current.end.y - current.start.y) + 1;

    return {
      top: `${32 * current.start.y - (35.5 * distance - 3.5 * (distance - 2))}px`,
      left: `${32 * current.start.x + (24 * distance + 8.125 * (distance - 2))}px`,
      width: `${32 * distance + 13.5 * (distance - 1)}px`,
      transformOrigin: "bottom left",
      transform: "rotate(135deg)" };

  },
  [DIRECTIONS.DIAGONAL_NW]: current => {
    const distance = Math.abs(current.end.y - current.start.y) + 1;
    return {
      top: `${32 * current.start.y - (35.5 * distance - 3.45 * (distance - 2))}px`,
      left: `${
      32 * current.start.x - (46.5 * distance + 30.925 * (distance - 2))
      }px`,
      width: `${32 * distance + 13.5 * (distance - 1)}px`,
      transformOrigin: "bottom right",
      transform: "rotate(-135deg)" };

  },
  [DIRECTIONS.INITIAL]: current => {
    return {
      top: `${32 * current.start.y}px`,
      left: `${32 * current.start.x}px`,
      transformOrigin: "center center" };

  } };


const random = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};
const _placeWord = (word, grid, width, height) => {
  word = random(0, 2) == 0 ? word : word.split("").reverse().join("");

  let placed = false;
  let x, y, direction, works;

  while (placed == false) {
    direction = random(0, 3);

    switch (direction) {
      case 0:
        x = random(0, width - word.length);
        y = random(0, height);

        works = true;

        for (let i = 0; i < word.length; i++) {
          if (grid[y][i + x] !== 0 && grid[y][i + x] !== word.charAt(i)) {
            works = false;
          }
        }

        if (works == true) {
          return [word, direction, x, y];
        }
        break;

      case 1:
        x = random(0, width);
        y = random(0, height - word.length);

        works = true;

        for (let i = 0; i < word.length; i++) {
          if (grid[y + i][x] !== 0 && grid[y + i][x] !== word.charAt(i)) {
            works = false;
          }
        }

        if (works == true) {
          return [word, direction, x, y];
        }
        break;
      case 2:
        x = random(0, width - word.length);
        y = random(0, height - word.length);

        works = true;

        for (let i = 0; i < word.length; i++) {
          if (grid[i + y][i + x] !== 0 && grid[i + y][i + x] !== word.charAt(i)) {
            works = false;
          }
        }

        if (works == true) {
          return [word, direction, x, y];
        }
        break;}

  }
};
const _generateBaseGrid = (width, height) => {
  const grid = [];

  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push(0);
    }
    grid.push(row);
  }

  return grid;
};
const generate = (words, width, height) => {
  const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"];


  let grid = _generateBaseGrid(width, height);
  words = words.sort((a, b) => {
    return b.length - a.length;
  });

  for (let i = 0; i < words.length; i++) {
    const [word, direction, x, y] = _placeWord(words[i], grid, width, height);

    switch (direction) {
      case 0:
        for (let i = 0; i < word.length; i++) {
          grid[y][i + x] = word.charAt(i);
        }
        break;
      case 1:
        for (let i = 0; i < word.length; i++) {
          grid[y + i][x] = word.charAt(i);
        }
        break;
      case 2:
        for (let i = 0; i < word.length; i++) {
          grid[y + i][x + i] = word.charAt(i);
        }
        break;}

  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x] === 0) {
        grid[y][x] = letters[random(0, letters.length)];
      }
    }
  }

  return grid;
};

const determineDirection = state => {
  if (state.start.y == state.end.y) {
    return state.start.x < state.end.x ?
    DIRECTIONS.HORIZONTAL_POSITIVE :
    DIRECTIONS.HORIZONTAL_NEGATIVE;
  }

  if (state.start.x == state.end.x) {
    return state.start.y < state.end.y ?
    DIRECTIONS.VERTICAL_POSITIVE :
    DIRECTIONS.VERTICAL_NEGATIVE;
  }

  const xDifference = state.end.x - state.start.x;
  const xSign = xDifference >= 0;
  const yDifference = state.end.y - state.start.y;
  const ySign = yDifference >= 0;

  if (Math.abs(xDifference) == Math.abs(yDifference)) {
    if (xSign == true && ySign == true) {
      return DIRECTIONS.DIAGONAL_SE;
    }
    if (xSign == true && ySign == false) {
      return DIRECTIONS.DIAGONAL_NE;
    }
    if (xSign == false && ySign == true) {
      return DIRECTIONS.DIAGONAL_SW;
    }
    if (xSign == false && ySign == false) {
      return DIRECTIONS.DIAGONAL_NW;
    }
  }

  return DIRECTIONS.INITIAL;
};
const determineSelection = (state, letters) => {
  const direction = determineDirection(state);

  let result = [];

  if (direction == DIRECTIONS.HORIZONTAL_POSITIVE) {
    for (let x = state.start.x; x <= state.end.x; x++) {
      result.push(letters[state.start.y][x]);
    }
  }

  if (direction == DIRECTIONS.HORIZONTAL_NEGATIVE) {
    for (let x = state.start.x; x >= state.end.x; x--) {
      result.push(letters[state.start.y][x]);
    }
  }

  if (direction == DIRECTIONS.VERTICAL_POSITIVE) {
    for (let y = state.start.y; y <= state.end.y; y++) {
      result.push(letters[y][state.start.x]);
    }
  }

  if (direction == DIRECTIONS.VERTICAL_NEGATIVE) {
    for (let y = state.start.y; y >= state.end.y; y--) {
      result.push(letters[y][state.start.x]);
    }
  }

  if (direction == DIRECTIONS.DIAGONAL_NE) {
    let { x, y } = state.start;
    let difference = Math.abs(state.end.x - state.start.x);

    for (let i = 0; i <= difference; i++) {
      result.push(letters[y][x]);
      x++;
      y--;
    }
  }

  if (direction == DIRECTIONS.DIAGONAL_NW) {
    let { x, y } = state.start;
    let difference = Math.abs(state.end.x - state.start.x);

    for (let i = 0; i <= difference; i++) {
      result.push(letters[y][x]);
      x--;
      y--;
    }
  }

  if (direction == DIRECTIONS.DIAGONAL_SE) {
    let { x, y } = state.start;
    let difference = Math.abs(state.end.x - state.start.x);

    for (let i = 0; i <= difference; i++) {
      result.push(letters[y][x]);
      x++;
      y++;
    }
  }

  if (direction == DIRECTIONS.DIAGONAL_SW) {
    let { x, y } = state.start;
    let difference = Math.abs(state.end.x - state.start.x);

    for (let i = 0; i <= difference; i++) {
      result.push(letters[y][x]);
      x--;
      y++;
    }
  }

  return result.join("");
};

const Word = ({ word, found = false }) => {
  return /*#__PURE__*/(
    React.createElement("div", { className: found == false ? "word" : "word word--found" }, /*#__PURE__*/
    React.createElement("p", { className: "word__value" }, word)));


};
const WordsList = ({ words }) => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "words-list" },
    Object.keys(words).map(word => {
      return /*#__PURE__*/React.createElement(Word, { word: word, found: words[word] });
    })));


};
const Highlight = ({ position = null, active = true }) => {
  const direction = determineDirection(position);
  const style = highlightStyles[direction](position);

  return /*#__PURE__*/(
    React.createElement("div", {
      className:
      active == true ?
      "word-search__highlight" :
      "word-search__highlight word-search__highlight--placed",

      style: style }));


};
const Letter = ({ value }) => {
  return /*#__PURE__*/(
    React.createElement("a", { href: "#", className: "word-search__letter" },
    value));


};
const Grid = ({ grid, width, height, onSelectionMade, highlights, setHighlights }) => {
  const [gridBounds, setGridBounds] = React.useState({ top: 0, left: 0 });
  const gridRef = React.useRef();


  const [pressed, setPressed] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [mouseGridPosition, setMouseGridPosition] = React.useState({
    x: 0,
    y: 0 });


  const [currentHighlight, setCurrentHighlight] = React.useState(null);
  const [currentSelection, setCurrentSelection] = React.useState("");
  const [currentDirection, setCurrentDirection] = React.useState(
  DIRECTIONS.INITIAL);


  const onViewportUpdate = () => {
    const { top, left } = gridRef.current.getBoundingClientRect();
    setGridBounds({ top, left });
  };

  React.useEffect(() => {
    window.addEventListener("resize", onViewportUpdate);
    document.addEventListener("scroll", onViewportUpdate);

    onViewportUpdate();

    return () => {
      window.removeEventListener("resize", onViewportUpdate);
      document.removeEventListener("scroll", onViewportUpdate);
    };
  }, []);

  const determineMousePosition = event => {
    const x = event.clientX - gridBounds.left;
    const y = event.clientY - gridBounds.top;

    setMousePosition({ x, y });

    setMouseGridPosition({
      x: clamp(Math.floor(x / 32), 0, width - 1),
      y: clamp(Math.floor(y / 32), 0, height - 1) });


    return {
      x: clamp(Math.floor(x / 32), 0, width - 1),
      y: clamp(Math.floor(y / 32), 0, height - 1) };

  };

  const onMouseDown = event => {
    setPressed(true);

    const gridPosition = determineMousePosition(event);

    setCurrentHighlight({
      start: gridPosition,
      end: gridPosition });


    setCurrentSelection(grid[gridPosition.y][gridPosition.x]);
  };

  const onMouseUp = event => {
    setPressed(false);

    const result = onSelectionMade(currentSelection);

    if (result == true) {
      setHighlights([...highlights, currentHighlight]);
    }

    setCurrentHighlight(null);
  };

  const onMouseMove = event => {
    if (pressed == true) {
      const gridPosition = determineMousePosition(event);

      const newHighlight = Object.assign(
      currentHighlight, { end: gridPosition });


      setCurrentDirection(determineDirection(newHighlight));
      setCurrentHighlight(newHighlight);
      setCurrentSelection(determineSelection(newHighlight, grid));
    }
  };

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("div", { className: "word-search__grid" }, /*#__PURE__*/
    React.createElement("div", {
      ref: gridRef,
      onMouseUp: onMouseUp,
      onMouseDown: onMouseDown,
      onMouseMove: onMouseMove,
      className: "word-search__letters" },

    grid.map((row, y) => {
      return row.map((column, x) => {
        return /*#__PURE__*/React.createElement(Letter, { value: column, x: x, y: y });
      });
    })), /*#__PURE__*/

    React.createElement("div", { className: "word-search__highlights" },
    highlights.map(highlight => {
      return /*#__PURE__*/React.createElement(Highlight, { position: highlight, active: false });
    }),
    currentHighlight != null ? /*#__PURE__*/
    React.createElement(Highlight, { position: currentHighlight, active: true }) :

    ""))));





};

const EndScreen = ({ onRestart }) => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "end" }, /*#__PURE__*/
    React.createElement("div", { className: "end__content" }, /*#__PURE__*/
    React.createElement("h1", null, "¡Felicidades!, Quiéres volver a jugar?"), /*#__PURE__*/
    React.createElement("button", { className: "end__button", onClick: onRestart }, "Play Again?"))));





};

const App = () => {
  const width = 15;
  const height = 15;

  const [ended, setEnded] = React.useState(false);
  const [words, setWords] = React.useState(getWords(15));
  const [grid, setGrid] = React.useState([]);
  const [highlights, setHighlights] = React.useState([]);

  const onRestart = () => {
    const newWords = getWords(15);

    setWords(newWords);
    setGrid(generate(Object.keys(newWords), width, height));
    setHighlights([]);
    setEnded(false);
  };

  const isEnd = state => {
    return Object.values(state).includes(false) == false;
  };

  const onEnd = () => {
    setEnded(true);
  };

  const onSelectionMade = selection => {
    const backwardsSelection = selection.split("").reverse().join("");

    if (Object.keys(words).includes(selection)) {

      const newState = {
        ...words,
        [selection]: true };


      if (isEnd(newState) == true) {
        onEnd();
      } else {
        setWords(newState);
      }

      return true;
    } else if (Object.keys(words).includes(backwardsSelection)) {

      const newState = {
        ...words,
        [backwardsSelection]: true };


      if (isEnd(newState) == true) {
        onEnd();
      } else {
        setWords(newState);
      }

      return true;
    }

    return false;
  };

  React.useEffect(() => {
    setGrid(generate(Object.keys(words), width, height));
  }, []);

  return /*#__PURE__*/(
    React.createElement("div", { className: "word-search" },
    ended == true ? /*#__PURE__*/React.createElement(EndScreen, { onRestart: onRestart }) : "", /*#__PURE__*/
    React.createElement(Grid, {
      grid: grid,
      width: width,
      height: height,
      highlights: highlights,
      setHighlights: setHighlights,
      onSelectionMade: onSelectionMade }), /*#__PURE__*/

    React.createElement(WordsList, { words: words })));


};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));