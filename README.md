# hackmd_download
## About
[HackMD](https://hackmd.io) 為線上共同編輯筆記，可以使用 Markdown 格式撰寫，

本人是重度使用者之一，感謝作者造福社會，真的是台灣之光XD

問題來了，常常有好幾個筆記在更新，裡面是好幾年的心血結晶，總覺得要離線備份才安全(別罵我QQ

但是目前沒辦法批量匯出筆記，只能手動到每個筆記頁面下載，實在是很麻煩，

所以決定寫個小插件來解決這個問題~

## How to Use
網站上有使用的方式: https://hbdoy.github.io/hackmd_download/

使用流程: 將按鈕拖曳到書籤 => 到 HackMD 首頁點一下就可以下載囉!

很懶的也可以在任意網頁點選，會有導引的。

不用擔心安全問題，我沒有要偷你的 cookie 之類的，不放心的反正程式碼都開源了，還很貼心的準備一份未壓縮的，可以看完再使用。

### 示意圖
![](https://i.imgur.com/6ltZ7u9.gif)

## 已知問題
### 1. 
目前在 Chrome 上測試可以使用，但是 Firefox 無法使用，

因為「内容安全策略 (CSP)」會擋掉，這個策略是為了防止 XSS 之類的攻擊，有興趣的可以自己研究下。

#### 暫時解決方法
[更] 18/08/28
火狐新增一鍵複製按鈕

------

如果發現點了書籤沒有用，可以直接把[程式碼](https://github.com/hbdoy/hackmd_download/blob/master/js/minify.js)複製到 console(F12)，變成多一個步驟而已。

#### 還是不會?
![](https://i.imgur.com/cnQxptO.gif)

### 2. 
[網頁](https://hbdoy.github.io/hackmd_download/)拖拉時有些線條會跑掉，目前還沒找到原因，

但解決方法就重新整理就好~

## 未來進度
手動複製程式碼很麻煩? 程式碼會不會有問題啊?

您的心聲我聽見了!

接下來預計開發網頁版，

除了書籤以外，也能透過上傳 HackMD 匯出的紀錄(JSON)來下載筆記~

## 版本
V 1.1.1
[2018/08/28]:

1. 新增瀏覽器判斷，自動最佳化呈現內容
2. 優化下載壓縮包檔名
3. 修復點擊「取消」按鈕後還是下載的問題

V 1.0
[2018/08/28]:

小工具誕生囉

## 使用工具
- bootstrap4
- [Wiredjs](http://wiredjs.com/) (網頁上的手繪風格)
- [JSZip](https://stuk.github.io/jszip/) (打包資料)
  - FileSaver
  - JsZip-utils
- [clipboardjs](https://clipboardjs.com/)
- JQuery
