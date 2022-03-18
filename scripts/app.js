const keyHanddler = {

  createAlphabetList(cb) {
    const list = [];
    for (let i = 0; i < asciiCodeAssets.alphabetLength * 2; i += 1) {
      const alphabet = document.createElement('li');
      if(i === 0) {
        alphabet.setAttribute('id', 'firstKey');
      }
      alphabet.innerHTML = cb(i);
      list.push(alphabet);
    }
    return list;
  },
}

const scrollEvent = {
  ScrollLeft: 0,
  clickCoordinate: 0,
  scrollValue: 0,
  listWidth: 0,

  handleRender(scroll, isEncrypter = true) {
    const {lowerStartCode, lowerLastCode, alphabetLength} = asciiCodeAssets;
    let index = 0;
    if (isEncrypter === true) {
      scroll.childNodes.forEach((li) => {
      let value = lowerStartCode + (translatorAssets.key + index - 2) % alphabetLength;
      if (value < lowerStartCode) {
        value = lowerLastCode - (lowerStartCode - value);
      }
      li.innerHTML = `&#${value};`;
      index += 1;
    })
    }
    else {
      scroll.childNodes.forEach((li) => {
        let value = lowerStartCode + (index - translatorAssets.key + 1) % alphabetLength;
        if (value < lowerStartCode) {
          value = lowerLastCode - (lowerStartCode - value - 1);
        }
        li.innerHTML = `&#${value};`;
        index += 1;
      })
    }
  },

  handleKey(key, keyIndicator) {
    const logic = translatorAssets.algorithm;
    translatorAssets.key = key;
    if (logic === 'caesar') {
      keyIndicator.children[0].innerText = translatorAssets.key;
    }
    else {
      keyIndicator.innerHTML = '';
      keyIndicator.innerText = translatorAssets.key;
      keyIndicator.classList.add('key-indicator')
    }
    algorithm[translatorAssets.algorithm]();
  },

  handlePosition(scroll) {
    scroll.childNodes.forEach((li) => {
      li.style.transform = `translateX(-${this.scrollValue}px)`
    });
  },

  handleClick(scroll, e) {
    const presentSelctcor = document.querySelector('#firstKey')
    if(!presentSelctcor === false) {
      presentSelctcor.removeAttribute('id')
    }
    const selector = e.target;
    selector.setAttribute('id', 'firstKey');
    this.ScrollLeft = scroll.offsetLeft;
    this.clickCoordinate = e.target.offsetLeft;
    this.scrollValue = this.clickCoordinate - this.ScrollLeft;
    this.listWidth = scroll.children[0].offsetWidth;
    
    this.handlePosition(scroll);
    this.tmpKey = Math.floor(this.scrollValue / this.listWidth % asciiCodeAssets.alphabetLength)
    
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
  caesar(isEncrypter = true) {
    const {spaceCode, symbolStartCode, symbolLastCode, numberStartCode, numberLastCode, upperStartCode, upperLastCode, lowerStartCode, lowerLastCode, symbolLength, numberLength, alphabetLength} = asciiCodeAssets;
    const source = domAssets.sourceInput;
    const modified = domAssets.modifiedOutput;
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
          listOfAscii[i] = (asciiCode % symbolStartCode + translatorAssets.key) % symbolLength;
          listOfAscii[i] += symbolStartCode;
        }
        else {
          listOfAscii[i] = (asciiCode % symbolStartCode % symbolLength - translatorAssets.key)

          if (listOfAscii[i] < 0) {
            listOfAscii[i] = symbolLength + listOfAscii[i];
          }
          listOfAscii[i] += symbolStartCode;
        }
      }

      else if (asciiCode <= numberLastCode && asciiCode >= numberStartCode) {
        if (isEncrypter === true) {
          listOfAscii[i] = (asciiCode % numberStartCode + translatorAssets.key) % numberLength;
          listOfAscii[i] += numberStartCode;
        }
        else {
          listOfAscii[i] = (asciiCode % numberStartCode % numberLength - translatorAssets.key)

          if (listOfAscii[i] < 0) {
            listOfAscii[i] = numberLength + listOfAscii[i];
          }
          listOfAscii[i] += numberStartCode;
        }
      }

      else if (asciiCode <= upperLastCode && asciiCode >= upperStartCode) {
        if(isEncrypter === true) {
          listOfAscii[i] = (asciiCode % upperStartCode + translatorAssets.key) % alphabetLength;
          listOfAscii[i] += upperStartCode;
        }
        else {
          listOfAscii[i] = (asciiCode % upperStartCode % alphabetLength - translatorAssets.key)
          if (listOfAscii[i] < 0) {
            listOfAscii[i] = alphabetLength + listOfAscii[i];
          }
          listOfAscii[i] += upperStartCode;
        }
      }

      else if (asciiCode <= lowerLastCode && asciiCode >= lowerStartCode) {
        if (isEncrypter === true) {
          listOfAscii[i] = (asciiCode % lowerStartCode + translatorAssets.key) % alphabetLength;
          listOfAscii[i] += lowerStartCode;
        }

        else {
          listOfAscii[i] = (asciiCode % lowerStartCode % alphabetLength - translatorAssets.key);
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

const handleDisplay = (...target) => {
  target.forEach((t) => {
    if (t.classList.contains('hidden')) {
      t.classList.add('visible');
    }
    else {
      t.classList.remove('visible')
    }
  })
}

const handleheaderPopup = (toggle) => {
  const {algorithmSelectorArrow, algorithmPopup} = domAssets;
  if (toggle) {
    algorithmSelectorArrow.classList.toggle('selected');
    algorithmPopup.classList.toggle('hidden');
    algorithmPopup.classList.toggle('visible');
  }
  else {
    algorithmSelectorArrow.classList.remove('selected');
    algorithmPopup.classList.remove('visible');
    algorithmPopup.classList.add('hidden') ;
  }
}

const handleAlgorithm = (target) => {
  const presentAlgorithm = translatorAssets.algorithm;
  const selectedAlgorithm = target.getAttribute('value');
  if (presentAlgorithm === selectedAlgorithm)  return;
  translatorAssets.algorithm = selectedAlgorithm;
  translatorAssets.key = 0;
  translatorAssets.keyArray = [];
}

const handleEncrypter = (isEncrypter, source, modified) => {
  const buffer = source.value;
  source.value = modified.innerHTML;
  modified.innerText = buffer;
  if (isEncrypter) {
    domAssets.encrypterExchangerImage.classList.add('decrypter')
    translatorAssets.isEncrypter = false;
    algorithm[translatorAssets.algorithm]()
  }
  else {
    console.log('암호화로 변경 버튼 작업 필요');
    domAssets.encrypterExchangerImage.classList.remove('decrypter')
    translatorAssets.isEncrypter = true;
    algorithm[translatorAssets.algorithm]()
  }
}

const handleKeyWrapper = (toggle, isButton) => {
  if (toggle) {
    if(isButton) {
      domAssets.keyPopup.classList.toggle('hidden');
    }
    else {
      domAssets.keyPopup.classList.remove('hidden');
    }
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

const handleKeyReset = (logic) => {
  scrollEvent.handleKey(0, )
  algorithm[logic](domAssets.sourceInput, domAssets.modifiedOutput, translatorAssets.isEncrypter)
}

const removeText = () => {
  domAssets.sourceInput.value = '';
  domAssets.modifiedOutput.innerText = '';
}

const selectKey = () => {
  scrollEvent.handleKey(scrollEvent.tmpKey, domAssets.keyIndicatorList)
}