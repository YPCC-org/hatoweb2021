<template>
    <table style="table-layout: fixed; text-align: center;" class="schedule-table">
        <th width=50></th>
        <th v-for="i in 12" :key="i">
        </th>
        <tr>
            <td>9:00</td>
            <td colspan=12 rowspan=1 class="pt-3 pl-5">
                <v-card outlined>
                    <p>8:30~ SHR・清掃・準備</p>
                </v-card>
                <v-card outlined class="mt-3">
                    <p>9:30~</p>
                    <p>学級展・模擬店・喫茶・ハトヤ 開始</p>
                </v-card>
            </td>
        </tr>
        <tr>
            <td>10:00</td>
            <td colspan=4 rowspan=6 class="pt-3 pl-5">
                <v-card outlined height="300">
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <p>学芸班発表</p>
                    <p>(２体)</p>
                </v-card>
            </td>
            <td colspan=4 rowspan=6 class="pt-3 pl-5">
                <v-card outlined height="300">
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <p>中庭</p>
                </v-card>
            </td>
        </tr>
        <tr>
            <td>11:00</td>
        </tr>
        <tr>
            <td>12:00</td>
            <td colspan=4 rowspan=3 class="pt-3 pl-5">
                <v-card outlined height="150">
                    <p>11:30~</p>
                    <br>
                    <p>MHK</p>
                </v-card>
            </td>
        </tr>
        <tr>
            <td>13:00</td>
        </tr>
        <tr>
            <td>14:00</td>
        </tr>
        <tr>
            <td>15:00</td>
        </tr>
        <tr>
            <td>16:00</td>
            <td colspan=12 rowspan=1 class="pt-3 pl-5">
                <v-card outlined>
                    <p>15:30~</p>
                    <p>片付け・会場整理・ファイヤーストーム準備</p>
                </v-card>
            </td>
        </tr>
        <tr>
            <td>17:00</td>
            <td colspan=12 rowspan=3 class="pt-3 pl-5">
                <v-card outlined height="150">
                    <p>17:00~</p>
                    <p>閉祭式</p>
                    <p>後夜祭</p>
                    <p>(グラウンド)</p>
                </v-card>
            </td>
        </tr>
        <tr>
            <td>18:00</td>
        </tr>
        <tr>
            <td>19:00</td>
        </tr>
        <tr>
            <td>20:00</td>
        </tr>
    </table>
</template>

<style>
    .schedule-table > tr {
        height: 50px;
    }
</style>

<script>
export default {
    name: 'Sun',
}
</script>
