const handleClick = (e) => {
  const {algorithmSelector, algorithmSelectorArrow, firstAlgorithm, secondAlgorithm, encrypterExchanger, encrypterExchangerImage, keySelector, keySelectorImage, sourceCopyButton, sourceCopyButtonImage, keyResetButton, modifiedCopyButton, modifiedCopyButtonImage, clearButton, keyPopup, keyScroll, thirdAlgorithm, fourthAlgorithm, keyInput, keyTable} = domAssets;
  const target = e.target;
  const firstKey = document.querySelector('#firstKey');
  translatorAssets.headerToggle = false;
  translatorAssets.keytoggle = false;
  translatorAssets.isButton = false;

  switch (target) {
    case algorithmSelector:
      handleDisplay(algorithmSelector);
      translatorAssets.headerToggle = true;
      break;

    case algorithmSelectorArrow:
      handleDisplay(algorithmSelector);
      translatorAssets.headerToggle = true;
      break;

    case firstAlgorithm:
      handleAlgorithm(target);
      translatorAssets.keyArray;
      handleKeyRole();
      break;

    case secondAlgorithm:
      handleAlgorithm(target);
      translatorAssets.keyArray;
      handleKeyRole();
      break;

    case thirdAlgorithm:
      handleAlgorithm(target);
      translatorAssets.keyArray;
      handleKeyRole();
      break;

    case fourthAlgorithm:
      handleAlgorithm(target);
      translatorAssets.keyArray;
      handleKeyRole();
      break;
    
    case encrypterExchanger:
      handleEncrypter();
      break;
    
    case encrypterExchangerImage:
      handleEncrypter();
      break;
      
    case keySelector:
      translatorAssets.keytoggle = true;
      translatorAssets.isButton = true;
      break;
  
    case keySelectorImage:
      translatorAssets.keytoggle = true;
      translatorAssets.isButton = true;
      break;

    case sourceCopyButton:
      handleCopy(target);
      break;

    case sourceCopyButtonImage:
      handleCopy(target);
      break;

    case keyResetButton:
      translatorAssets.keyArray = [0];
      scrollEvent.handleKey();
      break;

    case modifiedCopyButton:
      handleCopy(target);
      break;

    case modifiedCopyButtonImage:
      handleCopy(target);
      break;

    case clearButton:
      removeText();
      break;

    case keyPopup:
      handleDisplay(keyPopup);
      translatorAssets.keytoggle = true;
      break;

    case keyScroll:
      handleDisplay(keyPopup);
      translatorAssets.keytoggle = true;
      break;

    case firstKey:
      selectKey();
      break;

    case keyInput:
      translatorAssets.keytoggle = true;

    default:
      break;
  }
  if (target.parentNode === keyScroll) {
    translatorAssets.keytoggle = true;
    scrollEvent.handleClick(e)
  }
  handleTable();
  handleheaderPopup(translatorAssets.headerToggle);
  handleKeyWrapper(translatorAssets.keytoggle, translatorAssets.isButton);
}

const handleOver = (e) => {
  const target = e.target;
  const {algorithmSelector, algorithmSelectorArrow, encrypterExchanger, clearButton, keySelector, sourceCopyButton, keyResetButton, encrypterExchangerImage, keySelectorImage, sourceCopyButtonImage, modifiedCopyButtonImage} = domAssets;
  const keyDefine = document.querySelector('#firstKey');
  switch (target) {
    case algorithmSelector:
      target.classList.add('mouse-over');
      break;

    case algorithmSelectorArrow:
      algorithmSelector.classList.add('mouse-over');
      break;
      
    case encrypterExchanger:
      target.classList.add('mouse-over--bg');
      break;

    case encrypterExchangerImage:
      target.parentNode.classList.add('mouse-over--bg');
      break;

    case clearButton:
      target.classList.add('mouse-over');;
      break;

    case keySelector:
      target.classList.add('mouse-over--bg');
      break;

    case keySelectorImage:
      target.parentNode.classList.add('mouse-over--bg');
      break;

    case sourceCopyButton:
      target.classList.add('mouse-over--bg');
      break;

    case sourceCopyButtonImage:
      target.parentNode.classList.add('mouse-over--bg');
      break;

    case keyResetButton:
      target.classList.add('mouse-over--bg');
      break;

    case modifiedCopyButton:
      target.classList.add('mouse-over--bg');
      break;

    case modifiedCopyButtonImage:
      target.parentNode.classList.add('mouse-over--bg');
      break;

    case keyDefine:
      target.classList.add('mouse-over--bg');
      break;

    default:
      return;
  }
}

const handleOut = (e) => {
  const target = e.target;
  const {algorithmSelector, algorithmSelectorArrow, encrypterExchanger, clearButton, keySelector, sourceCopyButton, keyResetButton, encrypterExchangerImage, keySelectorImage, sourceCopyButtonImage, modifiedCopyButtonImage} = domAssets;
  const keyDefine = document.querySelector('#firstKey');
  switch (target) {
    case algorithmSelector:
      target.classList.remove('mouse-over');
      break;

    case algorithmSelectorArrow:
      algorithmSelector.classList.remove('mouse-over');
      break;
      
    case encrypterExchanger:
      target.classList.remove('mouse-over--bg');
      break;

    case encrypterExchangerImage:
      target.parentNode.classList.remove('mouse-over--bg');
      break;

    case clearButton:
      target.classList.remove('mouse-over');;
      break;

    case keySelector:
      target.classList.remove('mouse-over--bg');
      break;

    case keySelectorImage:
      target.parentNode.classList.remove('mouse-over--bg');
      break;

    case sourceCopyButton:
      target.classList.remove('mouse-over--bg');
      break;

    case sourceCopyButtonImage:
      target.parentNode.classList.remove('mouse-over--bg');
      break;

    case keyResetButton:
      target.classList.remove('mouse-over--bg');
      break;

    case modifiedCopyButton:
      target.classList.remove('mouse-over--bg');
      break;

    case modifiedCopyButtonImage:
      target.parentNode.classList.remove('mouse-over--bg');
      break;

    case keyDefine:
      target.classList.remove('mouse-over--bg');
      break;

    default:
      return;
  }
}

document.addEventListener('click', handleClick);
document.addEventListener('mouseover', handleOver);
document.addEventListener('mouseout', handleOut);

domAssets.sourceInput.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
    case 13:
      e.preventDefault();
      algorithm.oneTimePad();
      algorithm.playfair();
      break;

    default:
      return;
  }
})

domAssets.keyInput.addEventListener('change', (e) => {
  if (translatorAssets.algorithm === 'oneTimePad' && translatorAssets.isEncrypter === false) {
    algorithm.oneTimePad();
  }
  else if (translatorAssets.algorithm === 'playfair') {
    algorithm.playfair();
    handleTable();
  }
})

domAssets.sourceInput.addEventListener('focus', () => {
  const soruceTranslator = document.querySelector('#sourceTranslator');
  soruceTranslator.classList.add('focus');
  if (translatorAssets.algorithm === 'oneTimePad' || translatorAssets.algorithm === 'playfair') return;
  this.translateInterval = setInterval(() => {
    algorithm[translatorAssets.algorithm]()
  }, 100);
})

domAssets.sourceInput.addEventListener('blur', () => {
  const soruceTranslator = document.querySelector('#sourceTranslator');
  soruceTranslator.classList.remove('focus');
  if (!(translatorAssets.algorithm === 'oneTimePad' || translatorAssets.algorithm === 'playfair')) {
    clearInterval(translateInterval);
  }
})
