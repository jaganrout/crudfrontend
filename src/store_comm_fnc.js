export function getFromLocal(key, defaultValue) {
    const value = localStorage.getItem(key);
    if (value) {
        try {
            return JSON.parse(value);
        } catch (e) {
            console.error(`Error parsing localStorage value for key "${key}":`, e);
            return defaultValue;
        }
    }
    return defaultValue;
}
