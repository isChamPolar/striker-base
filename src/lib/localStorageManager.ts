
class LocalStorageManager {
    // ローカルストレージに値をセットする
    setItem(key: string, value: string): void {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.error('ローカルストレージに保存できませんでした。', e);
      }
    }
  
    // ローカルストレージから値を取得する
    getItem(key: string): string | null {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.error('ローカルストレージから取得できませんでした。', e);
        return null;
      }
    }
  
    // ローカルストレージから値を削除する
    removeItem(key: string): void {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.error('ローカルストレージから削除できませんでした。', e);
      }
    }
  
    // ローカルストレージをすべてクリアする
    clear(): void {
      try {
        localStorage.clear();
      } catch (e) {
        console.error('ローカルストレージをクリアできませんでした。', e);
      }
    }
  }
  
  export const localStorageManager = new LocalStorageManager();
  // Path: src/lib/localStorageManager.ts
  