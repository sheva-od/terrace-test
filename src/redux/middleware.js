const storageKey = 'store';
const sourceId = Math.floor(Math.random() * 10000);

function wrapAction(action) {
  return {
    action,
    sourceId,
    time: Date.now(),
  }
}

export function storageMiddleware() {
  return () => next => action => {
    if (action.type !== 'from other tab'){
      const wrappedAction = wrapAction(action);

      localStorage.setItem(storageKey, JSON.stringify(wrappedAction));
    } else {
      action = action.data;
    }
    next(action);
  }
}

export function createOnStorage(store) {
  return () => {
    const wrappedAction = JSON.parse(localStorage.getItem(storageKey));

    if (wrappedAction.sourceId !== sourceId) {
      store.dispatch({
        type:"from other tab",
        data:wrappedAction.action
      });
    }
  }
}
