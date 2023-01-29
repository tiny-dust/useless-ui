const deepMerge = (target, source) => {
  const result = { ...target }
  for (const key in source) {
    if (Object.hasOwn(source, key)) {
      const value = source[key]
      if (value instanceof Object) {
        result[key] = deepMerge(result[key], value)
      } else {
        result[key] = value
      }
    }
  }
  return result
}

export default deepMerge
