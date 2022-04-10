class keyAreaElement {
  constructor(elementName, classList, id) {
    this.elementName = elementName;
    this.classList = classList;
    this.id = id;
  }
}

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
  lastAsciiCode: 126,
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
  thirdAlgorithm: document.querySelector('#algorithmPopupList').children[2],
  fourthAlgorithm: document.querySelector('#algorithmPopupList').children[3],
  fifthAlgorithm: document.querySelector('#algorithmPopupList').children[4],
  encrypterExchanger: document.querySelector('#exchangeButton'),
  encrypterExchangerImage: document.querySelector('#exchangeButton').children[0],
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
  modifiedCopyButtonImage: document.querySelector('#modifiedCopyButton').children[0],
  keyPopup: document.querySelector('#keyPopup'),
  keyScroll: document.querySelector('#keyScroll'),
  keyInput: document.querySelector('#keyInput'),
  keyTable: document.querySelector('#keyTable'),
}

const translatorAssets = {
  keyArray: [0],
  algorithm: 'caesar',
  headerToggle: false,
  keytoggle: false,
  isEncrypter: true,
  isButton: false,
  coprime: [3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25]
}

const keyAreaAsset = {
  keyScroll : new keyAreaElement('ul', 'key-area__list', 'keyScroll'),
  keyInput : new keyAreaElement('input', 'key-area__input', 'keyInput'),
  keySet : new keyAreaElement('div', 'key-area__key-set', 'keySet'),
  keySelect : new keyAreaElement('select', 'key-set__select', 'keySelect'),

  generate(element, target = domAssets.keyPopup) {
    const dom = document.createElement(element.elementName);
    dom.classList.add(element.classList);
    dom.setAttribute('id', element.id);
    target.append(dom);
    domAssets[element.id] = document.querySelector(`#${element.id}`);
  }
} 