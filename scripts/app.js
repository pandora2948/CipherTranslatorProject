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
    if(translatorAssets.algorithm === 'oneTimePad') {
      algorithm.oneTimePad();
    }
    else {
      const keyIndicator = domAssets.keyIndicatorList;
      const {keyArray} = translatorAssets;
      keyIndicator.innerHTML = '';
      keyArray.forEach((k) => {
        keyIndicator.innerHTML += `<li class="key-indicator">${k}</li>`
      })
      algorithm[translatorAssets.algorithm]();
    }
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
    // 배열에 코드값 삽입
    // 문자열 쌍의 값이 같을 경우 빈도수가 가장 낮은 물결 기호 코드 삽입
    for (let i = 0; i < sourceInput.value.length; i++) {
      listOfAscii.push(sourceInput.value.charCodeAt(i));
      if (sourceInput.value.charCodeAt(i) === sourceInput.value.charCodeAt(i + 1) && listOfAscii.length % 2 === 1) {
        listOfAscii.push(126);
      }
    }
    // 암호화일때 문자열의 길이가 홀수일 경우

    if (listOfAscii.length % 2 !== 0 && isEncrypter) {
      listOfAscii.push(Math.floor(Math.random() * 96) + 32);
      if (listOfAscii[listOfAscii.length - 1] === 127) {
        listOfAscii[listOfAscii.length - 1] = 8364;
      }
    }
    // 복호화시 문자열의 길이가 홀수일 경우
    else if (listOfAscii.length % 2 !== 0 && !isEncrypter) {
      alert("Please type Correct Cipher");
    }
    // 배열의 길이만큼 반복
    for (let i = 0; i < listOfAscii.length; i += 1) {
      // 문자열 배열의 값을 2차원 배열로 문자 쌍 생성
      listOfAscii.splice(i,2, [listOfAscii[i], listOfAscii[i+1]]);
      // currArr 는 문자열 배열내부의 값을 2차원 배열로 변환한 배열
      const currArr = listOfAscii[i];
      // flatKey 는 2차원 배열로 생성한 키 배열을 1차원 배열로 펼친 키 배열
      const flatKey = keyArray.flat();
      // 문자열쌍의 첫번째 문자의 열을 구하는 식
      // 1차원 키 배열에서 첫번째 문자를 탐색한 뒤 해당 인덱스를 12로 나눈 나머지값
      const firstCol = flatKey.indexOf(currArr[0]) % 12;
      // 문자열 쌍의 첫번째 문자의 행을 구하는 식
      // 1차원 키 배열에서 첫번째 문자를 탐색한 뒤 해당 인덱스를 12로 나눈 몫
      const firstRow = Math.floor(flatKey.indexOf(currArr[0]) / 12);
      // 문자열 쌍의 두번째 문자의 열을 구하는 식
      // 1차원 키 배열에서 첫번째 문자를 탐색한 뒤 해당 인덱스를 12로 나눈 나머지값
      const secondCol = flatKey.indexOf(currArr[1]) % 12;
      // 문자열 쌍의 두번째 문자의 행을 구하는 식
      // 1차원 키 배열에서 첫번째 문자를 탐색한 뒤 해당 인덱스를 12로 나눈 몫
      const secondRow = Math.floor(flatKey.indexOf(currArr[1]) / 12);
      // 암호화
      if (isEncrypter) {
        // 열이 같을 경우
        if (firstCol === secondCol) {
          // 행 값을 1 증가 시키며 모듈러 연산으로 처리
          currArr[0] = keyArray[(firstRow + 1) % 8][firstCol];
          currArr[1] = keyArray[(secondRow + 1) % 8][secondCol];
        }
        // 행이 같을경우
        else if(firstRow === secondRow) {
          // 열 값을 증가시키며 모듈러 연산으로 처리
          currArr[0] = keyArray[firstRow][(firstCol + 1) % 12];
          currArr[1] = keyArray[secondRow][(secondCol + 1) % 12];
        }
        // 행과 열이 다를 경우
        else {
          // 서로의 열 값으로 대치한다.
          currArr[0] = keyArray[firstRow][secondCol];
          currArr[1] = keyArray[secondRow][firstCol];
        }
      }
      // 복호화
      else {
        // 열이 같을 경우
        if (firstCol === secondCol) {
          // 행 값을 1 감소 시키며 모듈러 연산으로 처리
          currArr[0] = keyArray[(firstRow - 1 + 8) % 8][firstCol];
          currArr[1] = keyArray[(secondRow - 1 + 8) % 8][secondCol];
        }
        // 행이 같을경우
        else if(firstRow === secondRow) {
          // 열 값을 감소시키며 모듈러 연산으로 처리
          currArr[0] = keyArray[firstRow][(firstCol - 1 + 12) % 12];
          currArr[1] = keyArray[secondRow][(secondCol - 1 + 12) % 12];
        }
        // 행과 열이 다를 경우
        else {
          // 서로의 열 값으로 대치한다.
          currArr[0] = keyArray[firstRow][secondCol];
          currArr[1] = keyArray[secondRow][firstCol];
        }
      }
    }
    // html 태그 생성
    const tag = listOfAscii.flat()
    .map((curr) => {
      return `&#${curr};`;
    })
    .reduce((acc, curr) => {
      return acc + curr;
    }, '');
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
  if (translatorAssets.algorithm === 'caesar' || translatorAssets.keyArray[0] === 0) {
    translatorAssets.keyArray[0] = scrollEvent.tmpKey;
  }
  else {
    domAssets.beforeKeyIndicator.innerText = 'Keys';
    translatorAssets.keyArray.push(scrollEvent.tmpKey);
  }
  scrollEvent.handleKey();
}

