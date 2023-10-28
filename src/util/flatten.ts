export const flatten = (obj: object, prefix: string = ''): object => {
  if (typeof obj !== 'object' || obj === null) {
    return {[prefix]: obj};
  }

  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    const newKey = Array.isArray(obj) ? `${prefix}[${key}]` : (prefix ? `${prefix}.${key}` : key);

    return {
      ...acc,
      ...flatten(value, newKey)
    }
  }, {})
}

const setValue = (obj, path, value) => {
  const components = path.split('.')
  const indexRegex = /^(.*)\[(\d+)\]$/g

  let currentObj = obj;

  let i = 0;
  for (i ; i < components.length; i++) {
    const c = components[i]
    const match = indexRegex.exec(c);

    if (match?.length > 1) {
      const [, name, idx] = match;
      currentObj[name] ||= []
      if (i == components.length - 1) {
        currentObj[name][idx] = value
      } else {
        currentObj[name][idx] ||= {}
        currentObj = currentObj[name][idx]
      }
    } else {
      if (i == components.length - 1) {
        currentObj[c] = value
      } else {
        currentObj[c] ||= {}
        currentObj = currentObj[c]
      }
    }
  }
}

export const unflatten = (obj) => {
  const newObj = {};
  for (const [key, value] of Object.entries(obj)) {
    setValue(newObj, key, value);
  }

  return newObj;
}
