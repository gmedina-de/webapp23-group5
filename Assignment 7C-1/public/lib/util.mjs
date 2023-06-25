
  function createOption(val, txt, classValues) {
    var el = document.createElement("option");
    el.value = val;
    el.text = txt;
    if (classValues) el.className = classValues;
    return el;
  }
 
  function fillSelectWithOptions(selectEl, selectionRange, optPar) {
    // create option elements from object property values
    const options = Array.isArray(selectionRange) ? selectionRange :
      Object.keys(selectionRange);
    // delete old contents
    selectEl.innerHTML = "";
    // create "no selection yet" entry
    if (!selectEl.multiple) {
      selectEl.add(createOption("", " --- "));
    }
    for (const i of options.keys()) {
      let optionEl = null;
      if (Array.isArray(selectionRange)) {
        optionEl = createOption(i + 1, options[i]);
        if (selectEl.multiple && optPar && optPar.selection &&
          optPar.selection.includes(i + 1)) {
          // flag the option element with this value as selected
          optionEl.selected = true;
        }
      } else {
        const key = options[i];
        const obj = selectionRange[key];
        if (optPar && optPar.displayProp) {
          optionEl = createOption(key, obj[optPar.displayProp]);
        } else optionEl = createOption(key);
        // if invoked with a selection argument, flag the selected options
        if (selectEl.multiple && optPar && optPar.selection &&
          optPar.selection[key]) {
          // flag the option element with this value as selected
          optionEl.selected = true;
        }
      }
      selectEl.add(optionEl);
    }
  }

  

  
  export {
    fillSelectWithOptions
  };