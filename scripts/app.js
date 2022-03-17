const asciiCodeAssets = {
  spaceCode: 32,
  symbolStartCode: 33,
  symbolLastCode: 47,
  numberStartCode: 48,
  numberLastCode: 57,
  upperStartCode: 65,
  upperLastCode: 90,
  lowerStartCode: 97,
  lowerLastCode: 122,
}

const keyHanddler = {
  keyArray: [],
  key: 0,
  isEncrypter: true,

  createAlphabetList(cb, isScroll = false) {
    const list = [];
    let scrollWeight = 0;
    if(isScroll) {
        for (let i = 24; i < 26; i += 1) {
          const alphabet = document.createElement('li');
          alphabet.innerHTML = cb(i);
          list.push(alphabet);
        }
        scrollWeight = 2;
    }
  
    for (let i = 0; i < 26 + scrollWeight; i += 1) {
      const alphabet = document.createElement('li');
      alphabet.innerHTML = cb(i);
      list.push(alphabet);
    }
    return list;
  },
}

const scrollEvent = {
  startX: 0,
  currentX: 0,
  scrollValue: 0,
  movement: 0,
  listWidth: 0,
  isDragging: false,

  handleRender(scroll, isEncrypter = true) {
    const {lowerStartCode, lowerLastCode} = asciiCodeAssets;
    let index = 0;
    if (isEncrypter === true) {
      scroll.childNodes.forEach((li) => {
      let value = lowerStartCode + (keyHanddler.key + index - 2) % 26;
      if (value < lowerStartCode) {
        value = lowerLastCode - (lowerStartCode - value);
      }
      li.innerHTML = `&#${value};`;
      index += 1;
    })
    }
    else {
      scroll.childNodes.forEach((li) => {
        let value = lowerStartCode + (index - keyHanddler.key + 1) % 26;
        if (value < lowerStartCode) {
          value = lowerLastCode - (lowerStartCode - value - 1);
        }
        li.innerHTML = `&#${value};`;
        index += 1;
      })
    }
  },

  handleKey(direction, keyIndicator, isEncrypter = true) {
    if (isEncrypter === true) {
      keyHanddler.key += direction;
    }
    else {
        keyHanddler.key -= direction;
    }
    keyHanddler.key %= 26;
    if (keyHanddler.key < 0) {
      keyHanddler.key = 26 + keyHanddler.key % 26;
    }
    keyIndicator.innerText = keyHanddler.key;
    algorithm.caesar()
  },

  handlePosition(scroll) {
    scroll.childNodes.forEach((li) => {
      li.style.transform = `translateX(${scrollEvent.scrollValue}px)`
    });
  },

  handleClick() {
    scrollEvent.startX = e.clientX;
    scrollEvent.isDragging = true;
    scrollEvent.listWidth = 21.6;
  },

  handleDrag(e) {
    if (!scrollEvent.isDragging) return;

    scrollEvent.currentX = e.clientX;
    scrollEvent.scrollValue += scrollEvent.currentX - scrollEvent.startX;
    scrollEvent.movement = Math.round(- scrollEvent.scrollValue / scrollEvent.listWidth);
    scrollEvent.startX = scrollEvent.currentX;
    scrollEvent.handlePosition();

    if (Math.round(scrollEvent.scrollValue % scrollEvent.listWidth) === 0) {
      scrollEvent.scrollValue = 0;
      scrollEvent.handlePosition()
      scrollEvent.handleKey(scrollEvent.movement);
      scrollEvent.handleRender();
    }
  },

  handleDrop(scroll) {
    if (!scrollEvent.isDragging) return;
    scroll.childNodes.forEach((li) => li.classList.add('dropped'))
    scrollEvent.scrollValue = 0;
    scrollEvent.handlePosition();
    scroll.classList.remove('dragging');
    scrollEvent.isDragging = false;
  }
}

const algorithm = {
  caesar(source, modified, isEncrypter = true) {
    const {spaceCode, symbolStartCode, symbolLastCode, numberStartCode, numberLastCode, upperStartCode, upperLastCode, lowerStartCode, lowerLastCode} = asciiCodeAssets;
    const listOfAscii = [];
    const inputLength = source.value.length;
    const asciiLength = listOfAscii.length;
    for (let i = 0; i < inputLength; i += 1) {
      const asciiCode = source.value.charCodeAt(i);
      if (asciiCode === spaceCode) {
        listOfAscii[i] = asciiCode;
      }

      else if (asciiCode <= symbolLastCode && asciiCode >= symbolStartCode) {
        const numberOfSymbol = symbolLastCode - symbolStartCode + 1;

        if (isEncrypter === true) {
          listOfAscii[i] = (asciiCode % symbolStartCode + keyHanddler.key) % numberOfAlpabet;
          listOfAscii[i] += symbolStartCode;
        }
        else {
          listOfAscii[i] = (asciiCode % symbolStartCode % numberOfSymbol - keyHanddler.key)

          if (listOfAscii[i] < 0) {
            listOfAscii[i] = numberOfSymbol + listOfAscii[i];
          }
          listOfAscii[i] += symbolStartCode;
        }
      }

      else if (asciiCode <= numberLastCode && asciiCode >= numberStartCode) {
        const numberOfNumber = numberLastCode - numberStartCode + 1;

        if (isEncrypter === true) {
          listOfAscii[i] = (asciiCode % numberStartCode + keyHanddler.key) % numberOfNumber;
          listOfAscii[i] += numberStartCode;
        }
        else {
          listOfAscii[i] = (asciiCode % numberStartCode % numberOfNumber - keyHanddler.key)

          if (listOfAscii[i] < 0) {
            listOfAscii[i] = numberOfNumber + listOfAscii[i];
          }
          listOfAscii[i] += numberStartCode;
        }
      }

      else if (asciiCode <= upperLastCode && asciiCode >= upperStartCode) {
        const numberOfAlpabet = upperLastCode - upperStartCode + 1;

        if(isEncrypter === true) {
          listOfAscii[i] = (asciiCode % upperStartCode + keyHanddler.key) % numberOfAlpabet;
          listOfAscii[i] += upperStartCode;
        }
        else {
          listOfAscii[i] = (asciiCode % upperStartCode % numberOfAlpabet - keyHanddler.key)

          if (listOfAscii[i] < 0) {
            listOfAscii[i] = numberOfAlpabet + listOfAscii[i];
          }
          listOfAscii[i] += upperStartCode;
        }
      }

      else if (asciiCode <= lowerLastCode && asciiCode >= lowerStartCode) {
        const numberOfAlpabet = lowerLastCode - lowerStartCode + 1;
        if (isEncrypter === true) {
          listOfAscii[i] = (asciiCode % lowerStartCode + keyHanddler.key) % numberOfAlpabet;
          listOfAscii[i] += lowerStartCode;
        }

        else {
          listOfAscii[i] = (asciiCode % lowerStartCode % numberOfAlpabet - keyHanddler.key);
          if (listOfAscii[i] < 0) {
            listOfAscii[i] = numberOfAlpabet + listOfAscii[i];
          }
          listOfAscii[i] += lowerStartCode;
        }
      }
      else {
        listOfAscii[i] = asciiCode;
      }
    }
    if (inputLength < asciiLength) {
      for (let i = 0; i < asciiLength - inputLength; i += 1) {
        listOfAscii.pop();
      }
    }
    const tag = listOfAscii
    .map((curr) => {
      return `&#${curr};`;
    })
    .reduce((acc, curr) => {
      return acc + curr;
    }, '')
    modified.innerHTML = tag;
  }
}