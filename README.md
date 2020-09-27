# chrome-ext-nola-mock-date

Nola で Date をモックする Chrome 拡張

Nola を開くと、自動で worldtimeapi.org から正常な時間を持ってきてくれる。

初回はネットワークエラーになるので、`Got normal time`というログが出るまで待ってからリロードすること。

## why?

Nola はフロントの時間がサーバー時間と５分以上の差分があると、AWS の graphql がエラーを吐くので、Date を強制的に書き換えることで解決する
