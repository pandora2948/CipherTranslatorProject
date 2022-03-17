const translator = {
  keySelector: document.querySelector('#keyScroll'),
}

const cipherAlphabetList = keyHanddler.createAlphabetList(i => `&#${asciiCodeAssets.lowerStartCode + i % (asciiCodeAssets.lowerLastCode - asciiCodeAssets.lowerStartCode + 1)};`, true);
cipherAlphabetList.forEach(element => translator.keySelector.append(element));