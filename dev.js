javascript: void((function (d) {
    if (window.location.host != "hackmd.io" || window.location.pathname != "/recent") {
        if (confirm("Please goto to HackMd homepage")) {
            window.location.href = "https://hackmd.io/recent";
        }
    } else {
        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
        if (getCookie("loginstate")) {
            var cdns = ["https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js", "https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.0.2/jszip-utils.min.js", "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js"]
            var result = d.createElement("P");
            result.className = "hide";
            result.id = "result";
            var outer = document.createElement("DIV");
            outer.setAttribute("positin", "width: 0%;");
            outer.appendChild(result);
            var progress = d.createElement("DIV");
            progress.className = "progress-bar";
            progress.setAttribute("style", "width: 0%;");
            progress.setAttribute("role", "progressbar");
            progress.setAttribute("aria-valuenow", "0");
            progress.setAttribute("aria-valuemin", "0");
            progress.setAttribute("aria-valuemax", "100");
            var progress_outer = d.createElement("DIV");
            progress_outer.className = "progress hide";
            progress_outer.id = "progress_bar";
            progress_outer.appendChild(progress);
            outer.appendChild(progress_outer);
            d.querySelector(".cover-container").insertBefore(outer, d.querySelector("#recent"));
            for (var i = 0; i < 3; i++) {
                var s = document.createElement("script");
                s.type = "text/javascript";
                s.src = cdns[i];
                d.body.appendChild(s);
            }

            checkLoad();

            function checkLoad() {
                // 目前找不到更好的判斷 .js 是否全部載入的方式
                if ((window.saveAs == undefined) || (window.JSZipUtils == undefined) || (window.JSZip == undefined)) {
                    setTimeout(checkLoad, 1000);
                } else {
                    loaded();
                }
            }

            function loaded() {
                var allNotes = [];
                var xhr = new XMLHttpRequest();
                xhr.open('get', 'https://hackmd.io/history', true);
                xhr.send(null);
                xhr.onload = function (data) {
                    if (xhr.responseText == "") {
                        window.alert("Someing errors, please try later");
                    } else {
                        allNotes = JSON.parse(xhr.responseText).history;
                        downloadAndPack();
                    }
                };
                var Promise = window.Promise;
                if (!Promise) {
                    Promise = JSZip.external.Promise;
                }

                function urlToPromise(url) {
                    return new Promise(function (resolve, reject) {
                        JSZipUtils.getBinaryContent(url, function (err, data) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(data);
                            }
                        });
                    });
                }

                function downloadAndPack() {
                    var zip = new JSZip();
                    var tmp_names = [];
                    for (var i = 0, j = 1; i < allNotes.length; i++) {
                        var url = "https://hackmd.io/" + allNotes[i].id + "/download";
                        // 過濾掉非法檔案字元
                        var filename = allNotes[i].text.replace(/<|>|\?|\:|"|\/|\\|\*|\||;*/g, "") + ".md";
                        if (tmp_names.indexOf(filename) == -1) {
                            tmp_names.push(filename);
                        } else {
                            // 檔名重複
                            filename = allNotes[i].text.replace(/<|>|\?|\:|"|\/|\\|\*|\||;*/g, "") + "(" + j + ")" + ".md";
                            j++;
                        }
                        zip.file(filename, urlToPromise(url), {
                            binary: true
                        });
                    };
                    // when everything has been downloaded, we can trigger the dl
                    zip.generateAsync({
                            type: "blob"
                        }, function updateCallback(metadata) {
                            var msg = "progression : " + metadata.percent.toFixed(2) + " %";
                            if (metadata.currentFile) {
                                msg += ", current file = " + metadata.currentFile;
                            }
                            showMessage(msg);
                            updatePercent(metadata.percent | 0);
                        })
                        .then(function callback(blob) {
                            saveAs(blob, "example.zip");
                            showMessage("done !");
                        }, function (e) {
                            showError(e);
                        });
                    return false;
                }

                function resetMessage() {
                    $("#result")
                        .removeClass()
                        .text("");
                }

                function showMessage(text) {
                    resetMessage();
                    $("#result")
                        .addClass("alert alert-success")
                        .text(text);
                }

                function showError(text) {
                    resetMessage();
                    $("#result")
                        .addClass("alert alert-danger")
                        .text(text);
                }

                function updatePercent(percent) {
                    $("#progress_bar").removeClass("hide")
                        .find(".progress-bar")
                        .attr("aria-valuenow", percent)
                        .css({
                            width: percent + "%"
                        });
                }

                if (!JSZip.support.blob) {
                    showError("This demo works only with a recent browser !");
                }

            }
        } else {
            window.alert("Please Login First");
        }

    }
})(document));