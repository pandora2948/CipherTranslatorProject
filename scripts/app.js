const keyHanddler = {

  createAlphabetList(cb) {
    const list = [];
    for (let i = 0; i < asciiCodeAssets.alphabetLength * 3; i += 1) {
      const alphabet = document.createElement('li');
      if(i === 0) {
        alphabet.setAttribute('id', 'firstKey');
      }
      alphabet.innerHTML = cb(i);
      alphabet.classList.add('scroll');
      list.push(alphabet);
    }
    return list;
  },
}

const scrollEvent = {
  scrollLeft: 0,
  clickCoordinate: 0,
  scrollValue: 0,
  listWidth: 0,
  tmpKey:0,

  handleKey() {
    const keyIndicator = domAssets.keyIndicatorList;
    const {keyArray} = translatorAssets;

    keyIndicator.innerHTML = '';
    keyArray.forEach((k) => {
      keyIndicator.innerHTML += `<li class="key-indicator">${k}</li>`
    })
    algorithm[translatorAssets.algorithm]();
  },

  handlePosition(scroll) {
    scroll.childNodes.forEach((li) => {
      li.style.transform = `translateX(-${this.scrollValue}px)`
      
      if (this.scrollValue > scroll.offsetWidth) {
        setTimeout(() => {
          li.classList.remove('scroll');
          li.style.transform = `translateX(-${this.scrollValue % scroll.offsetWidth}px)`
        }, 250)
        setTimeout(() => {
          li.classList.add('scroll');
        }, 260)
      }
    });
  },

  handleClick(scroll, e) {
    const presentSelctcor = document.querySelector('#firstKey')
    if(!presentSelctcor === false) {
      presentSelctcor.removeAttribute('id')
    }
    this.scrollLeft = scroll.offsetLeft;
    this.clickCoordinate = e.target.offsetLeft;
    this.scrollValue = (this.clickCoordinate - this.scrollLeft);
    this.listWidth = scroll.children[0].offsetWidth;
    
    this.handlePosition(scroll);
    this.tmpKey = Math.floor(this.scrollValue / this.listWidth % asciiCodeAssets.alphabetLength);
    for (let i = 0; i <= asciiCodeAssets.alphabetLength; i++) {
      if (this.scrollLeft + this.listWidth * this.tmpKey <= scroll.children[i].offsetLeft && this.scrollLeft + this.listWidth * (this.tmpKey + 0.5) >= scroll.children[i].offsetLeft) {
        scroll.children[i].setAttribute('id', 'firstKey');
      }
    }
  }
}

