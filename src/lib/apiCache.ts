import { shareReplay } from "rxjs/operators";
import { Observable } from "rxjs";

let cache = new Map();

export const clearCache = () => {
  cache = new Map();
};

export const getData = <T>(
  key: string,
  obsCb: () => Observable<T>
): Observable<T> => {
  if (cache.has(key)) {
    return cache.get(key);
  }
  // Using publishReplay and refCount so that it keeps the results
  // cached and ready to emit when someone subscribes again later
  const data$ = obsCb().pipe(shareReplay(1));

  // Store the resulting Observable in our cache
  cache.set(key, data$);

  return data$;
};
