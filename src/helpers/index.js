export function isObject(obj) {
  return obj !== undefined
    && obj !== null
    && typeof obj === 'object'
    && !Array.isArray(obj);
}

export function isNumber(number) {
  const toNum = number != null ? Number(number) : null;
  return Number.isFinite(toNum);
}

export function getUiComponents(r) {
  const globalComponents = {};
  r.keys().forEach((key) => {
    const parsedComponentPath = key.split('/');
    const componentFileName = parsedComponentPath[parsedComponentPath.length - 1];
    const componentName = componentFileName.split('.')[0];
    globalComponents[componentName] = r(key).default;
  });
  return globalComponents;
}

export function defineUiComponents(app, uiComponents) {
  if (isObject(uiComponents)) {
    Object.keys(uiComponents).forEach((name) => {
      app.component(name, uiComponents[name]);
    });
  }
}

export function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