const algorithm = {
  caesar() {
    const {spaceCode, symbolStartCode, symbolLastCode, numberStartCode, numberLastCode, upperStartCode, upperLastCode, lowerStartCode, lowerLastCode, symbolLength, numberLength, alphabetLength} = asciiCodeAssets;
    const {sourceInput, modifiedOutput} = domAssets;
    const isEncrypter = translatorAssets.isEncrypter;
    const listOfAscii = [];
    const inputLength = sourceInput.value.length;
    const asciiLength = listOfAscii.length;
    for (let i = 0; i < inputLength; i += 1) {
      const asciiCode = sourceInput.value.charCodeAt(i);
      const key = translatorAssets.keyArray[0];
      if (asciiCode === spaceCode) {
        listOfAscii[i] = asciiCode;
      }

      else if (asciiCode <= symbolLastCode && asciiCode >= symbolStartCode) {
        if (isEncrypter) {
          listOfAscii[i] = (asciiCode % symbolStartCode + key) % symbolLength;
          listOfAscii[i] += symbolStartCode;
        }
        else {
          listOfAscii[i] = (asciiCode % symbolStartCode % symbolLength - key)

          if (listOfAscii[i] < 0) {
            listOfAscii[i] = symbolLength + listOfAscii[i];
          }
          listOfAscii[i] += symbolStartCode;
        }
      }

      else if (asciiCode <= numberLastCode && asciiCode >= numberStartCode) {
        if (isEncrypter) {
          listOfAscii[i] = (asciiCode % numberStartCode + key) % numberLength;
          listOfAscii[i] += numberStartCode;
        }
        else {
          listOfAscii[i] = (asciiCode % numberStartCode % numberLength - key)

          if (listOfAscii[i] < 0) {
            listOfAscii[i] = numberLength + listOfAscii[i];
          }
          listOfAscii[i] += numberStartCode;
        }
      }

      else if (asciiCode <= upperLastCode && asciiCode >= upperStartCode) {
        if(isEncrypter) {
          listOfAscii[i] = (asciiCode % upperStartCode + key) % alphabetLength;
          listOfAscii[i] += upperStartCode;
        }
        else {
          listOfAscii[i] = (asciiCode % upperStartCode % alphabetLength - key)
          if (listOfAscii[i] < 0) {
            listOfAscii[i] = alphabetLength + listOfAscii[i];
          }
          listOfAscii[i] += upperStartCode;
        }
      }

      else if (asciiCode <= lowerLastCode && asciiCode >= lowerStartCode) {
        if (isEncrypter) {
          listOfAscii[i] = (asciiCode % lowerStartCode + key) % alphabetLength;
          listOfAscii[i] += lowerStartCode;
        }

        else {
          listOfAscii[i] = (asciiCode % lowerStartCode % alphabetLength - key);
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
    modifiedOutput.innerHTML = tag;
  },

  vigenere() {
    const {upperStartCode, upperLastCode, lowerStartCode, lowerLastCode, alphabetLength} = asciiCodeAssets;
    const {sourceInput, modifiedOutput} = domAssets;
    const isEncrypter = translatorAssets.isEncrypter;
    const listOfAscii = [];
    const inputLength = sourceInput.value.length;
    const asciiLength = listOfAscii.length;

    for (let i = 0; i < inputLength; i += 1) {
      const asciiCode = sourceInput.value.charCodeAt(i);
      const key = translatorAssets.keyArray[i % translatorAssets.keyArray.length] 

      if (asciiCode <= upperLastCode && asciiCode >= upperStartCode) {
        if(isEncrypter) {
          listOfAscii[i] = (asciiCode % upperStartCode + key) % alphabetLength;
          listOfAscii[i] += upperStartCode;
        }

        else {
          listOfAscii[i] = (asciiCode % upperStartCode % alphabetLength - key)
          if (listOfAscii[i] < 0) {
            listOfAscii[i] = alphabetLength + listOfAscii[i];
          }
          listOfAscii[i] += upperStartCode;
        }
      }

      else if (asciiCode <= lowerLastCode && asciiCode >= lowerStartCode) {
        if (isEncrypter) {
          listOfAscii[i] = (asciiCode % lowerStartCode + key) % alphabetLength;
          listOfAscii[i] += lowerStartCode;
        }

        else {
          listOfAscii[i] = (asciiCode % lowerStartCode % alphabetLength - key);
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
    modifiedOutput.innerHTML = tag;
  }
}

const handleDisplay = (...target) => {
  target.forEach((t) => {
    if (t.classList.contains('hidden')) {
      t.removeAttribute('display') 
    }
    else {
      t.removeAttribute('display')
    }
  })
}

const handleheaderPopup = (toggle) => {
  const {algorithmSelectorArrow, algorithmPopup} = domAssets;
  if (toggle) {
    algorithmSelectorArrow.classList.toggle('selected');
    algorithmPopup.classList.toggle('hidden');
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
  translatorAssets.keyArray = [0];
  domAssets.algorithmDisplay.innerText = target.innerText;
  domAssets.algorithmSelector.childNodes[0].nodeValue = target.innerText;
  scrollEvent.handleKey();
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

const removeText = () => {
  domAssets.sourceInput.value = '';
  domAssets.modifiedOutput.innerText = '';
}

const selectKey = () => {
  if(translatorAssets.keyArray.length > 5) return;
  if (translatorAssets.algorithm === 'caesar' || translatorAssets.keyArray[0] === 0) {
    translatorAssets.keyArray[0] = scrollEvent.tmpKey;
  }
  else {
    domAssets.beforeKeyIndicator.innerText = 'Keys'
    translatorAssets.keyArray.push(scrollEvent.tmpKey);
  }
  scrollEvent.handleKey()
}