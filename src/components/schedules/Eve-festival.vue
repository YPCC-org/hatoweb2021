<template>
  <div>
    ダンス
    <v-simple-table>
      <template v-slot:default>
        <tbody>
          <tr
            v-for="item in classes"
            :key="item.name"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.music }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<style>
</style>

<script>
export default {
  name: 'EveFest',
  data: () =>  ({
    classes: [
      { name: "3年 応援団", music: "不協和音／お願いマッスル" },
      { name: "2-3", music: "アザトカワイイ" },
      { name: "1-4", music: "サイレントマジョリティー" },
      { name: "3-1", music: "ええじゃないか／make you happy" },
      { name: "2-6", music: "Dance the night away" },
      { name: "1-6", music: "恋" },
      { name: "3-5", music: "We Will Rock You／What is love?" },
      { name: "休憩", music: "" },
      { name: "2-4", music: "ソンナコトナイヨ" },
      { name: "1-5", music: "キュン" },
      { name: "3-7", music: "惑星ループ／ガールズルール" },
      { name: "2-7", music: "三原色" },
      { name: "1-2", music: "Y.M.C.A" },
      { name: "3-4", music: "いくぜっ！怪盗少女／Happiness" },
      { name: "2-1", music: "アンビバレント" },
      { name: "1-3", music: "Good time" },
      { name: "休憩", music: "" },
      { name: "2年応援団", music: "新宝島／Dinamite" },
      { name: "3-3", music: "学園天国／がむしゃら行進曲" },
      { name: "2-5", music: "Take a picture" },
      { name: "1-1", music: "TT" },
      { name: "3-6", music: "TOKYO GIRL／Heart shaker" },
      { name: "2-2", music: "U.S.A" },
      { name: "1-7", music: "夜に駆ける" },
      { name: "3-2", music: "夏のFree&Easy／おどるポンポコリン" },
      { name: "応援団", music: "睡蓮花" },
    ],
  }),
}
</script>
