const t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]"),body:document.querySelector("body")};let e=null;t.startBtn.addEventListener("click",(function(a){e=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),a.target.disabled=!0,t.stopBtn.disabled=!1})),t.stopBtn.addEventListener("click",(function(a){clearInterval(e),a.target.disabled=!0,t.startBtn.disabled=!1})),t.stopBtn.disabled=!0;
//# sourceMappingURL=01-color-switcher.0c719656.js.map