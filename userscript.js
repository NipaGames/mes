// ==UserScript==
// @name         matikkaeditori enhancement suite
// @namespace    http://tampermonkey.net/
// @version      2024-09-11
// @description  a broken piece of garbage code to fix another broken piece of garbage software
// @author       em
// @match        https://app.studeo.fi/*
// @icon         https://raw.githubusercontent.com/NipaGames/mes/main/extension-icon.png
// @run-at       document-start
// @grant        GM.addElement
// ==/UserScript==

const config = {
  enableBall: true,
  enableBackslashColon: true,
  errorMsg: 'oops'
}

const patchUrl = 'https://cdn.jsdelivr.net/gh/NipaGames/mes@latest/rich-text-editor-bundle.js'

new MutationObserver((_, observer) => {
  let originalScript = document.querySelector('script[src*="rich-text-editor-bundle.js"]')
  if (originalScript) {
    originalScript.remove()
    unsafeWindow.MESConfig = config
    // inject a patched version of the script
    GM.addElement('script', {
      src: patchUrl,
      type: 'text/javascript'
    })
    observer.disconnect()
  }
}).observe(document.documentElement, { childList: true, subtree: true })
