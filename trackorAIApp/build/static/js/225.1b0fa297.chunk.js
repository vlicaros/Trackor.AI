/*! For license information please see 225.1b0fa297.chunk.js.LICENSE.txt */
"use strict";(globalThis.webpackChunkmovieApp=globalThis.webpackChunkmovieApp||[]).push([[225],{225:(e,t,o)=>{o.r(t),o.d(t,{startFocusVisible:()=>r});const s="ion-focused",n=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp","Home","End"],r=e=>{let t=[],o=!0;const r=e?e.shadowRoot:document,i=e||document.body,c=e=>{t.forEach((e=>e.classList.remove(s))),e.forEach((e=>e.classList.add(s))),t=e},a=()=>{o=!1,c([])},d=e=>{o=n.includes(e.key),o||c([])},u=e=>{if(o&&void 0!==e.composedPath){const t=e.composedPath().filter((e=>!!e.classList&&e.classList.contains("ion-focusable")));c(t)}},v=()=>{r.activeElement===i&&c([])};r.addEventListener("keydown",d),r.addEventListener("focusin",u),r.addEventListener("focusout",v),r.addEventListener("touchstart",a),r.addEventListener("mousedown",a);return{destroy:()=>{r.removeEventListener("keydown",d),r.removeEventListener("focusin",u),r.removeEventListener("focusout",v),r.removeEventListener("touchstart",a),r.removeEventListener("mousedown",a)},setFocus:c}}}}]);
//# sourceMappingURL=225.1b0fa297.chunk.js.map