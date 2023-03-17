'use strict';

{
  // 次の出題されるものを決めるための関数
  function setWord(){
    word = words.splice(Math.floor(Math.random() * words.length),1)[0];  
    // 配列wordsの中からランダムに１つ抜き出したもの、配列wordsの中身は１つ減る
    target.textContent = word;
    // #targetのテキスト = 出題されるもの
    loc = 0; //新しく出題されたら、入力文字数はリセット
  }

  const words = [
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'black',
    'white',
    'brown',
    'gold',
    'orange',
  ] // 出題範囲
  let word;  //出題されるもの
  let loc = 0; // 入力した文字数を表す
  let startTime;  //クリック（スタート）した時の時間
  let isPlaying = false; 
  //ゲーム途中でクリック→リセットを防ぐためのもの
  // ゲームが始まっていればtrue,そうでなければfalse
  const target = document.getElementById('target');

  document.addEventListener('click',()=>{
    // クリックしたら
    if(isPlaying === true){
      return; //  ゲームが始まっていればクリックされても処理終了
    }
    isPlaying = true;
    startTime = Date.now(); //startTimeに現在時の代入
    setWord(); //第１問目の出題
  })

  document.addEventListener('keydown', e =>{
    // キーを押した時の処理。押したキーはeに受けたられる。
    if(e.key !== word[loc]){
      // 入力したキーがwordのloc番目と等しくない場合=入力したキーが不正解の場合
      return;
      // 処理中止
    }
    loc++; //入力する度にloc+1になる

    target.textContent = '_'.repeat(loc) + word.substring(loc);
      // targetのテキスト = _をlocの個数分つなげた文字列 + wordのloc番目以降の文字列
      //  substring(開始0~,終了)…開始から終了位置手前までの文字列を切り取る
      // word = redの場合
      // 1: _ed
      // 2: __d
      // 3: ___
      // となるようにする

    if(loc === word.length){
      // 入力文字数が出題の文字数と等しくなれば
      if(words.length === 0){
        // 配列wordsの要素がなくなれば(最後の単語を打ち終われば)
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        // 所要時間 = 現在時間 - 開始時間,小数点２桁表示
        const result = document.getElementById('result');
        result.textContent = `Finished ${elapsedTime} seconds!`; //Finishedと表示し、
        return; // 処理を終了する
      }
      setWord();
      // 次の出題
    }

  });
  
}