const handleKeyRole = () => {
  const keyInput = document.querySelector('#keyInput');
  const footerKey = document.querySelector('#footerKeyDisplay');
  if (translatorAssets.algorithm === 'oneTimePad' || translatorAssets.algorithm === 'playfair') {
    translator.keySelector.classList.add('hidden');
    keyInput.classList.remove('hidden');
    footerKey.classList.add('hidden');
  }
  else {
    translator.keySelector.classList.remove('hidden');
    keyInput.classList.add('hidden');
    footerKey.classList.remove('hidden');
  }
}
// 키 테이블 생성
const handleTable = () => {
  const {keyInput ,keyTable} = domAssets;
  if (translatorAssets.algorithm !== 'playfair') {
    keyTable.innerHTML ='';
    return;
  }
  // 사용자 입력 키값
  const userKey = [];
  // 실제 키 배열
  const keyArray = [];
  let code = 32;
  // 사용자 입력의 인덱스를 참조하기 위한 값
  let keyCount = 0;
  // 텍스트인풋에서 받은 값을 userKey 배열에 아스키 코드값으로 저장
  for (const character of keyInput.value) {
    userKey.push(character.charCodeAt());
  }
  // 키 테이블 초기화
  keyTable.innerText = '';
  // 키 테이블의 높이만큼 반복
  for (let i = 0; i < 8; i += 1) {
    // html 행 태그 생성
    const row = document.createElement('tr');
    // 키 행 배열 생성 및 초기화
    const keyRow = [];
    // 키 테이블의 너비만큼 반복
    for (let j = 0; j < 12; j += 1) {
      // 키 테이블에 동일한 값이 있을 경우 유저 키의 인덱스를 증가시킴
      while (keyArray.flat().includes(userKey[keyCount]) || keyRow.includes(userKey[keyCount])) {
        keyCount += 1;
      }
      // 유저 키 인덱스가 유저 키 길이보다 클 경우
      if (keyCount >= userKey.length) {
        // 유저 키에 현재 코드 값이 존재하지 않을때 까지 코드값 1 증가
        while (userKey.includes(code)) {
          code += 1;
        }
        // 코드값이 127일 경우 키 행과 테이블 요소에 8364 를 삽입 후 코드 값 1 증가
        if (code === 127) {
          keyRow.push(8364);
          const column = document.createElement('td');
          column.innerHTML = `&#${8364};`;
          row.append(column);
          code += 1;
        }
        // 키 행과 테이블 요소에 코드 값 삽입 후 코드 값 1 증가
        else {
          keyRow.push(code);
          const column = document.createElement('td');
          column.innerHTML = `&#${code};`;
          row.append(column);
          code += 1;
        }
      }
      // 유저 키의 코드값이 8500 이하일 경우 키 행 배열에 추가 후 테이블 요소에 추가후 유저 키 인덱스 1 증가
      else if (userKey[keyCount] < 8500) {
        keyRow.push(userKey[keyCount]);
        const column = document.createElement('td');
        column.innerHTML = `&#${userKey[keyCount]};`;
        row.append(column);
        keyCount += 1;
      }
      // 그 외읠경우 실행종료
      else return;
    }
    // 각 행의 생성이 끝나면 키 배열에 배열 추가
    keyArray.push(keyRow);
    // 테이블 요소 삽입
    keyTable.append(row);
  }
  translatorAssets.keyArray = keyArray;
}