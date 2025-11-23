/**
 * Default API Settings, prod builds can populate 
 */
const API_KEY_FALLBACK = ''; 
const API_HOST_FALLBACK = '';

/**
 * @TODO add settings if default keys are required
 */

/**
 * 
 * @returns string
 */
function getApiKey(){
    return localStorage.getItem('API_KEY')??API_KEY_FALLBACK;
}

/**
 * 
 * @returns atring
 */
function getApiHost(){
    return localStorage.getItem('API_HOST')??API_HOST_FALLBACK;
}

/**
 * 
 * @param {string} host 
 */
function setApiHost(host){
    localStorage.setItem('API_HOST', host);
}

/**
 * 
 * @param {string} key 
 */
function setApiKey(key){
    localStorage.setItem('API_KEY', key);
}

/**
 * Run on load
 */
(() => {
  /* ---------- 1. STYLE ---------- */
  const style = document.createElement('style');
  style.textContent = `
    /* Fixed circular button */
    #app-settings-btn {
      position: fixed;
      top: 10px;
      right: 10px;

      border-radius: 50%;
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,.15);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      transition: background .2s;
      bottom: unset;
      background: none;
      box-shadow: none;
      left: unset;
      padding: 0 !important;
      width: 36px;
    }
    #app-settings-btn:hover { background:none; }

    /* Simple gear SVG (inline) */
    #app-settings-btn svg {
      width: 100%;
      fill: currentColor;
    }

    /* Modal overlay */
    #app-settings-modal {
      position: fixed;
top: 15px;
right: 60px;
  width: 275px;
      padding: 16px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 8px 20px rgba(0,0,0,.2);
      font-family: Arial, sans-serif;
      font-size: 14px;
      line-height: 1.4;
      z-index: 9999;
      display: none;
    }
    #app-settings-modal h4 {
      margin: 0 0 8px 0;
      font-size: 16px;
      color: #333;
    }
    #app-settings-modal label {
      display: block;
      margin-top: 8px;
      color: #555;
    }
    #app-settings-modal input {
      width: 97%;
      padding: 6px 8px;
      margin-top: 4px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 13px;
    }
    #app-settings-save {
  color: #fff;
  border: none;
  cursor: pointer;
  bottom: unset;
  left: unset;
  right: 0;
  top: 50px;
  height: 48px;
  background: none;
    }

    #app-settings-save svg {
    width: 38px;
    fill: #000;
    }
#app-settings-save:hover svg {
    fill: #fff;
}
    
    #app-settings-save:hover { background: none; }
  `;
  document.head.appendChild(style);

  /* ---------- 2. BUTTON ---------- */
  const btn = document.createElement('button');
  btn.id = 'app-settings-btn';
  btn.innerHTML = `
    <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36" width="100%" height="auto" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0,0) scale(2.2)">
 <path d="m3 1c-1.108 0-2 0.892-2 2v10c0 1.108 0.892 2 2 2h10c1.108 0 2-0.892 2-2v-10c0-1.108-0.892-2-2-2zm0 1h10c0.554 0 1 0.446 1 1v10c0 0.554-0.446 1-1 1h-10c-0.554 0-1-0.446-1-1v-10c0-0.554 0.446-1 1-1z" fill="#2e3440" stroke-linecap="round" stroke-width="0.1px"/>
 <path d="m8 3c-0.277 0-0.5 0.223-0.5 0.5v0.53125a4 4 0 0 0-1.0508 0.28125l-0.26562-0.45898c-0.1385-0.23989-0.4437-0.32209-0.68359-0.18359s-0.32209 0.4437-0.18359 0.68359l0.26562 0.45898a4 4 0 0 0-0.76758 0.76953l-0.46094-0.26562c-0.23989-0.1385-0.54509-0.056295-0.68359 0.18359s-0.056295 0.54509 0.18359 0.68359l0.45898 0.26562a4 4 0 0 0-0.28125 1.0508h-0.53125c-0.277 0-0.5 0.223-0.5 0.5s0.223 0.5 0.5 0.5h0.53125a4 4 0 0 0 0.28125 1.0508l-0.45898 0.26562c-0.23989 0.1385-0.32209 0.4437-0.18359 0.68359s0.4437 0.32209 0.68359 0.18359l0.46094-0.26562a4 4 0 0 0 0.76758 0.76953l-0.26562 0.45898c-0.1385 0.23989-0.056295 0.54509 0.18359 0.68359s0.54509 0.056295 0.68359-0.18359l0.26562-0.46094a4 4 0 0 0 1.0508 0.2832v0.53125c0 0.277 0.223 0.5 0.5 0.5s0.5-0.223 0.5-0.5v-0.53125a4 4 0 0 0 1.0508-0.28125l0.26562 0.45898c0.1385 0.23989 0.4437 0.32209 0.68359 0.18359s0.32209-0.4437 0.18359-0.68359l-0.26562-0.46094a4 4 0 0 0 0.76953-0.76758l0.45898 0.26562c0.23989 0.1385 0.54509 0.056295 0.68359-0.18359s0.056295-0.54509-0.18359-0.68359l-0.46094-0.26562a4 4 0 0 0 0.2832-1.0508h0.53125c0.277 0 0.5-0.223 0.5-0.5s-0.223-0.5-0.5-0.5h-0.53125a4 4 0 0 0-0.28125-1.0508l0.45898-0.26562c0.23989-0.1385 0.32209-0.4437 0.18359-0.68359s-0.4437-0.32209-0.68359-0.18359l-0.46094 0.26562a4 4 0 0 0-0.76758-0.76953l0.26562-0.45898c0.1385-0.23989 0.056295-0.54509-0.18359-0.68359s-0.54509-0.056295-0.68359 0.18359l-0.26562 0.46094a4 4 0 0 0-1.0508-0.2832v-0.53125c0-0.277-0.223-0.5-0.5-0.5zm-0.052734 2a3 3 0 0 1 0.0019532 0 3 3 0 0 1 0.050781 0 3 3 0 0 1 1.5 0.40234 3 3 0 0 1 1.0977 1.0977 3 3 0 0 1 0.12891 0.25195l-2.0195 0.54102a1 1 0 0 0-0.70703-0.29297 1 1 0 0 0-0.25781 0.035156l-1.4805-1.4805a3 3 0 0 1 0.23828-0.15234 3 3 0 0 1 1.4473-0.40234zm-2.3926 1.2617 1.4785 1.4785a1 1 0 0 0-0.033203 0.25977 1 1 0 0 0 0.29297 0.70703l-0.54297 2.0215a3 3 0 0 1-0.25-0.13086 3 3 0 0 1-1.0977-1.0977 3 3 0 0 1-0.40234-1.5 3 3 0 0 1 0.40234-1.5 3 3 0 0 1 0.15234-0.23828zm5.4316 1.457a3 3 0 0 1 0.013672 0.28125 3 3 0 0 1-0.40234 1.5 3 3 0 0 1-1.0977 1.0977 3 3 0 0 1-1.5 0.40234 3 3 0 0 1-0.28125-0.013672l0.53906-2.0215a1 1 0 0 0 0.70898-0.70703l2.0195-0.53906z" fill="#2e3440" stroke-linecap="round" stroke-width="0.1px"/>
</g>
 </svg>
`;
  document.body.appendChild(btn);

  /* ---------- 3. MODAL ---------- */
  const modal = document.createElement('div');
  modal.id = 'app-settings-modal';
  modal.style = 'display: none';
  modal.innerHTML = `
    <h4>API Settings</h4>
    <label for="app-api-host">API Host</label>
    <input id="app-api-host" type="text" placeholder="https://api.example.com">
    <label for="app-api-key">API Key</label>
    <input id="app-api-key" type="text" placeholder="Your secret key">
    <button id="app-settings-save"><svg width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">    <g transform="translate(0,0) scale(2.2)">

 <path d="M11.03 3.03c-.22.05-.42.17-.56.34l-6.28 7.19-2.25-2.25c-.38-.38-1.06-.38-1.44 0-.38.38-.38 1.06 0 1.44l3.78 3.75 7.69-8.81c.56-.62-.12-1.83-.94-1.66zM14.75 3.03c-.23.05-.45.18-.6.37l-6.7 7.66-.35-.34-1.42 1.62 1.04 1.06.83.8.73-.87 7.47-8.53c.61-.66-.12-1.95-1-1.77z" fill="currentColor"/>
</g></svg>
</button>
  `;
  document.body.appendChild(modal);


  // Populate fields from localStorage (if any)
  const hostInput = modal.querySelector('#app-api-host');
  const keyInput  = modal.querySelector('#app-api-key');
  hostInput.value = getApiHost();
  keyInput.value  = getApiKey();

  // Toggle modal visibility
  btn.addEventListener('click', () => {
    modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
  });

  // Save handler
  modal.querySelector('#app-settings-save').addEventListener('click', () => {
    const host = hostInput.value.trim();
    const key  = keyInput.value.trim();

    // Very light validation – you can expand as needed
    if (!key) {
      alert('Api Key is required.');
      return;
    }

    setApiKey(key);
    setApiHost(host);

    location.reload();   
  });

  // Click outside the modal to close it (optional UX nicety)
  document.addEventListener('click', (e) => {
    if (!modal.contains(e.target) && !btn.contains(e.target)) {
      modal.style.display = 'none';
    }
  });
})();
