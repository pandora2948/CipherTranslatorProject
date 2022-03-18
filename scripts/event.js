const handleClick = (e) => {
  const {algorithmSelector, algorithmSelectorArrow, firstAlgorithm, secondAlgorithm, encrypterExchanger, encrypterExchangerImage, keySelector, keySelectorImage, sourceCopyButton, sourceCopyButtonImage, keyResetButton, modifiedCopyButton, modifiedCopyButtonImg, clearButton, keyPopup, keyScroll, sourceInput, modifiedOutput} = domAssets;
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
      break;

    case secondAlgorithm:
      handleAlgorithm(target);
      break;
    
    case encrypterExchanger:
      handleEncrypter(translatorAssets.isEncrypter, sourceInput, modifiedOutput);
      break;
    
    case encrypterExchangerImage:
      handleEncrypter(translatorAssets.isEncrypter, sourceInput, modifiedOutput);
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
      handleKeyReset(translatorAssets.algorithm);
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

    default:
      break;
  }
  if (target.parentNode === keyScroll) {
    translatorAssets.keytoggle = true;
    scrollEvent.handleClick(domAssets.keyScroll, e)
  }
  handleheaderPopup(translatorAssets.headerToggle);
  handleKeyWrapper(translatorAssets.keytoggle, translatorAssets.isButton);
}

document.addEventListener('click', handleClick)

domAssets.sourceInput.addEventListener('focus', () => {
  this.translateInterval = setInterval(() => {
    algorithm[translatorAssets.algorithm]()
  }, 100);
})
domAssets.sourceInput.addEventListener('blur', () => {
  clearInterval(translateInterval);
})
