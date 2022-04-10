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
      const keyArray = translatorAssets.keyArray;
      keyIndicator.innerHTML = '';
      keyArray.forEach((k) => {
        keyIndicator.innerHTML += `<li class="key-indicator">${k}</li>`
      })
  },

  handlePosition() {
    const scroll = domAssets.keyScroll
    scroll.childNodes.forEach((li) => {
      li.style.transform = `translateX(-${this.scrollValue}px)`
      
      if (this.scrollValue > scroll.offsetWidth) {
        setTimeout(() => {
          li.classList.remove('scroll');
          li.style.transform = `translateX(-${this.scrollValue % scroll.offsetWidth}px)`
        }, 250);
        setTimeout(() => {
          li.classList.add('scroll');
        }, 260);
      }
    });
  },

  handleClick(e) {
    const presentSelctcor = document.querySelector('#firstKey')
    const scroll = domAssets.keyScroll
    if(presentSelctcor) {
      presentSelctcor.removeAttribute('id');
    }
    this.scrollLeft = scroll.offsetLeft;
    this.clickCoordinate = e.target.offsetLeft;
    this.scrollValue = (this.clickCoordinate - this.scrollLeft);
    this.listWidth = scroll.children[0].offsetWidth;
    
    this.handlePosition();
    this.tmpKey = Math.floor(this.scrollValue / this.listWidth % asciiCodeAssets.alphabetLength);
    for (let i = 0; i <= asciiCodeAssets.alphabetLength; i += 1) {
      if (!this.tmpKey) {
        scroll.children[26].setAttribute('id', 'firstKey');
      }
      else if (this.scrollLeft + this.listWidth * this.tmpKey <= scroll.children[i].offsetLeft && this.scrollLeft + this.listWidth * (this.tmpKey + 0.5) >= scroll.children[i].offsetLeft) {
        scroll.children[i].setAttribute('id', 'firstKey');
      }
    }
  }
}

