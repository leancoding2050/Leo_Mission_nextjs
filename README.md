


14-7-2025

1。測試大至完成現在差leo的帳目測試，但決定放在deploy後試。

在15-7-2025
將會進行run build 之後再放進github,最後再deploy

15-7-2025

已經run build 完成 接下來github


24 7 2025
放上github


26- 7- 2025

修改了Leo 私人 路徑 為 LeomonthlyrecordsPath


18-08-2025

LEO的建立不到工作原因，因為用了HTTPS，而DJANGO server 都要加入HTTPS，但是原本沒有用，現在加了，但是nextjs 那邊讀取不到django 那邊的server 
可能是django 的supdomain 出現問題

接下來先確定三個流程
1. django項目是運行
2. 為何用了supdomain後，會去了127.0.0.1 可能是nginx 的問題
3. 要確定supdomain 是正常可行


LEO的python DJango 加了 supdomain 加了SSL ,但是用了哪supdomain後，不知為何會返回去127.0.0.1 正常會見火箭 



2－9－2025

leo中的admin 中userLists jobprogressListsid 及 taskprogressListsid 中要進行測試（因為用user版真接copy 過來的）

最後測試後結果是Apply function 出現了問題，明天再深究

反回path 全都加了


3-9-2025

全bug 龐該解決 放在 git deploy_done_03092025