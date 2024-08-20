class CookieManager {
    // クッキーをセットする
    setCookie(name: string, value: string, days?: number, path?: string): void {
      let expires = '';
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = `; expires=${date.toUTCString()}`;
      }
      path = path ? `; path=${path}` : '; path=/';
      document.cookie = `${name}=${encodeURIComponent(value) || ''}${expires}${path}`;
    }
  
    // クッキーを取得する
    getCookie(name: string): string | null {
      const nameEQ = `${name}=`;
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
      return null;
    }
  
    // クッキーを削除する
    deleteCookie(name: string, path?: string): void {
      this.setCookie(name, '', -1, path);
    }
  
    // すべてのクッキーを削除する
    deleteAllCookies(path?: string): void {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        this.deleteCookie(name.trim(), path);
      }
    }
  }
  
  export const cookieManager = new CookieManager();
// Path: src/lib/cookieManager.ts