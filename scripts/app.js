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
  symbolLength: 15,
  numberLength: 10,
  alphabetLength: 26
}

const domAssets = {
  algorithmSelector: document.querySelector('#sourceAlgorithmSelector'),
  algorithmSelectorArrow: document.querySelector('#algorithmSelectArrow'),
  algorithmPopup: document.querySelector('#algorithmPopupList'),
  firstAlgorithm: document.querySelector('#algorithmPopupList').children[0],
  secondAlgorithm: document.querySelector('#algorithmPopupList').children[1],
  algorithmExchanger: document.querySelector('#exchangeButton'),
  algorithmExchangerImage: document.querySelector('#exchangeButton').children[0],
  algorithmDisplay: document.querySelector('#modifiedAlgorithmDisplay'),
  sourceInput: document.querySelector('#textSource'),
  lengthIndicator: document.querySelector('#sourceLength'),
  keySelector: document.querySelector('#keySelectorButton'),
  keySelectorImage: document.querySelector('#keySelectorButton').children[0],
  sourceCopyButton: document.querySelector('#sourceCopyButton'),
  sourceCopyButtonImage: document.querySelector('#sourceCopyButton').children[0],
  beforeKeyIndicator: document.querySelector('#keyCounterEnglish'),
  keyIndicatorList: document.querySelector('#keyCounterList'),
  keyResetButton: document.querySelector('#resetKeyButton'),
  modifiedOutput: document.querySelector('#modifiedTextArea'),
  clearButton: document.querySelector('#clearTextButton'),
  modifiedCopyButton: document.querySelector('#modifiedCopyButton'),
  modifiedCopyButtonImg: document.querySelector('#modifiedCopyButton').children[0],
  keyPopup: document.querySelector('#keyPopup'),
  keyScroll: document.querySelector('#keyScroll')
}

const translatorAssets = {
  algorithm: 'caesar',
  headerToggle: false,
  keytoggle: false,
  isEncrypter: true

}

