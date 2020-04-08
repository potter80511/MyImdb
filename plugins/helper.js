export const rateStarWithEmpty = rates => {
  let num = rates;
  let arr = [];

  for(let i=5; i>0; i --) {
    if(num>=2) {
      arr.push('star')
    } else if(num>=1) {
      arr.push('half')
    } else {
      arr.push('empty')
    }
    num = num - 2
  }
  return arr;
}
export const rateTenStar = rates => {
  let num = rates;
  let arr = [];

  for(let i=10; i>0; i --) {
    if(num>=1) {
      arr.push('star')
    } else if(num>=0.5) {
      arr.push('half')
    } else {
      arr.push('empty')
    }
    num = num - 1
  }
  return arr;
}

export const rateStar = (rates) => {
  let num = rates;
  let arr = [];

  for(let i=num; i>0; i -= 2) {

    if(i>=2) {
      arr.push('star')
    } else if(i>=1 && i<2) {
      arr.push('half')
    }
  }
  return arr;
}

export const objToArray = (oriData) => {

  if(oriData) {
    const dataArray = []
    const dataKeys = Object.keys(oriData)  //  [key1, key2]

    dataKeys.forEach((dataKey) => {
      dataArray.push(oriData[dataKey])
    })
    return dataArray;
  } else {
    console.log('no_data')
  }
}

export const bannerRWD = (w) => {
  let bannerWidth = w;
  let bannerHeight = 0.5625 * bannerWidth;
  return bannerHeight;
}

export const capitalize = (str) => {
  const factory = (item) => {

    const cap = item[0].toUpperCase()
    const newItem = cap + item.substring(1)

    return newItem;
  }

  if (str) {
    const splitArray = str.split(' ');
    const newArray = splitArray.map(item => (factory(item)));
    let result = ''
    newArray.forEach(item => {
      result = result + item
    });
    return result
  } else {
    return ''
  }
}

export const underlineId = (str) => {
  if (str) {
    const splitArray = str.split(' ');
    let result = ''
    splitArray.forEach((item, index) => {
      result = index !== 0 ? result + '_' + item : result + item
    });
    return result
  } else {
    return ''
  }
}

export const addInputHandler = (inputs, isBanner) => {
  const inputId = inputs.length + 1;
  if (isBanner) {
    inputs.push({
      id: inputId,
      url: '',
    });
  } else {
    inputs.push({
      id: inputId,
      name: '',
    });
  }
}

export const deleteInputHandler = (inputs, inputIndex) => {
  inputs.splice(inputIndex, 1);
}

export const inputArray = (items) => {
  const result = items
    .filter(item => (item.checked === true))
    .map(item => (
        {
          id: item.id,
          name: item.name
        }
      )
    );
  return result;
}
export const inputPeaple = (inputs) => {
  const result = inputs.map(item => (
    {
      ...item,
      id: underlineId(item.name),
    }
  ));
  return result;
}
