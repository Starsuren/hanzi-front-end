type Callback = (...args: any[]) => void;

export function useDebounce<F extends Callback>(callback: F, time = 200, immediate = true
): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout> | undefined | null;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this;
    const callNow = immediate && !timeout;

    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      if (timeout) timeout = null;
      if (!immediate) callback.apply(context, args);
    }, time);

    if (callNow) {
      console.log('sdsfsf');
      callback.apply(context, args);
    
    }
  };
}