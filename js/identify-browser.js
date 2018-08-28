document.body.onload = function () {
    // 手機板
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        alert("Hi~插件型式為 Bookmarklet，請至電腦版上使用");
    } else {
        if (/Firefox/i.test(navigator.userAgent)) {
            if (confirm("目前 Firefox 無法使用 Bookmarklet，是否查看 Firefox 替代方法?")) {
                document.querySelector("#explainGif").src = "./img/firefox.gif";
                document.querySelector("#bookmark").hidden = true;
                document.querySelector("#readme").innerHTML = `
                <span>把<a href='https://github.com/hbdoy/hackmd_download/blob/master/js/minify.js' target='_blank'>程式碼</a>複製到主控台執行 Console(F12)，或是直接點擊按鈕複製</span><button id="copyBtn" class="mt-2 btn btn-success" data-clipboard-target="#code-copy">複製到剪貼版</button>
                `;
                new ClipboardJS('#copyBtn');
                document.querySelector("#code-copy").hidden = false;
            }
        }
    }
}