const keyHanddler = {
  keyArray: [],
  key: 0,

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
    const {lowerStartCode, lowerLastCode, alphabetLength} = asciiCodeAssets;
    let index = 0;
    if (isEncrypter === true) {
      scroll.childNodes.forEach((li) => {
      let value = lowerStartCode + (keyHanddler.key + index - 2) % alphabetLength;
      if (value < lowerStartCode) {
        value = lowerLastCode - (lowerStartCode - value);
      }
      li.innerHTML = `&#${value};`;
      index += 1;
    })
    }
    else {
      scroll.childNodes.forEach((li) => {
        let value = lowerStartCode + (index - keyHanddler.key + 1) % alphabetLength;
        if (value < lowerStartCode) {
          value = lowerLastCode - (lowerStartCode - value - 1);
        }
        li.innerHTML = `&#${value};`;
        index += 1;
      })
    }
  },

  handleKey(direction, keyIndicator, isEncrypter = true) {
    const {alphabetLength} = asciiCodeAssets
    if (isEncrypter === true) {
      keyHanddler.key += direction;
    }
    else {
        keyHanddler.key -= direction;
    }
    keyHanddler.key %= alphabetLength;
    if (keyHanddler.key < 0) {
      keyHanddler.key = alphabetLength + keyHanddler.key % alphabetLength;
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
    const {spaceCode, symbolStartCode, symbolLastCode, numberStartCode, numberLastCode, upperStartCode, upperLastCode, lowerStartCode, lowerLastCode, symbolLength, numberLength, alphabetLength} = asciiCodeAssets;
    const listOfAscii = [];
    const inputLength = source.value.length;
    const asciiLength = listOfAscii.length;
    for (let i = 0; i < inputLength; i += 1) {
      const asciiCode = source.value.charCodeAt(i);
      if (asciiCode === spaceCode) {
        listOfAscii[i] = asciiCode;
      }

      else if (asciiCode <= symbolLastCode && asciiCode >= symbolStartCode) {
        if (isEncrypter === true) {
          listOfAscii[i] = (asciiCode % symbolStartCode + keyHanddler.key) % numberOfAlpabet;
          listOfAscii[i] += symbolStartCode;
        }
        else {
          listOfAscii[i] = (asciiCode % symbolStartCode % symbolLength - keyHanddler.key)

          if (listOfAscii[i] < 0) {
            listOfAscii[i] = symbolLength + listOfAscii[i];
          }
          listOfAscii[i] += symbolStartCode;
        }
      }

      else if (asciiCode <= numberLastCode && asciiCode >= numberStartCode) {
        if (isEncrypter === true) {
          listOfAscii[i] = (asciiCode % numberStartCode + keyHanddler.key) % numberLength;
          listOfAscii[i] += numberStartCode;
        }
        else {
          listOfAscii[i] = (asciiCode % numberStartCode % numberLength - keyHanddler.key)

          if (listOfAscii[i] < 0) {
            listOfAscii[i] = numberLength + listOfAscii[i];
          }
          listOfAscii[i] += numberStartCode;
        }
      }

      else if (asciiCode <= upperLastCode && asciiCode >= upperStartCode) {
        if(isEncrypter === true) {
          listOfAscii[i] = (asciiCode % upperStartCode + keyHanddler.key) % alphabetLength;
          listOfAscii[i] += upperStartCode;
        }
        else {
          listOfAscii[i] = (asciiCode % upperStartCode % alphabetLength - keyHanddler.key)
          if (listOfAscii[i] < 0) {
            listOfAscii[i] = alphabetLength + listOfAscii[i];
          }
          listOfAscii[i] += upperStartCode;
        }
      }

      else if (asciiCode <= lowerLastCode && asciiCode >= lowerStartCode) {
        if (isEncrypter === true) {
          listOfAscii[i] = (asciiCode % lowerStartCode + keyHanddler.key) % alphabetLength;
          listOfAscii[i] += lowerStartCode;
        }

        else {
          listOfAscii[i] = (asciiCode % lowerStartCode % alphabetLength - keyHanddler.key);
          if (listOfAscii[i] < 0) {
            listOfAscii[i] = alphabetLength + listOfAscii[i];
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

const handleheaderPopup = (toggle) => {
  const {algorithmSelectorArrow, algorithmPopup} = domAssets;
  if (toggle === true) {
    algorithmSelectorArrow.classList.add('selected')
    algorithmPopup.classList.remove('hidden')
  }
  else {
    algorithmSelectorArrow.classList.remove('selected')
    algorithmPopup.classList.add('hidden')  
  }
}

const handleAlgorithm = (target) => {
  const presentAlgorithm = translatorAssets.algorithm;
  if (target === domAssets.firstAlgorithm) {
    translatorAssets.algorithm = 'caesar';
  }
  else if (target === domAssets.secondAlgorithm) {
    translatorAssets.algorithm = 'vigenere'
  }
  if (presentAlgorithm === translatorAssets.algorithm) return;
  else {
    console.log('작업해야됨. 알고리즘 변경')
  }
}

const handleEncrypter = (isEncrypter) => {
  if (isEncrypter === true) {
    console.log('복호화로 변경 버튼 작업 필요');
    translatorAssets.isEncrypter = false;
  }
  else {
    console.log('암호화로 변경 버튼 작업 필요')
    translatorAssets.isEncrypter = true;
  }
}

const handleKeyWrapper = (toggle) => {
  if (toggle === true) {
    domAssets.keyPopup.classList.remove('hidden');
  }
  else {
    domAssets.keyPopup.classList.add('hidden')
  }
}

const handleCopy = (target) => {
  if (target === domAssets.sourceCopyButton || target === domAssets.sourceCopyButtonImage) {
    navigator.clipboard.writeText(`${domAssets.sourceInput.value}`);
  }
  else {
    navigator.clipboard.writeText(domAssets.modifiedOutput.innerText);
  }
}

const handleKeyReset = () => {
  keyHanddler.key = 0;
  algorithm.caesar(domAssets.sourceInput, domAssets.modifiedOutput, translatorAssets.isEncrypter)
}


const handleClick = (e) => {
  const {algorithmSelector, algorithmSelectorArrow, firstAlgorithm, secondAlgorithm, algorithmExchanger, algorithmExchangerImage, keySelector, keySelectorImage, sourceCopyButton, sourceCopyButtonImage, keyResetButton, modifiedCopyButton, modifiedCopyButtonImg, clearButton} = domAssets;
  const target = e.target
  console.log(target)
  switch (target) {
    case algorithmSelector:
      translatorAssets.headerToggle = true;
      translatorAssets.keytoggle = false;
      break;

    case algorithmSelectorArrow:
      translatorAssets.headerToggle = true;
      translatorAssets.keytoggle = false;
      break;

    case firstAlgorithm:
      handleAlgorithm(target);
      break;

    case secondAlgorithm:
      handleAlgorithm(target);
      break;
    
    case algorithmExchanger:
      handleEncrypter(translatorAssets.isEncrypter);
      break;
    
    case algorithmExchangerImage:
      handleEncrypter(translatorAssets.isEncrypter);
      break;
      
    case keySelector:
      translatorAssets.headerToggle = false;
      translatorAssets.keytoggle = true;
      break;
  
    case keySelectorImage:
      translatorAssets.headerToggle = false;
      translatorAssets.keytoggle = true;
      break;

    case sourceCopyButton:
      handleCopy(target);
      break;

    case sourceCopyButtonImage:
      handleCopy(target);
      break;

    case keyResetButton:
      handleKeyReset();
      break;

    case modifiedCopyButton:
      handleCopy(target);
      break;

    case modifiedCopyButtonImg:    
      handleCopy(target);
      break;

    case clearButton:
      removeText();
      break;

    default:
      return;
  }
  handleKeyWrapper(translatorAssets.keytoggle);
  handleheaderPopup(translatorAssets.headerToggle);
  translatorAssets.headerToggle = false;
  translatorAssets.keytoggle = false;
}