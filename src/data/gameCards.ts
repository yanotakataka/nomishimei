import { GameCard } from '../types';

export const normalCards: GameCard[] = [
  // カテゴリ：1人指名（王道系）- 10種
  { id: '1', category: 'onePlayer', text: '運営からのご指名です。{プレイヤー1}さん、一杯どうぞ。', playerSlots: 1 },
  { id: '2', category: 'onePlayer', text: '当たりカード！{プレイヤー1}は誰か1人を指名して、一緒に仲良く乾杯！', playerSlots: 1 },
  { id: '3', category: 'onePlayer', text: '選ばれし勇者{プレイヤー1}！皆の声援を浴びながら、その杯を乾したまえ！', playerSlots: 1 },
  { id: '4', category: 'onePlayer', text: '{プレイヤー1}は、今一番面白い顔をしている人を指名！指名された人が飲む。', playerSlots: 1 },
  { id: '5', category: 'onePlayer', text: '王様登場！{プレイヤー1}は、誰か1人に好きな量のお酒を飲ませる命令ができる！', playerSlots: 1 },
  { id: '6', category: 'onePlayer', text: 'ショットガン！{プレイヤー1}は誰か1人を指名。指名された人は一気飲み！', playerSlots: 1 },
  { id: '7', category: 'onePlayer', text: '{プレイヤー1}は30秒以内に面白い話をする。スベったら飲む。', playerSlots: 1 },
  { id: '8', category: 'onePlayer', text: 'ラッキー！{プレイヤー1}はこのターン、誰からの攻撃も受けない（飲まなくてよい）。', playerSlots: 1 },
  { id: '9', category: 'onePlayer', text: '{プレイヤー1}は、自分のグラスのお酒を一口、誰かに飲ませることができる。', playerSlots: 1 },
  { id: '10', category: 'onePlayer', text: 'シンプルに、{プレイヤー1}が飲む。理由は、ない。', playerSlots: 1 },

  // カテゴリ：2人指名（関係性）- 10種
  { id: '11', category: 'twoPlayers', text: '連帯責任！{プレイヤー1}は{プレイヤー2}を道連れに一杯飲む。', playerSlots: 2 },
  { id: '12', category: 'twoPlayers', text: '以心伝心ゲーム！{プレイヤー1}と{プレイヤー2}は同時に「せーの」で好きな動物を言う。合わなかったら2人で一杯！', playerSlots: 2 },
  { id: '13', category: 'twoPlayers', text: '騎士と姫。{プレイヤー1}は{プレイヤー2}の代わりに黒騎士となって一杯飲む。', playerSlots: 2 },
  { id: '14', category: 'twoPlayers', text: '{プレイヤー1}と{プレイヤー2}は、お互いを褒め合う。照れたら負けで一杯。', playerSlots: 2 },
  { id: '15', category: 'twoPlayers', text: '見つめ合って5秒！{プレイヤー1}と{プレイヤー2}は目をそらさずに5秒耐える。先に笑ったり、目をそらしたら負けで一杯。', playerSlots: 2 },
  { id: '16', category: 'twoPlayers', text: '{プレイヤー1}と{プレイヤー2}はジャンケン。負けた方が飲む。', playerSlots: 2 },
  { id: '17', category: 'twoPlayers', text: '{プレイヤー1}は{プレイヤー2}のモノマネをする。似てなかったら{プレイヤー1}が飲む。', playerSlots: 2 },
  { id: '18', category: 'twoPlayers', text: '{プレイヤー1}と{プレイヤー2}は、グラスのお酒を一口交換する。', playerSlots: 2 },
  { id: '19', category: 'twoPlayers', text: '{プレイヤー1}は{プレイヤー2}の秘密を１つ暴露する。できなければ{プレイヤー1}が飲む。', playerSlots: 2 },
  { id: '20', category: 'twoPlayers', text: '{プレイヤー1}と{プレイヤー2}はハイタッチ。その勢いで乾杯！', playerSlots: 2 },

  // カテゴリ：巻き込み（流れ弾）- 10種
  { id: '21', category: 'ripple', text: '{プレイヤー1}の左隣の人が飲む！異議は認めない！', playerSlots: 1 },
  { id: '22', category: 'ripple', text: '{プレイヤー1}の右隣の人が飲む！文句は{プレイヤー1}に言おう！', playerSlots: 1 },
  { id: '23', category: 'ripple', text: '{プレイヤー1}の両隣の人が乾杯！ラッキーな{プレイヤー1}！', playerSlots: 1 },
  { id: '24', category: 'ripple', text: '{プレイヤー1}と同じ性別の人、全員飲む！', playerSlots: 1 },
  { id: '25', category: 'ripple', text: '{プレイヤー1}と苗字が同じ、もしくは一文字でも同じ漢字が入っている人が飲む。', playerSlots: 1 },
  { id: '26', category: 'ripple', text: '{プレイヤー1}のスマホのバッテリー残量の下1桁が同じ人が飲む。', playerSlots: 1 },
  { id: '27', category: 'ripple', text: '今、一番酔っていると自己申告した人が飲む。いなければ{プレイヤー1}が飲む。', playerSlots: 1 },
  { id: '28', category: 'ripple', text: '直前のターンで飲んだ人が、もう一杯飲む。', playerSlots: 0 },
  { id: '29', category: 'ripple', text: '今日、一番最初に「お腹すいた」と言った人が飲む。（自己申告制）', playerSlots: 0 },
  { id: '30', category: 'ripple', text: 'この中で、一番家が遠い人が飲む。', playerSlots: 0 },

  // カテゴリ：多数決・逆指名（スリル）- 10種
  { id: '31', category: 'vote', text: '少数派は誰だ！「旅行に行くなら国内派？海外派？」正直に回答し、少数派になってしまった人が飲む！', playerSlots: 0 },
  { id: '32', category: 'vote', text: '少数派は誰だ！「犬派？猫派？」正直に回答し、少数派になってしまった人が飲む！', playerSlots: 0 },
  { id: '33', category: 'vote', text: '少数派は誰だ！「今、恋人はいる？いない？」正直に回答し、少数派になってしまった人が飲む！', playerSlots: 0 },
  { id: '34', category: 'vote', text: '{プレイヤー1}はこの中で「一番お金を持ってそう」な人を指名！指された人が飲む！', playerSlots: 1 },
  { id: '35', category: 'vote', text: '{プレイヤー1}はこの中で「一番恋愛経験が豊富そう」な人を指名！指された人が飲む！', playerSlots: 1 },
  { id: '36', category: 'vote', text: '{プレイヤー1}はこの中で「一番カラオケがうまそう」な人を指名！指された人が飲む！', playerSlots: 1 },
  { id: '37', category: 'vote', text: '指差しゲーム！せーの！で適当な方向を指差す。一番、誰からも指されなかった孤高の存在が飲む。', playerSlots: 0 },
  { id: '38', category: 'vote', text: '指差しゲーム！せーの！で誰か1人を指差す。一番多く指された人気者が飲む！', playerSlots: 0 },
  { id: '39', category: 'vote', text: '少数派は誰だ！「きのこの山とたけのこの里、どっちが好き？」正直に回答し、少数派になってしまった人が飲む！', playerSlots: 0 },
  { id: '40', category: 'vote', text: '{プレイヤー1}が考えたお題で多数決！多数派が飲む！', playerSlots: 1 },

  // カテゴリ：全員参加（一体感）- 10種
  { id: '41', category: 'everyone', text: 'スマホのバッテリー残量が一番少ない人が飲む！全員確認！', playerSlots: 0 },
  { id: '42', category: 'everyone', text: '全員の携帯のロック画面を公開！一番恥ずかしいと思った人が飲む。（自己投票）', playerSlots: 0 },
  { id: '43', category: 'everyone', text: '親指ゲームスタート！せーの！で親指を上げた少数派が飲む！', playerSlots: 0 },
  { id: '44', category: 'everyone', text: '山手線ゲーム！お題は「有名なYouTuber」。最初に詰まった人が飲む！', playerSlots: 0 },
  { id: '45', category: 'everyone', text: '古今東西ゲーム！お題は「駅名」。リズムに乗れなかったり、詰まったら飲む！', playerSlots: 0 },
  { id: '46', category: 'everyone', text: '全員、グラスを持って立ち上がる！一番最後に立った人が飲む！', playerSlots: 0 },
  { id: '47', category: 'everyone', text: '今から1分間、英語禁止！喋ったら一杯！', playerSlots: 0 },
  { id: '48', category: 'everyone', text: 'NGワードゲーム！NGワードは「マジで」。次のカードがめくられるまで、言ったら一杯。', playerSlots: 0 },
  { id: '49', category: 'everyone', text: '全員で乾杯！特に理由はない！', playerSlots: 0 },
  { id: '50', category: 'everyone', text: '我慢比べ！全員、スマホを裏返してテーブルに置く。次のカードがめくられるまで、一番最初にスマホに触ってしまった人が飲む！', playerSlots: 0 },
];