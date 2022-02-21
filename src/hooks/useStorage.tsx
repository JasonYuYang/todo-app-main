import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useCallback,
} from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T) {
  return useStorage(key, defaultValue, window.localStorage);
}

export function useSessionStorage<T>(key: string, defaultValue: T) {
  return useStorage(key, defaultValue, window.sessionStorage);
}

type storageType = typeof window.localStorage | typeof window.sessionStorage;
type SetValue<T> = Dispatch<SetStateAction<T | []>>;

// A wrapper for "JSON.parse()"" to support "undefined" value
function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch (error) {
    console.log('parsing error on', { value });
    return undefined;
  }
}

function useStorage<T>(
  key: string,
  defaultValue: T,
  storageObject: storageType
): [T | [], SetValue<T>, () => void] {
  let readValue = (): T | [] => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) return parseJSON(jsonValue) as T;
    return [];
  };

  const [isRemove, setIsRemove] = useState<boolean>(false);
  const [storedValue, setStoredValue] = useState<T | []>(readValue());

  // const valueToStored =
  //   typeof defaultValue === 'function'
  //     ? defaultValue(storedValue)
  //     : defaultValue;

  useEffect(() => {
    if (isRemove) return storageObject.removeItem(key);

    storageObject.setItem(key, JSON.stringify(storedValue));

    return () => {
      setIsRemove(false);
    };
  }, [key, storageObject, isRemove, storedValue]);

  const remove = useCallback(() => {
    setIsRemove(true);
  }, []);

  return [storedValue, setStoredValue, remove];
}