const algorithm = {
  caesar() {
    const {spaceCode, symbolStartCode, symbolLastCode, numberStartCode, numberLastCode, upperStartCode, upperLastCode, lowerStartCode, lowerLastCode, symbolLength, numberLength, alphabetLength} = asciiCodeAssets;
    const {sourceInput, modifiedOutput, lengthIndicator} = domAssets;
    const isEncrypter = translatorAssets.isEncrypter;
    const listOfAscii = [];
    const inputLength = sourceInput.value.length;
    const asciiLength = listOfAscii.length;
    lengthIndicator.innerText = inputLength;
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
    const {sourceInput, modifiedOutput, lengthIndicator} = domAssets;
    const isEncrypter = translatorAssets.isEncrypter;
    const listOfAscii = [];
    const inputLength = sourceInput.value.length;
    const asciiLength = listOfAscii.length;
    lengthIndicator.innerText = inputLength;
    for (let i = 0; i < inputLength; i += 1) {
      const asciiCode = sourceInput.value.charCodeAt(i);
      const key = translatorAssets.keyArray[i % translatorAssets.keyArray.length];

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
  },

  oneTimePad() {
    if(translatorAssets.algorithm !== 'oneTimePad') return;
    const {sourceInput, modifiedOutput, lengthIndicator} = domAssets;
    const isEncrypter = translatorAssets.isEncrypter;
    const listOfAscii = [];
    if (isEncrypter) {
      const inputLength = domAssets.sourceInput.value.length;
      translatorAssets.keyArray = [];
      for (let i = 0; i < inputLength; i += 1) {
        translatorAssets.keyArray.push(Math.floor(Math.random() * 256));
        const asciiCode = sourceInput.value.charCodeAt(i);
        const key = translatorAssets.keyArray[i];
        listOfAscii[i] = (asciiCode ^ key).toString(2);
        }
        domAssets.keyInput.value = translatorAssets.keyArray;
        lengthIndicator.innerText = inputLength;
        const tag = listOfAscii
        .map((curr) => {
          return `${curr.padStart(8, '0')} `;
        })
        .reduce((acc, curr) => {
          return acc + curr;
        }, '').trim();
        modifiedOutput.innerText = tag;
      }
    else{
      const inputLength = sourceInput.value.split(' ').length;
      translatorAssets.keyArray = [];
      for (let i = 0; i < domAssets.keyInput.value.split(',').length; i += 1){
        translatorAssets.keyArray.push(domAssets.keyInput.value.split(',')[i]);
      }
      lengthIndicator.innerText = inputLength;
      for(let i = 0; i < inputLength; i += 1) {
        const asciiCode = parseInt(sourceInput.value.split(' ')[i], 2);
        const key = translatorAssets.keyArray[i];
        listOfAscii[i] = asciiCode ^ key;
      }

      const tag = listOfAscii
      .map((curr) => {
        return `&#${curr};`;
      })
      .reduce((acc, curr) => {
        return acc + curr;
      }, '');
      modifiedOutput.innerHTML = tag;
    }
  },

  playfair() {
    if (translatorAssets.algorithm !== 'playfair') return;
    const {sourceInput, modifiedOutput, lengthIndicator} = domAssets;
    const {isEncrypter, keyArray} = translatorAssets;
    const listOfAscii = [];
    lengthIndicator.innerText = sourceInput.value.length;
    for (let i = 0; i < sourceInput.value.length; i++) {
      listOfAscii.push(sourceInput.value.charCodeAt(i));
      if (sourceInput.value.charCodeAt(i) === sourceInput.value.charCodeAt(i + 1) && listOfAscii.length % 2 === 1) {
        listOfAscii.push(126);
      }
    }

    if (listOfAscii.length % 2 !== 0 && isEncrypter) {
      listOfAscii.push(Math.floor(Math.random() * 96) + 32);
      if (listOfAscii[listOfAscii.length - 1] === 127) {
        listOfAscii[listOfAscii.length - 1] = 8364;
      }
    }
    else if (listOfAscii.length % 2 !== 0 && !isEncrypter) {
      alert("Please type Correct Cipher");
    }
    for (let i = 0; i < listOfAscii.length; i += 1) {
      listOfAscii.splice(i,2, [listOfAscii[i], listOfAscii[i+1]]);
      const currArr = listOfAscii[i];
      const flatKey = keyArray.flat();
      const firstCol = flatKey.indexOf(currArr[0]) % 12;
      const firstRow = Math.floor(flatKey.indexOf(currArr[0]) / 12);
      const secondCol = flatKey.indexOf(currArr[1]) % 12;
      const secondRow = Math.floor(flatKey.indexOf(currArr[1]) / 12);
      if (isEncrypter) {
        if (firstCol === secondCol) {
          currArr[0] = keyArray[(firstRow + 1) % 8][firstCol];
          currArr[1] = keyArray[(secondRow + 1) % 8][secondCol];
        }
        else if(firstRow === secondRow) {
          currArr[0] = keyArray[firstRow][(firstCol + 1) % 12];
          currArr[1] = keyArray[secondRow][(secondCol + 1) % 12];
        }
        else {
          currArr[0] = keyArray[firstRow][secondCol];
          currArr[1] = keyArray[secondRow][firstCol];
        }
      }
      else {
        if (firstCol === secondCol) {
          currArr[0] = keyArray[(firstRow - 1 + 8) % 8][firstCol];
          currArr[1] = keyArray[(secondRow - 1 + 8) % 8][secondCol];
        }
        else if(firstRow === secondRow) {
          currArr[0] = keyArray[firstRow][(firstCol - 1 + 12) % 12];
          currArr[1] = keyArray[secondRow][(secondCol - 1 + 12) % 12];
        }
        else {
          currArr[0] = keyArray[firstRow][secondCol];
          currArr[1] = keyArray[secondRow][firstCol];
        }
      }
    }
    const tag = listOfAscii.flat()
    .map((curr) => {
      return `&#${curr};`;
    })
    .reduce((acc, curr) => {
      return acc + curr;
    }, '');
    modifiedOutput.innerHTML = tag;
  },
  
  affine() {
    let k1 = translatorAssets.keyArray[0];
    const k2 = translatorAssets.keyArray[1];
    if(!k2) return;
    const {upperStartCode, upperLastCode, lowerStartCode, lowerLastCode} = asciiCodeAssets;
    const {sourceInput, modifiedOutput, lengthIndicator} = domAssets;
    const isEncrypter = translatorAssets.isEncrypter;
    const listOfAscii = [];
    const inputLength = sourceInput.value.length;
    lengthIndicator.innerText = inputLength;

    for (let i = 0; i < inputLength; i += 1) {
      let code = sourceInput.value.charCodeAt(i);
      if (code <= lowerLastCode && code >= lowerStartCode) {
        if (isEncrypter) {
          code = (code % lowerStartCode * k1 + k2) % 26 + lowerStartCode;
        }
        else {
          let j = 0;
          while (k1 * j % 26 !== 1){
            j += 1;
          }
          code = (Math.floor(((code % lowerStartCode - k2 + 26) % 26) * j)) % 26 + lowerStartCode;
        }
      }
      else if (code <= upperLastCode && code >= upperStartCode) {
        if (isEncrypter) {
          code = (code % upperStartCode * k1 + k2) % 26 + upperStartCode;
        }
        else {
          let j = 0;
          while (k1 * j % 26 !== 1){
            j += 1;
          }
          code = (Math.floor(((code % upperStartCode - k2 + 26) % 26) * j)) % 26 + upperStartCode;
        }
      }
      listOfAscii[i] = code
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

const handleDisplay = (t) => {
    if (t.classList.contains('hidden')) {
      t.removeAttribute('display') 
    }
    else {
      t.removeAttribute('display')
    }
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

const handleEncrypter = () => {
  const input = domAssets.sourceInput;
  const output = domAssets.modifiedOutput;
  const buffer = input.value;
  input.value = output.innerText;
  output.innerText = buffer;
  if (translatorAssets.isEncrypter) {
    domAssets.encrypterExchangerImage.classList.add('decrypter');
    translatorAssets.isEncrypter = false;
    algorithm[translatorAssets.algorithm]();
  }
  else {
    domAssets.encrypterExchangerImage.classList.remove('decrypter');
    translatorAssets.isEncrypter = true;
    algorithm[translatorAssets.algorithm]();
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
    domAssets.keyPopup.classList.add('hidden');
  }
}

const handleCopy = (target) => {
  if (target === domAssets.sourceCopyButton || target === domAssets.sourceCopyButtonImage) {
    navigator.clipboard.writeText(domAssets.sourceInput.value);
  }

  else if (translatorAssets.algorithm === 'oneTimePad' && translatorAssets.isEncrypter) {
      navigator.clipboard
      .writeText(`
==============================TextArea=============================
${domAssets.modifiedOutput.innerHTML}
==============================KeyArea=============================
${translatorAssets.keyArray}`);
  }
  else {
    navigator.clipboard.writeText(domAssets.modifiedOutput.innerHTML);
  }
}

const removeText = () => {
  domAssets.sourceInput.value = '';
  domAssets.modifiedOutput.innerText = '';
}

const selectKey = () => {
  if (translatorAssets.keyArray.length > 5) return;
  if (translatorAssets.algorithm === 'affine') {
    domAssets.beforeKeyIndicator.innerText = 'Keys';
    translatorAssets.keyArray[0] = parseInt(domAssets.keySelect.value);
    translatorAssets.keyArray[1] = parseInt(domAssets.keyInput.value);
  }
  else if (translatorAssets.algorithm === 'caesar' || translatorAssets.keyArray[0] === 0) {
    translatorAssets.keyArray[0] = scrollEvent.tmpKey;
  }
  else {
    domAssets.beforeKeyIndicator.innerText = 'Keys';
    translatorAssets.keyArray.push(scrollEvent.tmpKey);
  }
  scrollEvent.handleKey();
}

const handleKeyRole = () => {
  const footerKey = document.querySelector('#footerKeyDisplay');
  domAssets.keyPopup.lastElementChild.remove();
  if (translatorAssets.algorithm === 'oneTimePad' || translatorAssets.algorithm === 'playfair') {
    keyAreaAsset.generate(keyAreaAsset.keyInput);
    domAssets.keyInput.addEventListener('change', () => {
      if (translatorAssets.algorithm === 'oneTimePad' && translatorAssets.isEncrypter === false) {
        algorithm.oneTimePad();
      }
      else if (translatorAssets.algorithm === 'playfair') {
        algorithm.playfair();
        handleTable();
      }
    })
    footerKey.classList.add('hidden');
  }

  else if (translatorAssets.algorithm === 'affine') {
    keyAreaAsset.generate(keyAreaAsset.keySet);
    keyAreaAsset.generate(keyAreaAsset.keySelect, domAssets.keySet);
    keyAreaAsset.generate(keyAreaAsset.keyInput, domAssets.keySet);
    domAssets.keyInput.value = 1;
    domAssets.keyInput.setAttribute('type', 'number');
    domAssets.keyInput.setAttribute('pattern', '^[^0]\\d{1,2}');
    translatorAssets.coprime.forEach((t) => {
      const option = document.createElement('option');
      option.innerText = t;
      option.value = t;
      domAssets.keySelect.append(option);
    })
    domAssets.keySet.addEventListener('change', () => {
      domAssets.keyInput.value = domAssets.keyInput.value.match('^[^0]\\d{0,2}');
      selectKey();
      algorithm.affine();
    })
    footerKey.classList.remove('hidden');
  }

  else {
    keyAreaAsset.generate(keyAreaAsset.keyScroll);
    const cipherAlphabetList = keyHanddler.createAlphabetList(i => `&#${asciiCodeAssets.lowerStartCode + i % (asciiCodeAssets.lowerLastCode - asciiCodeAssets.lowerStartCode + 1)};`);
    cipherAlphabetList.forEach(element => domAssets.keyScroll.append(element));
    footerKey.classList.remove('hidden');
  }
}

const handleTable = () => {
  const {keyInput ,keyTable} = domAssets;
  if (translatorAssets.algorithm !== 'playfair') {
    keyTable.innerHTML ='';
    return;
  }
  const userKey = [];
  const keyArray = [];
  let code = 32;
  let keyCount = 0;
  for (const character of keyInput.value) {
    userKey.push(character.charCodeAt());
  }
  keyTable.innerText = '';
  for (let i = 0; i < 8; i += 1) {
    const row = document.createElement('tr');
    const keyRow = [];
    for (let j = 0; j < 12; j += 1) {
      while (keyArray.flat().includes(userKey[keyCount]) || keyRow.includes(userKey[keyCount])) {
        keyCount += 1;
      }
      if (keyCount >= userKey.length) {
        while (userKey.includes(code)) {
          code += 1;
        }
        if (code === 127) {
          keyRow.push(8364);
          const column = document.createElement('td');
          column.innerHTML = `&#${8364};`;
          row.append(column);
          code += 1;
        }
        else {
          keyRow.push(code);
          const column = document.createElement('td');
          column.innerHTML = `&#${code};`;
          row.append(column);
          code += 1;
        }
      }
      else if (userKey[keyCount] < 8500) {
        keyRow.push(userKey[keyCount]);
        const column = document.createElement('td');
        column.innerHTML = `&#${userKey[keyCount]};`;
        row.append(column);
        keyCount += 1;
      }
      else return;
    }
    keyArray.push(keyRow);
    keyTable.append(row);
  }
  translatorAssets.keyArray = keyArray;
}