export async function callInternalApi(page, methodName, ...args) {
  return page.evaluate(
    ([name, parameters]) => window.shopApi[name](...parameters),
    [methodName, args]
  );
}
