import React, { useEffect, useRef } from "react";

function useRecursiveTimeout(callback, delay) {
  const savedCallback = useRef(callback);
  const delayRef = useRef(delay);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Remember the latest delay.
  useEffect(() => {
    delayRef.current = delay;
  }, [delay]);


  // Set up the timeout loop.
  useEffect(() => {
    let id;

    function tick() {
      const ret = savedCallback.current();

      if (ret instanceof Promise) {
        ret.then(() => {
          if (delayRef.current !== null) {
            id = setTimeout(tick, delayRef.current);
          }
        });
      } else {
        if (delayRef.current !== null) {
          id = setTimeout(tick, delayRef.current);
        }
      }
    }

    if (delayRef.current !== null) {
      id = setTimeout(tick, delayRef.current);
      return () => id && clearTimeout(id);
    }
  }, [delay]);
}

export default useRecursiveTimeout;
